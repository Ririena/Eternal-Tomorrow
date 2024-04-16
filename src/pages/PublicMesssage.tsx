import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PublicMessage() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/chat");
        setResponse(result.data);
      } catch (error) {
        console.error(error as Error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <main className="container">
        {response ? <p>Response: {response}</p> : <p>Loading...</p>}
      </main>
    </>
  );
}
