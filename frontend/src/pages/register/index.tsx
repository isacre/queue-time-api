import { useForm, type FieldValues } from "react-hook-form";
import { Inputs } from "../../components/inputs";
import Button from "../../components/button";
import {
  register as registerUser,
  type UserLoginData,
} from "../../services/auth/index";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    registerUser(data as UserLoginData & { name: string })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-2 h-screen max-h-600 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full max-w-md h-[500px]"
        autoComplete="off"
      >
        <Inputs.Text
          placeholder="Name"
          autoComplete="new-password"
          type="text"
          {...register("name")}
        />
        <Inputs.Text
          placeholder="Email"
          autoComplete="new-password"
          type="text"
          {...register("email")}
        />
        <Inputs.Text
          placeholder="Password"
          autoComplete="new-password"
          type="password"
          {...register("password")}
        />
        <Button type="submit">Register</Button>
        <a className="text-sm text-blue-500" href="/">
          Already have an account? Login
        </a>
      </form>
    </div>
  );
}
