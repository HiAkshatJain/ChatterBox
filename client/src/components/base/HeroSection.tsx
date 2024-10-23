import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-16  from-blue-50 to-white">
      <h1 className="text-6xl font-extrabold text-slate-800 mb-6">
        Welcome to Chatter Box
      </h1>
      <p className="text-2xl text-gray-700 mb-10">
        Effortlessly connect and chat with anyone, anytime. Experience seamless
        conversations like never before!
      </p>
      <Link href="/dashboard">
        <Button
          size="lg"
          className="bg-slate-700 text-white hover:bg-slate-800 transition duration-300"
        >
          Get Started Now
        </Button>
      </Link>

      <div className="mt-12 w-full max-w-6xl flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/multiethnic-people-talking-discuss-social-network-two-friend-men-women-speaking-couples-with-speech-bubbles-character-dialogue-concept_90220-228.jpg?t=st=1729687294~exp=1729690894~hmac=3f2f602930ab5fca1b95f15c73aea4d74ce39196aa3ab1e1b193b1150ca851c7&w=740"
          alt="Chatter Box Illustration"
          className="w-full h-auto rounded-md shadow-md"
        />
      </div>
    </section>
  );
}
