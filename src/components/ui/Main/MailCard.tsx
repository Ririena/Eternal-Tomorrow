import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Image, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent as CardBody } from "../../ui/card";
import { Spinner } from "@nextui-org/react";
export default function MailCard() {
  const [userId, setUserId] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Setelah data diterima, set loading ke false
      } catch (error) {
        console.error("Error fetching user or messages:", error);
        setLoading(false); // Pastikan untuk menangani kasus error dengan menyetel loading ke false
      }
    }

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM, dd, yyyy");
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <>
      <main>
        <section>
          {loading ? (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <Spinner className="" size="lg">
                <p className="text-black text-md">Loading</p>
              </Spinner>
            </div>
          ) : receiverData ? (
            <div className="flex justify-center items-center">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-4">
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
                            <Image
                              src="/LOGO.png"
                              className="object-contain"
                              width={400}
                            />
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
          ) : (
            <div>Data not found</div>
          )}
        </section>
      </main>
    </>
  );
}
