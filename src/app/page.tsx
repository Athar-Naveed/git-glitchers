import Landing from "@/components/ui/landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindLoom | Home",
  description: "A Personalized AI agent for next generation learning",
};

export default function Home() {
  return (
    <>
    <section>
      <Landing />
    </section>
    </>
  );
}
