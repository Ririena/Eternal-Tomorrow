import React from "react";
import { Divider, Image } from "@nextui-org/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AiOutlineMail } from "react-icons/ai";
export default function HomePage() {
  return (
    <main className="bg-violet-50 font-montserrat relative">
      <section className="container flex flex-col lg:flex-row justify-center items-center h-[calc(100vh-80px)]">
        <div className="text-center lg:mr-8 lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Send Heartfelt Letters with Letter4Tomorrow
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 mb-4">
            Experience the joy of sending secure and heartfelt letters to your
            loved ones.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 mb-8">
            Inspired by Violet Evergarden.
          </p>
          <Button className="text-lg px-8 py-3">Get Started</Button>
        </div>
        <div className="flex justify-center items-center mt-8 lg:mt-0">
          <Image
            className="object-contain max-w-[300px] lg:max-w-[500px]"
            src="/amulet.gif"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 absolute inset-0 -top-[120px] pb-96">
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
      </main>
    </main>
  );
}
