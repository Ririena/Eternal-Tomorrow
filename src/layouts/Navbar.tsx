import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
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
import { Avatar } from "@/components/ui/avatar";
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

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const avatarFileName = uuidv4();
        const { data, error } = (await supabase.storage
          .from("avatar")
          .upload(avatarFileName, file, { cacheControl: "3600" })) as {
          data: { publicURL: string };
          error: Error;
        };
        if (error) {
          throw error;
        }
        const avatarUrl = data.publicURL;
        setAvatarUrl(avatarUrl);
        await supabase
          .from("user")
          .update({ avatar: avatarFileName })
          .eq("email", userEmail);
      } catch (error) {
        console.error("Error updating avatar:", error as Error);
      }
    }
  };

  console.log(avatarUrl)
  const handleSubmit = async () => {
    console.log("Changes saved!");
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
            <Button onClick={onClose}>Close</Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="transition hover:underline hover:ease-out duration-300 hover:scale-110 cursor-pointer">
                  <AvatarImage
                    src={userData ? userData.avatar : "/violetP.jpg"}
                  />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 rounded-md w-52 shadow-lg">
                <DropdownMenuItem>
                  <div className="font-semibold hover:bg-indigo-50 rounded-sm p-1 cursor-pointer">
                    <h1>Signed In As</h1>
                    {userData ? userData.email : "Loading..."}
                  </div>
                </DropdownMenuItem>
                <Divider />
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex-row">
                  <DropdownMenuItem onClick={onOpen}>
                    <AiOutlineUser size="1em" className="mr-4" />

                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AiOutlineMail size="1em" className="mr-4" />
                    <span>My Mail</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="">
                    <AiOutlineLogin size="1em" className="mr-4" />
                    <span onClick={handleLogin}>Log In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="">
                    <AiOutlineLogout size="1em" className="mr-4" />
                    <span onClick={logOut} className="">
                      Log Out
                    </span>
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
