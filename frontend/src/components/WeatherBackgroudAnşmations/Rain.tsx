import { useEffect, useRef } from "react";
import * as THREE from "three";
import fog from "../../../public/assets/fog.png";

const Rain = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.set(0, 50, 150);
    camera.lookAt(new THREE.Vector3(0, 50, 0));

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    const renderer = new THREE.WebGLRenderer({
      canvas: ref.current!,
      alpha: true,
    });

    renderer.setClearColor(0x000000, 0);

    // scene.fog = new THREE.FogExp2(0x11111f, 0.002);

    // renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const positions = [];
    const sizes = [];
    const rainCount = 12000;
    const cloudParticles = [];

    const rainGeo = new THREE.BufferGeometry();

    for (let i = 0; i < rainCount; i++) {
      positions.push(Math.random() * 400 - 200); // X-axis: spread
      positions.push(Math.random() * 200 + 100); // Y-axis: higher starting position
      positions.push(Math.random() * 400 - 200); // Z-axis: depth
      sizes.push(30);
    }

    rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    rainGeo.setAttribute(
      "size",
      new THREE.BufferAttribute(new Float32Array(sizes), 1)
    );

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.2,
      transparent: true,
    });

    const rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);

    const loader = new THREE.TextureLoader();
    loader.load(fog, (texture) => {
      const cloudGeo = new THREE.PlaneGeometry(200, 100); // Smaller cloud planes

      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true, // Enables transparency
        alphaTest: 0.05, // Removes fully transparent pixels
        depthWrite: false, // Prevents depth issues
        blending: THREE.AdditiveBlending, // Makes fog look softer
        side: THREE.DoubleSide,
      });

      for (let p = 0; p < 50; p++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          Math.random() * 150 + 50, // Clouds at different heights
          Math.random() * 500 - 450
        );
        cloud.rotateY(-0.12);
        cloud.rotateZ(Math.random() * 360);
        cloud.material.opacity = 0.4 + Math.random() * 0.3; // Varying opacity for realism
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      // Reset to falling rain effect
      const positions = rainGeo.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 1; // Move downward (Y-axis)
        if (positions[i] < 0) positions[i] = 200; // Reset to top
      }
      rainGeo.attributes.position.needsUpdate = true;

      // Cloud Movement (instead of rotation)
      cloudParticles.forEach((p) => {
        p.position.x += 0.1; // Move clouds horizontally
        if (p.position.x > 400) p.position.x = -400; // Reset when out of bounds
      });

      // Flash effect
      if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100) {
          flash.position.set(Math.random() * 400, 300, Math.random() * 200);
          flash.power = 50 + Math.random() * 500;
        }
      }

      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    <canvas
      className="absolute left-0 top-0 bg-gradient-to-b from-gray-700 via-gray-800 to-black"
      ref={ref}
      id="rainCanvas"
    ></canvas>
  );
};

export default Rain;
