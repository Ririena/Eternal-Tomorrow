import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import { getUserByEmail, getUserFromTable } from "@/libs/UserLibs";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divider } from "@nextui-org/react";
export default function Verified() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [verify, setVerify] = useState(null);
  const [existingUserName, setExistingUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  useEffect(() => {
    async function init() {
      try {
        const user = await getUserByEmail();
        setUserEmail(user?.email);
        console.log(userEmail);

        const userDataFromTable = await getUserFromTable(user.email);
        setUserData(userDataFromTable);

        setLoading(false);
      } catch (error) {
        console.error(error as Error);
      }
    }
    init();
  }, []);

  const handleAddData = async () => {
    try {
      if (existingUserName) {
        console.log("Nama sudah ada:", existingUserName);
        return;
      }

      const { data, error } = await supabase
        .from("user")
        .insert([{ email: userEmail, nama_user: newUserName, Verified: true }]);
      if (error) {
        console.error(error.message);
      } else {
        console.log("Data added successfully:", data);
        setNewUserName("");
        setVerify(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error as Error);
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (userData && userData.nama_user) {
    console.log("Nama Sudah Ada", userData.nama_user);
    navigate("/me");
    return;
  }

  return (
    <>
      <main className="mx-auto container ">
        <section className="flex justify-center items-center h-screen">
          <div className=" mx-auto">
            <Card className="w-96">
              <CardContent>
                <div className="mt-4">
                  <Input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Remember, UserName Can't Be Changed"
                  />
                </div>
                <Divider className="mb-4 mt-4" />
                <div className="flex justify-center items-center">
                  <Button onClick={handleAddData} className="text-center">
                    Save UserName
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
