import { motion } from "framer-motion";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Divider,
  Image,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";

import { getUserByEmail, getUserFromTable } from "@/libs/UserLibs";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
export default function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  function handleHome() {
    navigate("/");
  }

  function handleVersion() {
    navigate("/version");
  }

  function handleMail() {
    navigate("/me/mail");
  }
  async function logOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(error as Error);
      }
      navigate("/");
    } catch (error) {
      console.error(error as Error);
    }
  }

  function handleLogin() {
    navigate("/login");
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatarFile(file);
  };

  console.log(avatarUrl);
  const handleSubmit = async () => {
    try {
      if (selectedAvatarFile) {
        const avatarFileName = uuidv4();

        await supabase.storage
          .from("avatar")
          .upload(avatarFileName, selectedAvatarFile, { cacheControl: "3600" });

        const avatarUrl = await supabase.storage
          .from("avatar")
          .getPublicUrl(avatarFileName);
        await supabase
          .from("user")
          .update({ avatar: avatarFileName })
          .eq("email", userEmail);
        setAvatarUrl(avatarUrl);
      }
      console.log("Avatar saved successfully!");

      onClose();
    } catch (error) {
      console.error("Error saving avatar:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center items-center">
              <section className="">
                <Image
                  src={userData ? userData.avatar : "/violetP.jpg"}
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </section>
            </div>
            <Divider className="mt-4" />
            <div className="flex justify-center items-center">
              <section className="p-4">
                <Input type="file" onChange={handleAvatarChange} />
              </section>
              <Button onClick={handleSubmit}>Save Avatar</Button>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button className="w-full" variant="ninja" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Navbar
        position="static"
        className=" z-50 font-montserrat shadow-md bg-gradient-to-r from-violet-500 to-violet-700 text-slate-100"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">L4Tomorrow</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-1" justify="center">
          <NavbarItem>
            <Button
              variant="link"
              onClick={handleHome}
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
            >
              Homes
            </Button>
          </NavbarItem>
          <NavbarItem isActive>
            <Button
              onClick={handleMail}
              variant="link"
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
            >
              My Mail
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="link"
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
            >
              Public Message
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              className="text-violet-300 hover:text-violet-100 transition hover:underline hover:ease-out duration-300 hover:scale-110"
              onClick={handleVersion}
              variant="link"
            >
              Version List
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar
                  src={userData ? userData.avatar : "/violetP.jpg"}
                  className=" transition hover:underline hover:ease-out duration-300 hover:scale-110 cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 rounded-md w-52 shadow-lg">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="font-semibold hover:bg-indigo-50 rounded-sm p-1 cursor-pointer">
                    <h1>Signed In As</h1>
                    {userData ? userData.email : "Loading..."}
                  </div>
                </DropdownMenuItem>
                <Divider />
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex-row">
                  <DropdownMenuItem className="cursor-pointer" onClick={onOpen}>
                    <AiOutlineUser size="1em" className="mr-4" />

                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMail}
                  >
                    <AiOutlineMail size="1em" className="mr-4" />
                    <span>My Mail</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <AiOutlineLogin size="1em" className="mr-4" />
                    <span onClick={handleLogin}>Log In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <AiOutlineLogout size="1em" className="mr-4" />
                    <span onClick={logOut} className="cursor-pointer ">
                      Log Out
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <MdUpdate size="1em" className="mr-4" />
                    <span>Version List</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
