import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../utils/supabase.ts";
import { getUserByEmail, getUserFromTable } from "../../../libs/UserLibs.js";
import { motion, AnimatePresence } from "framer-motion";
import { Spacer } from "@nextui-org/react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import MainMailNotif from "./MainMailNotif.tsx";
import { Spinner } from "@nextui-org/react";
import ReactPlayer from "react-player";
import { format } from "date-fns";
export default function MainMailParams() {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVidedo] = useState(false);
  const [mailData, setMailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [videoUrl, setVideoUrl] = useState(false);
  const [isWaxLoaded, setIsWaxLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const { mailId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const user = await getUserByEmail();
        setUserEmail(user?.email);

        const userDataFromTable = await getUserFromTable(user?.email);
        setUserData(userDataFromTable);
      } catch (error) {
        console.error(error as Error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function fetchMailData() {
      try {
        const { data, error } = await supabase
          .from("message")
          .select("*")
          .eq("id", mailId)
          .eq("ReceiverMaillerURL", userData?.id)
          .single();

        if (error) {
          throw error;
        }

        setMailData(data);

        const res = await supabase.storage
          .from("gambar/picture")
          .getPublicUrl(data.gambar);

        setImage(res.data.publicUrl);

        setShowImage(!showImage);
        if (data?.video) {
          setVideoUrl(data.video);
        }
      } catch (error) {
        console.error("Error fetching mail data:", error as Error);
      } finally {
        setLoading(false);
      }
    }

    if (mailId && userData) {
      fetchMailData();
    }
  }, [mailId, userData]);

  const handleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };
  return (
    <>
      <div></div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <Spinner className="" size="lg">
            <p className="text-black text-md">Loading</p>
          </Spinner>
        </div>
      )}
      {!loading && !userEmail && (
        <div className="flex justify-center items-center h-screen bg-white bg-opacity-30">
          <h1 className="text-2xl">Privasi Orang Bang</h1>
        </div>
      )}
      {!loading && userEmail && mailData && (
        <main className="font-violet bg-white mt-8 relative pb-[400px]">
          <div className="flex justify-center items-center">
            <MainMailNotif />
            <AnimatePresence>
              {!showDetail ? (
                <motion.div
                  key="mailPreview"
                  className="mt-16 shadow-xl max-w-sm lg:max-w-[600px] xl:max-w-[600px] w-full mx-auto relative overflow-visible "
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className={`left-[170px] xs:left-[172px] absolute top-0  lg:left-[271px] xl:left-[280px] ${
                      isWaxLoaded ? "block z-10" : "hidden"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShowDetail}
                  >
                    <Image
                      className="cursor-pointer"
                      onLoad={() => setIsWaxLoaded(true)}
                      src="/seal.png"
                      height={45}
                      width={45}
                      alt="WAX"
                    />
                  </motion.div>
                  <motion.div
                    className="rounded-lg shadow-md overflow-hidden relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card shadow="lg" className=" pb-96">
                      <CardHeader></CardHeader>
                      <Divider />
                      <CardBody>
                        <div className="text-center mb-4">
                          <p className="text-lg font-semibold capitalize">
                            Dear Major ({userData.nama_user})
                          </p>
                        </div>
                      </CardBody>
                      <Divider />
                    </Card>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="mailDetail"
                  className="mt-4 max-w-md lg:max-w-[600px] xl:max-w-[600px] w-full mx-auto relative "
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className={`absolute top-0 left-[202px] ${
                      isWaxLoaded ? "block z-10" : "hidden"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShowDetail}
                  ></motion.div>
                  {mailData.message && (
                    <Card className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 border border-gray-300">
                      <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-serif text-gray-800 mb-4">
                          Dear {userData.nama_user},
                        </h1>
                        <Divider />
                        <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-6">
                          {mailData.message}
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {mailData.sub_c}
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {mailData.fare_c}
                        </p>
                        <Spacer y={1} />
                        <Divider />
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Violet Evergarden
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(mailData.send_at)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {mailData.gambar && (
                    <Card className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 border border-gray-300">
                      <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-serif text-gray-800 mb-4">
                          Dear {userData.nama_user},
                        </h1>
                        <Divider />
                        <Image src={image} />
                        <Divider />
                        <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-6">
                          {mailData.title}
                        </p>
                      </div>
                    </Card>
                  )}

                  {mailData.video && videoUrl && typeof videoUrl === "string" && (
                    <>
                      <Card className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 border border-gray-300">
                        <div className="flex flex-col items-center">
                          <h1 className="text-4xl font-serif text-gray-800 mb-4">
                            Dear {userData.nama_user},
                          </h1>
                          <Divider />
                          <ReactPlayer
                            url={videoUrl}
                            controls={true}
                            className="rounded-lg shadow-md overflow-hidden"
                            width="100%"
                          />
                          <Divider />
                          <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-6">
                            {mailData.title}
                          </p>
                        </div>
                      </Card>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      )}
    </>
  );
}
