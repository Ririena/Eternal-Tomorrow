import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

let yourName: string = "Zayshi";
type CardProps = React.ComponentProps<typeof Card>;

export default function MainMeCard({ className, ...props }: CardProps) {
  return (
    <>
      <section className="bg-slate-50 pt-12 font-montserrat">
        <main className="">
          <div className="flex justify-center items-center">
            <div className=" max-w-md  lg:max-w-lg xl:max-w-lg">
              <Card className={cn("", className)} {...props}>
                <CardHeader>
                  <div className="mx-auto">
                    <Image src="/PFP.jpg" alt="Background Picture" sizes="lg" />
                  </div>
                </CardHeader>
                <Divider />

                <CardContent className="p-6">
                  <h1 className="text-violet-600 text-2xl font-bold mb-4 mx-auto text-center">
                    Ririena Kok Kowaii
                  </h1>
                  <Input
                    type="text"
                    className="mb-4"
                    placeholder={`Enter Your Title Major ${yourName}`}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="max-w-full w-full">Add New Title</Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
