import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <>
      <div className="h-screen">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
