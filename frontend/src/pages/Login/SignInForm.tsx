import loginService from "../../services/login";
import Input from "../../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { setUserData } from "../../reducers/userReducer";

type Inputs = {
  username: string;
  password: string;
};

const SingInForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const user = await loginService.login(data);
      window.localStorage.setItem("loggedWeatherAppUser", JSON.stringify(user));
      dispatch(setUserData(user));
    } catch (error) {}
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="text"
          label="Username or Email"
          {...register("username", { required: "username is required" })}
          error={errors.username}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          {...register("password", { required: true })}
          error={errors.password}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input type="checkbox" />
          <label className="pl-2" htmlFor="rememberMe">
            Keep me singed in
          </label>
        </div>
        <a href="/">Forgot password</a>
      </div>
      <button type="submit" className="p-3 border-black border-2 rounded-md">
        login
      </button>
    </form>
  );
};

export default SingInForm;
