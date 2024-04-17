import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FAB from "@/components/Home/FAB";

export default function HomeLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <FAB/>
    </>
  );
}
