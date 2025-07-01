import Footer from "@/components/footer";
import Navbar from "@/components/navigation/navbar";
import ProfileCard from "@/components/profile-card";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-4 min-h-screen">
        <ProfileCard />
      </div>
      <Footer />
    </>
  );
}
