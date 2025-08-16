import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { schemaRegister } from "../../validator/authSchema";
import InputForm from "../form/InputForm";
import BtnForm from "../form/BtnForm";
import { UserRoundCheck } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

import AddImgProfile from "../form/AddImgProfile";
import useUserStore from "../../stores/userStore";
import axiosInstance from "../../config/axios";

const initialInput = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

function Register() {
  const actionRegister = useUserStore((state) => state.register);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const hdlFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removePic = (e) => {
    e.stopPropagation();
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickPic = () => {
    fileInputRef.current.click();
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: initialInput,
    shouldFocusError: true,
    resolver: yupResolver(schemaRegister),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formdata = new FormData();
      formdata.append("image", file);
      formdata.append("email", data.email);
      formdata.append("username", data.username);
      formdata.append("password", data.password);
      formdata.append("confirmPassword", data.confirmPassword);

      await actionRegister(formdata);

      toast.success("Login success");
      reset();
      setFile(null);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1>Register</h1>

        <AddImgProfile
          file={file}
          handleClickPic={handleClickPic}
          fileInputRef={fileInputRef}
          hdlFileChange={hdlFileChange}
          removePic={removePic}
        />

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
          name="username"
          placeholder="Please Enter your username"
          error={errors.username?.message}
        />

        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="password"
          placeholder="Please Enter your Password"
          error={errors.password?.message}
        />
        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="confirmPassword"
          placeholder="Please Enter your confirm password"
          error={errors.confirmPassword?.message}
        />

        <BtnForm isLoading={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading w-4 h-4 text-sm loading-spinner text-roamology"></span>
              Loading...
            </>
          ) : (
            <>
              <UserRoundCheck width={20} />
              Sign Up
            </>
          )}
        </BtnForm>
      </form>

      <a href="http://localhost:8887/api/v1/auth/google">
        <button>Login with Google</button>
      </a>
    </>
  );
}
export default Register;
