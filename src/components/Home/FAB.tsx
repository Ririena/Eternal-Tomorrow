import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineTrophy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function FAB() {
  const navigate = useNavigate();

  function handleMail() {
    navigate("/mail");
  }

  function handleMe() {
    navigate("/me");
  }

  function handleRank() {
    navigate("/rank");
  }
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger>
          <div className="rounded-full size-[60px] bg-violet-500 text-white flex justify-center items-center cursor-pointer">
            +
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs w-full bg-white border border-gray-200 shadow-lg rounded-lg p-4 origin-bottom-end">
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={handleMe}
              className="rounded-full p-3 bg-green-500 text-white cursor-pointer"
            >
              <AiOutlineUser className="w-6 h-6" />
            </div>
            <div
              onClick={handleMail}
              className="rounded-full p-3 bg-blue-500 text-white cursor-pointer"
            >
              <AiOutlineMail className="w-6 h-6" />
            </div>
            <div
              onClick={handleRank}
              className="rounded-full p-3 bg-yellow-500 text-white cursor-pointer"
            >
              <AiOutlineTrophy className="w-6 h-6" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
