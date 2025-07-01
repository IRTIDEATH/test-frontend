import { Computer } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary py-4 w-full text-center flex items-center justify-center ">
      <div className="font-semibold inline-flex items-center gap-1 text-primary-foreground">
        <Computer />
        <span>Logoipsum</span>
      </div>
      <span className="ml-3 text-xs font-normal text-primary-foreground">
        © 2025 Blog genzet. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
