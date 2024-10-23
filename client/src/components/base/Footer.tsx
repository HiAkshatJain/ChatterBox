import { cn } from "@/lib/utils";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className={cn("bg-slate-800 text-white py-4")}>
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Quick Chatt.... All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
