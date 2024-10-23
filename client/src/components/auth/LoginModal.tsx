import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { DialogDescription } from "@radix-ui/react-dialog";

const handleGoogleLogin = async () => {
  signIn("google", {
    redirect: true,
    callbackUrl: "/",
  });
};

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-800 text-white hover:bg-slate-900 transition duration-300">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg shadow-lg bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-slate-900">
            Welcome to QuickChat
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Create secure chat links effortlessly and start conversations in
            seconds.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center mt-4 border-slate-900 text-slate-900 hover:bg-blue-50 transition duration-300"
        >
          <Image
            src="/images/google.png"
            className="mr-2"
            width={25}
            height={25}
            alt="Google logo"
          />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
