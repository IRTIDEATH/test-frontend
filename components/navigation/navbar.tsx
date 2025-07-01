import { Computer } from "lucide-react";
import { UserMenu } from "./user-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-20 px-14 py-6 bg-primary-foreground">
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <Link
          href="/"
          className="flex items-center gap-2 text-accent-foreground"
        >
          <Computer />
          <span className="text-foreground text-xl font-semibold">
            Logoipsum
          </span>
        </Link>

        {/* Right side */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
