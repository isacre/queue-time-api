import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../../components/button";
import { Inputs } from "../../components/inputs";
import {
  login as loginUser,
  verifyToken,
  type UserLoginData,
} from "../../services/auth/index";
import { useUserStore } from "../../store/userStore";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  function onSubmit(data: FieldValues) {
    loginUser(data as UserLoginData)
      .then((res) => {
        setUser(res);
        setCookie("token", res.token, {
          path: "/",
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 6000,
        });
        navigate("/queues");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const handleVerifyToken = () => {
      verifyToken().then(({ user }) => {
        setUser(user);
        navigate("/queues");
      });
    };
    handleVerifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2 h-screen max-h-600 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full max-w-md h-[500px]"
      >
        <Inputs.Text type="text" {...register("email")} />
        <Inputs.Text type="password" {...register("password")} />
        <Button type="submit">Login</Button>
        <a className="text-sm text-blue-500" href="/register">
          Dont have an account? Register
        </a>
      </form>
    </div>
  );
}
