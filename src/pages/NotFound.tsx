import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-min-screen font-violet">
        <Card className="w-[500px]">
          <CardHeader>
            <Image className="object-contain" src="/NotFound.mp4" />
          </CardHeader>
          <Divider />
          <CardContent>
            <h1 className="text-2xl text-gray-400">
              Im Sorry Major, The Page Has Not Found
            </h1>
          </CardContent>
          <Divider />
          <CardFooter>
            <Button onClick={() => navigate("/")}>Back To Hom</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
