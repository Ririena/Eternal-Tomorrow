import { Divider } from "@nextui-org/react";
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
import { FaPlusMinus } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast";
import { useDisclosure } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, getUserFromTable } from "@/libs/UserLibs";

const Evergarden = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anonUser, setAnonUser] = useState("");
  const [allNote, setAllNote] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track ID of note being edited
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByEmail();
        const userDataFromTable = await getUserFromTable(user?.email);
        setUserData(userDataFromTable);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const newNote = {
        title: title,
        content: content,
        anonuser: anonUser,
        created_by: userData ? userData.id : null, // Set createdBy to user ID if authenticated, otherwise null
      };

      const { data, error } = await supabase.from("evergarden").insert([newNote]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to save note",
          description: error.message,
        });
        console.error("Failed to save note", error);
      } else {
        toast({
          variant: "success",
          title: "Note saved successfully",
          description: "Your note has been saved.",
        });
        console.log("Note saved successfully", data);
        resetForm();
        onClose();
        fetchNotes(); // Fetch updated notes
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Bad Server",
      });
      console.error("Failed to save note", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedNote = {
        title: title,
        content: content,
        anonuser: anonUser,
      };

      const { error } = await supabase
        .from("evergarden")
        .update(updatedNote)
        .eq('id', editingId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to update note",
          description: error.message,
        });
        console.error("Failed to update note", error);
      } else {
        toast({
          variant: "success",
          title: "Note updated successfully",
          description: "Your note has been updated.",
        });
        console.log("Note updated successfully");
        resetForm();
        onClose();
        fetchNotes(); // Fetch updated notes
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Bad Server",
      });
      console.error("Failed to update note", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Fetch the note details to check createdBy
      const { data: note, error } = await supabase
        .from('evergarden')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to fetch note",
          description: error.message,
        });
        console.error("Failed to fetch note", error);
        return;
      }

      // Check if the authenticated user can delete this note
      if (!userData) {
        // Handle case when user is not authenticated
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "You must be logged in to delete messages.",
        });
        return;
      }

      if (note.created_by === null || note.created_by === userData.id) {
        // Allow deletion if note is anonymous or created by the authenticated user
        const { error: deleteError } = await supabase
          .from('evergarden')
          .delete()
          .eq('id', id);

        if (deleteError) {
          toast({
            variant: "destructive",
            title: "Failed to delete note",
            description: deleteError.message,
          });
          console.error("Failed to delete note", deleteError);
        } else {
          toast({
            variant: "success",
            title: "Note deleted successfully",
            description: "Your note has been deleted.",
          });
          console.log("Note deleted successfully");
          fetchNotes(); // Fetch updated notes
        }
      } else {
        // Handle case when authenticated user tries to delete another user's message
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "You are not authorized to delete this message.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Bad Server",
      });
      console.error("Failed to delete note", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase.from("evergarden").select("*");

      if (error) {
        console.error("Failed to fetch notes", error.message);
        toast({
          variant: "destructive",
          title: "Failed to fetch notes",
          description: error.message,
        });
      } else {
        setAllNote(data);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Bad Server",
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setAnonUser("");
    setEditingId(null);
  };

  return (
    <main className="font-violet container mx-auto p-4 bg-gray-50">
      <section className="mt-4">
        <h1 className="text-3xl font-bold text-purple-800">Evergarden Notes</h1>
        <Divider className="my-6 border-purple-600" />
        <Card className="mb-6 p-6 bg-violet-700 rounded-lg shadow-lg flex justify-between items-center">
          <h1 className="text-xl text-white">Build Your Own Notes Now</h1>
          <Button
            className="bg-white text-violet-700 font-bold shadow-lg hover:bg-gray-200 transition"
            onPress={() => {
              resetForm();
              onOpen();
            }}
          >
            Create Now
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {editingId ? 'Edit Note' : 'Create Note'}
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
                  <Button color="danger" onPress={() => {
                    resetForm();
                    onClose();
                  }}>
                    Close
                  </Button>
                  <Button color="primary" onClick={editingId ? handleUpdate : handleSave}>
                    {editingId ? 'Update Note' : 'Send Evergarden'}
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {allNote.map((note) => (
            <>
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
                  <h2
                    className="text-lg font-bold text-violet-900">
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
                  <div className="flex space-x-2">
                    {userData && (note.created_by === userData.id) && ( // Check if user is authenticated
                      <Button
                        color="info"
                                                className="bg-indigo-500 hover:bg-indigo-600"
                        onClick={() => {
                          setTitle(note.title);
                          setContent(note.content);
                          setAnonUser(note.anonuser);
                          setEditingId(note.id);
                          onOpen();
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    {(userData && (note.created_by === userData.id || note.created_by === null)) && (
                      <Button
className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(note.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
            </>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Evergarden;
