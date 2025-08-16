import InputForm from "../form/InputForm";

import { LogIn } from "lucide-react";
import BtnForm from "../form/BtnForm";
import useUserStore from "../../stores/userStore";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

function Login({ register, errors, isSubmitting, handleSubmit, handleClose }) {
  const login = useUserStore((state) => state.login);
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await login(data);
      toast.success("Login success");
      handleClose();
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl text-roamology font-light">
          Welcome to <i>Roamology</i>
        </h1>
        <p className="text-sm text-gray-600">Sign in for admin</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="email"
          placeholder="Please Enter your email"
          error={errors.email?.message}
        />
        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="password"
          placeholder="Please Enter your Password"
          error={errors.password?.message}
        />

        <BtnForm isLoading={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading w-4 h-4 text-sm loading-spinner text-roamology"></span>
              Loading...
            </>
          ) : (
            <>
              <LogIn width={20} />
              Sign In
            </>
          )}
        </BtnForm>
      </form>
    </div>
  );
}
export default Login;
