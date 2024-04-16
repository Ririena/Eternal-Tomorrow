import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import {Link, Image, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import {Card, CardHeader, CardContent as CardBody} from "../../ui/card"
export default function MailCard() {
  const [userId, setUserId] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("id")
          .eq("email", user.email)
          .single();

        if (userError) {
          throw userError;
        }

        setUserId(userData.id);

        const { data: receiver, error: receiverError } = await supabase
          .from("message")
          .select("*")
          .eq("ReceiverMaillerURL", userData.id);

        if (receiverError) {
          throw receiverError;
        }

        setReceiverData(receiver);
        console.log(receiver);
      } catch (error) {
        console.error("Error fetching user or messages:", error as Error);
      }
    }

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM, dd, yyyy");
  };

  const handleSelectMessagge = (message) => {
    setSelectedMessage(message);
  };

  return (
    <>
      <main>
        <section>
          {receiverData && (
            <div className=" flex justify-center items-center ">
              <ul className=" grid grid-cols-1 md:grid-cols-2 lg:xl:grid-cols-3  gap-8 m-4">
                {receiverData.map((message) => (
                  <li key={message.id} className="flex justify-center">
                    <motion.section
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      animate={{
                        opacity: 1,
                      }}
                      className="max-w-lg w-full"
                      style={{ transformOrigin: "center" }}
                    >
                      <Card className="border-2  border-primary-600">
                        <CardHeader>
                          <a href={`/me/mail/${message.id}`}>
                              <Image src="/LOGO.png" className="object-contain" width={400} />
                          </a>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <div className="font-montserrat">
                            <h1 className="text-xl mt-4">
                              {formatDate(message.send_at)}
                            </h1>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.section>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
