// Define the Message interface for chatbot and user messages
type ChatbotMessageType = {
    role?: "user" | "guest" |"MindLoom";
    content?: string;
    prompt?: string;
    visualization?: string;
  };

  export type{
    ChatbotMessageType,
  }
  