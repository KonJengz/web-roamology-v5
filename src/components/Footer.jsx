import { Copyright } from "lucide-react";
import ModalLogin from "./admin/ModalLogin";
import useUserStore from "../stores/userStore";
import BtnFooter from "./BtnFooter";
import usePostStore from "../stores/postStore";

function Footer() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const setPostAdmin = usePostStore((state) => state.setPostAdmin);

  const handleClickLogout = async () => {
    await logout();
    await setPostAdmin();
  };

  return (
    <>
      <footer className="border-t border-roamology flex-between pt-2 text-sm text-roamology">
        <button className="invisible">Login</button>
        <div className=" flex-center gap-1">
          <Copyright width={18} />
          <p className="text-sm">
            {new Date().getFullYear()} Roamology. All Rights Reserved.
          </p>
        </div>

        {user ? (
          <BtnFooter handleClick={handleClickLogout}>Logout</BtnFooter>
        ) : (
          <BtnFooter
            handleClick={() =>
              document.getElementById("modal_login").showModal()
            }
          >
            Login
          </BtnFooter>
        )}
      </footer>

      <ModalLogin />
    </>
  );
}
export default Footer;
