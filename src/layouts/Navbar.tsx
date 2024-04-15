import {
  AiFillMail,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
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
export default function Header() {
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
                    <p>Kawaranai@gmail.com</p>
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
                    <Button variant="outline" className="flex items-center">
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
