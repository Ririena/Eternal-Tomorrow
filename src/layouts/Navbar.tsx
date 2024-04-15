import { AiFillMail, AiFillProfile, AiFillSetting, AiOutlineLogout } from "react-icons/ai";

import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Divider,
} from "@nextui-org/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserByEmail, getUserFromTable } from "@/libs/UserLibs";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  async function logOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(error as Error);
      }
      navigate("/")
    } catch (error) {
      console.error(error as Error);
    }
  }

  function handleLogin() {
    navigate("/login")
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByEmail();
        setUserEmail(user?.email);
        console.log(userEmail);

        const userDataFromTable = await getUserFromTable(user.email);
        setUserData(userDataFromTable);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <h1>Loading Bang</h1>;
  }
  return (
    <>
      <Navbar
        position="sticky"
        className="font-montserrat shadow-md bg-gradient-to-r from-violet-500 to-violet-700 text-slate-100"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">L4Tomorrow</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-1" justify="center">
          <NavbarItem>
            <Button
              variant="link"
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
            >
              Features
            </Button>
          </NavbarItem>
          <NavbarItem isActive>
            <Button
              variant="link"
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
            >
              Customers
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="link"
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
            >
              Integrations
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="">
            <Popover>
              <PopoverTrigger>
                <Avatar className="transition hover:underline hover:ease-out duration-300 hover:scale-110 cursor-pointer">
                  <AvatarImage src="/violetP.jpg" />
                </Avatar>
                <PopoverContent className="w-52  text-sm">
                  <div className="font-semibold hover:bg-indigo-50 rounded-sm p-1 cursor-pointer">
                    <h1>Signed In As</h1>
                    {userData ? userData.email : "Loading..."}
                  </div>
                  <Divider />
                  <div className="grid gap-1 mt-2">
                    <Button variant="outline" className="flex items-center">
                      <AiFillSetting className="mr-1" />
                      <span>My Setting</span>
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <AiFillMail className="mr-1" />
                      <span>My Mail</span>
                    </Button>
                    <Button onClick={handleLogin} variant="default" className="flex items-center">
                      <AiFillProfile className="mr-1"/>
                      <span>My Session</span>
                    </Button>
                    <Button onClick={logOut} variant="destructive" className="flex items-center">
                      <AiOutlineLogout className="mr-1" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </PopoverContent>
              </PopoverTrigger>
            </Popover>
          </NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
