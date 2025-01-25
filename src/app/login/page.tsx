// -----------------------
// Imports
// -----------------------
import {Metadata} from "next";
import RegloComponent from "@/components/reglo";
import {Toaster} from "react-hot-toast";

// -----------------------
// ML page details
// -----------------------
export const metadata: Metadata = {
  title: "Student Login | MindLoom AI",
  description:
    "Join MindLoom AI today and unlock the power of AI-powered tools for your educational journey and career.",
  icons: "/Logo/logo.svg",
};

// -----------------------
// MindLoom Starts Here
// -----------------------
export default function ML() {
  return (
    <>
      <RegloComponent />
      <Toaster />
    </>
  );
}