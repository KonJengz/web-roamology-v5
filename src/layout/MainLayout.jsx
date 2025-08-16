import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="pt-8 pb-4 px-4 md:pt-12 md:px-14 2xl:pt-12 2xl:px-22">
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
export default MainLayout;
