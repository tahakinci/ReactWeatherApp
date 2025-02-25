import { useForm, SubmitHandler } from "react-hook-form";
import userService from "../../services/users";
import Input from "../../components/Input";
import { useEffect, useState } from "react";

// Username uniq olmalı ( serverden gelecek)
// Passwordler matchlenmeli

type Inputs = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

// type Props = {
//   setNotification: React.Dispatch<SetStateAction<Notification | null>>;
// };

const SignUpForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    isSubmitSuccesful,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("here");
    const { passwordConfirm, ...rest } = data;
    try {
      const res = await userService.singIn(rest);
      if (res.status === 400) {
        setError(res.data.field ?? "", { message: res.data.error });
      }
    } catch (error) {
      console.log("here");
      // setNotification({status: "error", message: error.message})
      // setTimeout(() => {
      //   setNotification(null)
      // }, 3000);
    }
  };

  useEffect(() => {
    console.log("here");
    reset();
  }, [isSubmitSuccesful]);

  return (
    <form
      className="w-full h-full grid grid-cols-2 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          type="text"
          label="Name"
          {...register("name", { required: true })}
          error={errors.name}
        />
      </div>
      <div>
        <Input
          type="text"
          label="Surname"
          {...register("surname", { required: true })}
          error={errors.surname}
        />
      </div>
      <div>
        <Input
          type="text"
          label="Username"
          {...register("username", { required: true })}
          error={errors.username}
        />
      </div>
      <div>
        <Input
          type="email"
          label="Email"
          {...register("email", { required: true })}
          error={errors.email}
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
      <div>
        <Input
          type="password"
          label="Password confirm"
          {...register("passwordConfirm", {
            required: true,
            validate: {
              checkPasswordsMatch: (fieldValue, { password }) => {
                if (fieldValue !== password)
                  return "Both password fields must be identical.";
              },
            },
          })}
          error={errors.passwordConfirm}
        />
      </div>
      <button
        className="col-span-full p-3 border-black border-2 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
