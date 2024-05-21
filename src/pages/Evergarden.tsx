import { Divider, Image } from "@nextui-org/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useToast } from "@/components/ui/use-toast";
import { useDisclosure } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
const Evergarden = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anonUser, setAnonUser] = useState("");
  const [allNote, setAllNote] = useState([]);
  const navigate = useNavigate()
  const { toast } = useToast()
  const handleSave = async () => {
    try {
      const newNote = {
        title: title,
        content: content,
        anonuser: anonUser,
      };
      const { data, error } = await supabase
        .from("evergarden")
        .insert([newNote]);

      if (error) {
        toast({
          variant: "destructive",
          title: "You Missing Something To Fill",
          description: "Fulfill The Request For Greater Notes!!"
        })
        console.error("Failed To Save New Note");
      } else {
        toast({
          variant: "success",
          title: "Success Send A Note",
          description: "Don't Forget To Express To Som1 And Care Your Healthy"
        })
        console.log("Success");
        console.log(data);
        setContent("")
        setTitle("")
        setAnonUser("")
        navigate(0)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Bad Server"
      })
      console.error(error);
    }
  };

  const notes = [
    {
      title: "Catatan 1",
      content: "Ini adalah konten dari catatan pertama.",
    },
    {
      title: "Catatan 2",
      content: "Ini adalah konten dari catatan kedua.",
    },
    {
      title: "Catatan 3",
      content: "Ini adalah konten dari catatan ketiga.",
    },
  ];

  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await supabase.from("evergarden").select("*");

        if (error) {
          console.error(error.message);
        }
        setAllNote(data);
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  return (
    <main className="font-violet container mx-auto p-4 bg-gray-50">
      <section className="mt-4">
        <h1 className="text-3xl font-bold text-purple-800">Evergarden Notes</h1>
        <Divider className="my-6 border-purple-600" />
        <Card className="mb-6 p-6 bg-violet-700 rounded-lg shadow-lg flex justify-between items-center">
          <h1 className="text-xl text-white">Build Your Own Notes Now</h1>
          <Button
            className="bg-white text-violet-700 font-bold shadow-lg hover:bg-gray-200 transition"
            onPress={onOpen}
          >
            Create Now
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Notes
                  </ModalHeader>
                  <Divider />
                  <ModalBody>
                    <h1>Title Notes</h1>
                    <Input
                      placeholder="Title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <h1>Content Notes</h1>
                    <Input
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <h1 className="">Anon User Name</h1>
                    <Input
                      placeholder="Ariena Nerllysu"
                      value={anonUser}
                      onChange={(e) => setAnonUser(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                      Send Evergarden
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {allNote.map((note) => (
            <Card
              key={note.id}
              className="p-8 rounded-none shadow-lg bg-white relative border-t border-l border-r border-gray-200 first:rounded-t-lg last:rounded-b-lg"
              style={{
                backgroundImage: "url('/path-to-paper-texture.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-violet-900">
                    {note.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    From: {note.anonuser}
                  </p>
                </div>
                <Divider className="border-violet-400 mb-4" />
                <div className="py-4">
                  <p className="text-md leading-relaxed text-gray-800">
                    {note.content}
                  </p>
                </div>
                <Divider className="border-violet-400 mt-4" />
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-600">{note.anonuser}</p>
                    <p className="text-xs text-gray-400">Auto Memories Doll</p>
                  </div>
                  <Image
                    src="/violetP.jpg"
                    alt="Stamp"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Evergarden;
