import { Button } from "@/components/ui/button";
import { Divider } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
  const { toast } = useToast();
  const [tambahUsers, setTambahUsers] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTambahUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    if (tambahUsers.password !== tambahUsers.password2) {
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: tambahUsers.email,
        password: tambahUsers.password,
      });

      if (error) {
        toast({
          title: "Sepertinya Ada Yang Salah",
          description: `${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: `Selamat, Akun Anda Telah Dibuat ${data}`,
          description: "Dipindahkan ke Halaman Login",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: `Sepertinya Ada Error Di Sisi Server`,
        description: `Error: ${error as Error}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="mx-auto container font-montserrat">
        <div className="flex justify-center mt-12">
          <form onSubmit={handleSubmit} className="w-full sm:max-w-md">
            <Card className="w-full sm:max-w-[500px]">
              <CardHeader>
                <CardTitle className="text-violet-400">
                  <span className="text-violet-500">Sign</span>Up
                </CardTitle>
                <CardDescription>Create A New Account</CardDescription>
                <Divider />
              </CardHeader>
              <CardContent className="grid gap-2">
                <CardDescription className="text-violet-500">
                  Email:
                </CardDescription>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={tambahUsers.email}
                  onChange={handleChange}
                />
                <CardDescription className="text-violet-500">
                  Password:
                </CardDescription>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={tambahUsers.password}
                  onChange={handleChange}
                />
                <CardDescription className="text-violet-500">
                  Confirm Password:
                </CardDescription>
                <Input
                  type="password"
                  name="password2"
                  placeholder="Password"
                  value={tambahUsers.password2}
                  onChange={handleChange}
                />
              </CardContent>
              <Divider className="mb-4" />
              <CardFooter className="grid gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button type="submit" className="w-full">
                    {isSubmitting ? "Submitting..." : "Signup"}
                  </Button>
                </motion.div>
                <div className="mt-2">
                  <h1 className="text-md font-normal">
                    <div className="flex justify-between mx-2">
                      <h1>Already Have An Account?</h1>
                      <p className="text-violet-600 hover:text-indigo-400 cursor-pointer">
                        Sign In
                      </p>
                    </div>
                  </h1>
                </div>
                <div className="flex justify-center items-center my-4">
                  <Divider className="w-1/4 sm:w-48" />
                  <h1 className="text-lg text-violet-400 mx-2">Or</h1>
                  <Divider className="w-1/4 sm:w-48" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid"
                >
                  <Button variant="outline" className="shadow-md">
                    <span className="flex items-center">
                      <Image src="/google.png" width={30} />
                      <span className="ml-2">Continue with Google</span>
                    </span>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
