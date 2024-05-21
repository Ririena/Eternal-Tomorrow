import { Card, Divider, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function MailboxPage() {
  const [versionData, setVersionData] = useState([]);

  useEffect(() => {
    async function fetchVersion() {
      try {
        const { data, error } = await supabase.from("version").select("*");

        if (error) {
          console.error(error);
        }

        for (const version of data) {
          const { data: resData } = await supabase.storage
            .from("gambar/version")
            .getPublicUrl(version.image);

          version.image_url = resData.publicUrl;
        }

        setVersionData(data);
      } catch (error) {
        alert(error);
      }
    }

    fetchVersion();
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <Card className="max-w-3xl mx-auto p-8 rounded-lg bg-white shadow-lg relative">
        <div className="absolute inset-0 border-2 border-gray-300 rounded-lg pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold font-serif text-violet-900">
              Version List
            </h1>
          </div>
          <Divider className="border-violet-400 mb-4" />
          <div className="grid grid-cols-1 gap-4 mb-10">
            {versionData.map((version) => (
              <div
                key={version.id}
                className="flex items-center pb-4 border-b-2 border-gray-200"
              >
                <Image
                  src={version.image_url}
                  alt={version.title}
                  className="w-16 h-16 rounded-lg shadow-md"
                />
                <div className="ml-4">
                  <p className="text-xs text-gray-400">{version.patch}</p>
                  <p className="text-sm text-gray-600">{version.title}</p>
                  <p className="text-xs text-gray-400">{version.content}</p>
                </div>
              </div>
            ))}
          </div>
          <Divider className="border-violet-400 mt-4" />
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm text-gray-600">Violet Evergarden</p>
            </div>
            <Image src="/violetP.jpg" alt="Stamp" className="w-12 h-12 rounded-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
