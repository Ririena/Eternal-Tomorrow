import React, { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import {
  AiOutlineDelete,
  AiOutlineLineChart,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { Divider } from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea";

export default function Admin() {
  const [versionPatch, setVersionPatch] = useState("");
  const [versionTitle, setVersionTitle] = useState("");
  const [versionContent, setVersionContent] = useState("");
  const [picture, setPicture] = useState(null);
  const handleSaveVL = async () => {
    let versionImage = null;

    if (picture) {
      versionImage = `${uuidv4()}.${picture.name.split(".").pop()}`;

      const { data, error } = await supabase.storage
        .from("gambar")
        .upload(`version/${versionImage}`, picture);

      if (error) {
        alert(error as Error);
      }
    }

    const newVersion = {
      title: versionTitle,
      patch: versionPatch,
      content: versionContent,
      image: versionImage,
    };

    const { data, error } = await supabase.from("version").insert([newVersion]);
    if (error) {
      alert(error);
    } else {
      console.log("Data Berhasil Dikirim", data);
    }
  };

  return (
    <>
      <section className="font-montserrat">
        <h1 className="text-gray-600 text-2xl">Management System</h1>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:xl:grid-cols-4 gap-4 ">
          <Card className="text-gray-500 p-4 mt-5">
            <div className="flex">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className=" bg-purple-600 rounded-md">
                    <AiOutlineLineChart size="15px" className="" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="">
                  <div className="mx-auto h-full md:lg:xl:h-[500px]">
                    <Card className="w-96">
                      <div className="flex justify-center items-center">
                        <DrawerHeader>
                          <DrawerTitle>Version List CMS</DrawerTitle>
                        </DrawerHeader>
                      </div>
                      <section className="p-4">
                        <div className="grid gap-3">
                          <Input
                            type="text"
                            placeholder="Enter Version Patch"
                            value={versionPatch}
                            onChange={(e) => setVersionPatch(e.target.value)}
                          />
                          <Input
                            type="text"
                            placeholder="Enter Version Title"
                            value={versionTitle}
                            onChange={(e) => setVersionTitle(e.target.value)}
                          />
                          <Textarea
                            value={versionContent}
                            onChange={(e) => setVersionContent(e.target.value)}
                            placeholder="Enter Version Content"
                          />
                          <div>
                            <label htmlFor="vimg">Version Image</label>
                            <Input
                              type="file"
                              accept="image/*"
                              id="vimg"
                              onChange={(e) => setPicture(e.target.files[0])}
                              placeholder="Enter Version Image(Optional)"
                            />
                          </div>
                        </div>
                      </section>
                      <Divider />
                      <CardFooter>
                        <div className="mx-auto mt-4">
                          <Button onClick={handleSaveVL}>
                            Submit Version List
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </DrawerContent>
              </Drawer>
              <h1 className="p-2 ml-2">Version Input</h1>
            </div>
          </Card>
          <Card className="text-gray-500 p-4 mt-5">
            <div className="flex">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className=" bg-primary-500 hover:bg-primary-600 rounded-md">
                    <AiOutlineMail size="15px" className="" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="">
                  <div className="mx-auto h-full md:lg:xl:h-[500px]">
                    <Card className="w-96">
                      <div className="flex justify-center items-center">
                        <DrawerHeader>
                          <DrawerTitle>Version List CMS</DrawerTitle>
                        </DrawerHeader>
                      </div>
                    </Card>
                  </div>
                </DrawerContent>
              </Drawer>
              <h1 className="p-2 ml-2">All Mail(Ariena Kawaii)</h1>
            </div>
          </Card>
          <Card className="text-gray-500 p-4 mt-5">
            <div className="flex">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className=" bg-green-500 hover:bg-green-600 rounded-md">
                    <AiOutlineUser size="15px" className="" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="">
                  <div className="mx-auto h-full md:lg:xl:h-[500px]">
                    <Card className="w-96">
                      <div className="flex justify-center items-center">
                        <DrawerHeader>
                          <DrawerTitle>Version List CMS</DrawerTitle>
                        </DrawerHeader>
                      </div>
                    </Card>
                  </div>
                </DrawerContent>
              </Drawer>
              <h1 className="p-2 ml-2">List User</h1>
            </div>
          </Card>
          <Card className="text-gray-500 p-4 mt-5">
            <div className="flex">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="destructive" className="  rounded-md">
                    <AiOutlineDelete size="15px" className="" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="">
                  <div className="mx-auto h-full md:lg:xl:h-[500px]">
                    <Card className="w-96">
                      <div className="flex justify-center items-center">
                        <DrawerHeader>
                          <DrawerTitle>Version List CMS</DrawerTitle>
                        </DrawerHeader>
                      </div>
                    </Card>
                  </div>
                </DrawerContent>
              </Drawer>
              <h1 className="p-2 ml-2">Delete Content</h1>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
