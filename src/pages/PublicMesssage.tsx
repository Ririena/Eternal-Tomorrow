import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { Input } from "@/components/ui/input";
import { Divider } from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
export default function PublicMessage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [contentData, setContentData] = useState([]);
  const { toast } = useToast();
  const handleSaveContent = async () => {
    try {
      const newContent = { content, title };
      const { data, error } = await supabase
        .from("content")
        .insert([newContent]);

      if (error) {
        throw error;
      } else {
        toast({
          variant: "success",
          title: "Success Delivered",
          description: "Data Berhasil Dikirim, Terima Kasih!!",
        });
        console.log("Data Berhasil Dikirim", data);
        setContent("");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to submit content. Please try again.");
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.from("content").select("*");

        if (error) {
          throw error;
        } else {
          setContentData(data || []);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM, dd, yyyy");
  };

  return (
    <main className="mx-auto container font-violet">
      <section className="flex justify-center items-center">
        <div className="w-[400px] xs:sm:w-[500px] md:w-[600px] mt-4">
          <Card>
            <CardHeader className="grid grid-cols-1">
              <div>
                <h1 className="text-xl text-gray-400">Content Idea</h1>
                <Divider />
              </div>

              <Input
                value={title}
                placeholder="Enter Your Title For Ariena Dev Source"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                value={content}
                placeholder="Enter Your Idea For Future Update"
                onChange={(e) => setContent(e.target.value)}
              />
              <Button onClick={handleSaveContent}>Submit Your Ideas</Button>
            </CardHeader>
          </Card>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="mt-4">
          <h1 className="text-gray-400 text-xl mx-auto text-center"></h1>
          <ul>
            {contentData.length > 0 ? (
              contentData.map((item) => (
                <li key={item.id} className="flex flex-col items-center">
                  <div>
                    <Card className="w-[400px] xs:sm:w-[500px] md:w-[600px]">
                      <CardHeader>
                        <h1 className="text-xl text-center">{item.title}</h1>
                      </CardHeader>
                      <Divider />
                      <CardDescription className="m-4">
                        <p className="text-md text-center">{item.content}</p>
                      </CardDescription>
                      <Divider />
                      <CardFooter className="flex justify-center items-center mt-2">
                        <p className="text-center">
                          {formatDate(item.created_at)}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </li>
              ))
            ) : (
              <p>List is empty.</p>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
