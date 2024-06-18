import React, { useState, useEffect } from "react";
import { Divider, Image, Link } from "@nextui-org/react";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { AiOutlineMail } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { useNavigate, useHref } from "react-router-dom";
import { supabase } from "../../utils/supabase.js";
export default function HomePage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [existingUserName, setExistingUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [verify, setVerify] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

    
        if (error) {
          console.error(error.message);
        } else {
          setUserEmail(user.email);

          const { data, error } = await supabase
            .from("user")
            .select("nama_user")
            .eq("email", user.email)
            .single();

            if(!data.nama_user) {
              navigate('/verify')
            } else {
              return;
            }

          if (error) {
            console.error(error.message);
          } else {
            if (data) {
              setExistingUserName(data.nama_user);
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);
  return (
    <main className="bg-violet-50 font-violet relative">
      <section className="container flex flex-col lg:flex-row justify-center items-center h-[calc(100vh-80px)]">
        <div className="text-center lg:mr-8 lg:text-left">
          <h1 className="sm:text-2xl md:text-3xl text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Send Heartfelt Letters with Letter4Tomorrow
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 mb-4">
            Experience the joy of sending secure and heartfelt letters to your
            loved ones.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 mb-8"></p>
          <Button className="text-lg px-8 py-3">Get Started</Button>
        </div>
        <div className="flex justify-center items-center mt-8 lg:mt-0">
          <Image
            className="object-contain max-w-[400px]] lg:max-w-[500px]"
            src="/amulet.gif"
            alt="Eternal Tomorrow App"
          />
        </div>
      </section>
      <div className="pb-16">
        <h2 className="text-3xl font-bold text-violet-600 mt-4 text-center mb-12">
          Features Eternal Tomorrow
        </h2>
      </div>
      <main className="bg-white">
        <section className="container mx-auto mt-16 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 absolute inset-0 -top-[80px] pb-96">
            <div className="flex justify-center items-center">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 ">
                  Secure and Encrypted{" "}
                </h3>
                <p className="text-gray-600">
                  Your letters are encrypted end-to-end, ensuring privacy and
                  security.
                </p>
              </Card>
            </div>
            <div className="flex justify-center items-center">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Customizable Designs
                </h3>
                <p className="text-gray-600">
                  Choose from a variety of beautiful templates to customize your
                  letters.
                </p>
              </Card>
            </div>
            <div className="flex justify-center items-center">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Fast and Reliable Delivery
                </h3>
                <p className="text-gray-600">
                  We ensure timely delivery of your letters to your loved ones.
                </p>
              </Card>
            </div>
          </div>
        </section>
        <Divider />
        <section className="mt-96 md:lg:mt-0">
          <div className="hidden md:lg:xl:block mt-96">
            <div className="flex justify-between container">
              <div>
                <Card className=" p-4 ">
                  <Image
                    src="/home/iphone.png"
                    className="object-cover size-full"
                  />
                </Card>
              </div>
              <div className="mx-[] py-60">
                <h1 className="font-bold text-4xl">
                  See a Eternal Tomorrow <br />
                  Applications
                </h1>
                <p className="text-lg text-gray-600 mt-4">
                  With Our Application, you are able to expressing your <br />
                  emotion or expressing your heartfelt message to <br />
                  everyone also receiving a message from ur friend <br />
                  that secured encrypted
                </p>
                {/* <p className="text-md">
                  With Our Application, you are able to expressing your emotion
                  or expressing your heartfelt message to everyone or your
                  friend that securedy encrypted
                </p> */}
              </div>
            </div>
            <div className="mt-[200px]"></div>
            <section className="container">
              <div className="flex justify-between">
                <div className="mx-[] py-60">
                  <h1 className="font-bold text-4xl">
                    <TypeAnimation
                      sequence={[
                        "Inspired By",
                        1000,
                        "Inspired By Violet",
                        1000,
                        "Inspired By Violet Evergarden",
                        1000,
                        "Inspired By Violet Evergarden.",
                        500,
                      ]}
                      wrapper="h1"
                      repeat={Infinity}
                    />
                  </h1>
                  <p className="text-lg text-gray-600 mt-4">
                    Some Assets of our application is Copyrighted by Violet
                    Evergarden
                    <br />
                    which is a Visual Novel That Written By{" "}
                    <span className="cursor-pointer text-violet-600 hover:text-violet-400 font-semibold">
                      <Link href="https://myanimelist.net/people/22715/Kana_Akatsuki">
                        -Kana Akatsuki-
                      </Link>
                    </span>
                    And Anime <br /> that Developed also Published By{" "}
                    <span className="cursor-pointer hover:text-violet-400 text-violet-600 font-semibold">
                      <Link href="https://www.kyotoanimation.co.jp/en/">
                        Kyoto Animation
                      </Link>
                    </span>
                  </p>
                  <Link
                    className="mt-4"
                    href="https://violet-evergarden.jp/novelty/"
                  >
                    <Button size="lg" variant="bordered">
                      License
                    </Button>
                  </Link>
                </div>
                <div>
                  <Card>
                    <Image
                      src="/violet/Letter.jpg"
                      className="object-contain"
                      alt="Violet Evergarden Letter"
                    />
                  </Card>
                </div>
              </div>
            </section>
            <div className="mb-4"></div>
            <Divider />
            <div className="mb-96"></div>
          </div>
          
        </section>
      </main>
    </main>
  );
}
