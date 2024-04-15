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
import { useState } from "react";
import { supabase } from "../utils/supabase.js";
import { useToast } from "@/components/ui/use-toast.js";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

function signUp() {
  navigate("/signup")
}

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email harus diisi",
      }));
      return;
    }

    if (!form.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password harus diisi",
      }));
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast({
          title: `Sepertinya Ada Yang Salah`,
          description: `Email Atau Password Tidak Sesuai Dengan Data`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Selamat Datang Kembali",
          description: `${data.session?.user.email}`,
          variant: "success",
        });

        navigate("/me")
      }
      console.log(data);
    } catch (error) {
      toast({
        title: "Sepertinya Ada Yang Error Di Sisi Server",
        description: `${error as Error}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Reset error when input changes
    }));
  };

  return (
    <div className="mx-auto container font-montserrat">
      <div className="flex justify-center mt-12">
        <form onSubmit={handleSubmit} className="w-full sm:max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-violet-400">
                <span className="text-violet-500">LOG</span>IN
              </CardTitle>
              <CardDescription>Log in To Your Session</CardDescription>
              <Divider />
            </CardHeader>
            <CardContent className="grid gap-2">
              <CardDescription className="text-violet-500">
                Email:
              </CardDescription>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
              <CardDescription className="text-violet-500">
                Password:
              </CardDescription>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </CardContent>
            <Divider className="mb-4" />
            <CardFooter className="grid gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full" disabled={isSubmitting}>
                  Sign In
                </Button>
              </motion.div>
              <div className="flex justify-between">
                <p className="text-md font-normal">Didn't Have An Account?</p>
                <p className="text-violet-600 hover:text-indigo-400 cursor-pointer" onClick={signUp}>
                  Sign Up
                </p>
              </div>
              <Divider />
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
                <Button
                  variant="outline"
                  className="shadow-md w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
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
  );
}
