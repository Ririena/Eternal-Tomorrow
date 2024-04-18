import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminVersionInsert() {
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");

  const handleVersionChange = (e) => {
    setVersion(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    // Lakukan penanganan submit disini, misalnya kirim data ke server
    console.log("Submitting version:", version);
    console.log("Submitting description:", description);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Insert Version List</h1>
      <Card>
        <div className="mb-4">
          <label htmlFor="version" className="block text-sm font-medium text-gray-700">
            Version:
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={version}
            onChange={handleVersionChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter version number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none"
            placeholder="Enter version description"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}
