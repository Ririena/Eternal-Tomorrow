import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayouts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Me from "./pages/Me";
function App() {
  const withLayout = (LayoutComponent: any, ChildComponent: any) => {
    return (props: any) => (
      <LayoutComponent>
        <ChildComponent {...props}></ChildComponent>
      </LayoutComponent>
    );
  };

  const HomeWithLayout = withLayout(HomeLayout, Home);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeWithLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="me" element={<Me />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
