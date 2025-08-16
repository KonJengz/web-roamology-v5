import { X } from "lucide-react";
import Login from "./Login";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../validator/authSchema";
import Register from "./Register";

const initialInput = {
  email: "",
  password: "",
};

function ModalLogin() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: initialInput,
    shouldFocusError: true,
    resolver: yupResolver(schemaLogin),
  });

  const handleClose = () => {
    document.getElementById("modal_login").close();
    reset();
  };
  return (
    <dialog id="modal_login" className="modal">
      <div className="modal-box rounded-2xl p-8">
        <Login
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />

        <div className="divider"></div>
        <Register />
        <button
          type="button"
          onClick={handleClose}
          className="btn-circle absolute top-3 right-4 text-roamology-2 hover:text-roamology-2/50 duration-100"
        >
          <X width={20} />
        </button>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
export default ModalLogin;
