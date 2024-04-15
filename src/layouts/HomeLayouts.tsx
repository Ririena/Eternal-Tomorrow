import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomeLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <h1>hello</h1>
    </>
  );
}
