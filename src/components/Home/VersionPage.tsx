import { Card, Divider, Image, Badge } from "@nextui-org/react";
import { useState } from "react";

export default function MailboxPage() {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");

  const folders = ["Inbox", "Sent", "Drafts", "Trash"];

  return (
    <div className="container mx-auto mt-4">
      <Card className="max-w-3xl mx-auto p-8 rounded-lg bg-opacity-75">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold font-serif text-violet-900">
            {selectedFolder}
          </h1>
          <div className="flex space-x-4">
            {folders.map((folder) => (
              <Badge
                key={folder}
                color={selectedFolder === folder ? "primary" : "secondary"}
                onClick={() => setSelectedFolder(folder)}
                className="cursor-pointer"
              >
                {folder}
              </Badge>
            ))}
          </div>
        </div>
        <Divider className="border-violet-400 mb-4" />
        <div className="py-4">
          {/* Render Mail items here */}
        </div>
        <Divider className="border-violet-400 mt-4" />
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-600">Violet Evergarden</p>
            <p className="text-xs text-gray-400 "></p>
          </div>
          <Image src="/violetP.jpg" alt="Stamp" className="size-12" />
        </div>
      </Card>
    </div>
  );
}
