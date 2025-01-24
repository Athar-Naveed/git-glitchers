import Chatbot from "@/components/ui/chatbot";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MindLoom | Chatbot",
    description: "A Personalized AI agent for next generation learning",
  };

export default function ML(){
    return (
        <>
        <Chatbot />
        </>
    )
}