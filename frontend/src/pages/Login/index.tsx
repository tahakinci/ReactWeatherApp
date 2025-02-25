import { useState } from "react";
import Seperator from "../../components/Seperator";
import SingInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Header from "./Header";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Modal from "../../components/Modal";

// Guest olarak giriş yapanlar arama yapabilecekler fakat şehir kaydetme görüntü değiştirme gibi şeyler yapmaya çalıştıklarında login poup çıkacak
// Login yapanlara token verilecek ve işlemlerde bu token göz önüne alınacak. Guestlerde token yer almayacak

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <div className="w-full h-full">
      <div>
        {isSignIn ? (
          <Header
            header="Sign in"
            subheader="Sign in to access all features, including saving cities, customizing the display, and more!"
          />
        ) : (
          <Header
            header="Sign up"
            subheader="Sign up to save cities, customize your view, and more!"
          />
        )}
        <div className="flex justify-around gap-2 py-4">
          <button className=" flex-grow  border-2 border-black rounded-md">
            <div className="p-3 flex justify-around items-center text-lg">
              <FcGoogle size={24} /> <span>Continue with Google </span>
            </div>
          </button>
          <button className=" flex-grow  border-2 border-black rounded-md">
            <div className="p-3 flex justify-around items-center text-lg">
              <FaApple size={24} /> <span>Continue with Apple </span>
            </div>
          </button>
        </div>
        <Seperator content="or" />
      </div>
      <div className="py-2">{isSignIn ? <SingInForm /> : <SignUpForm />}</div>
      <div>
        <p>
          Have an account?{" "}
          <button
            className="text-blue-600"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
        <a href="/">Continue as guest</a>
      </div>
    </div>
  );
};

export default Login;
