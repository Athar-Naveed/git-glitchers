// -----------------------
// Imports
// -----------------------
import {ChatbotMessageType} from "@/types";
import Cookies from "js-cookie";


// -----------------------
// Fetching chatbot's chat history
// -----------------------
export const fetchChatHistory = async () => {
  const response = await fetch("/api/text", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {revalidate:6000}
  });
  const responseMessage = await response.json();
  if (responseMessage.status === 200) {
    const normalizedMessages: ChatbotMessageType[] = responseMessage.message.flatMap(
      (entry: any) => [
        {role: "user", content: entry.prompt},
        {
          role: "MindLoom",
          content: entry.gemini_response,
          visualization: entry.visualization
        },
      ],
    );
    return normalizedMessages;
  } else if (responseMessage.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 3000);
    return responseMessage;
  } else {
    return responseMessage;
  }
};


// -----------------------
// Sending message to chatbot
// -----------------------
export const chatbotChat = async (message: ChatbotMessageType) => {
  const response = await fetch("/api/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  },

);
  const responseMessage = await response.json();
  if (message.category === "chat"){
  // -----------------------
  // If response is ok, formatting the response to be displayed
  // -----------------------
  if (responseMessage.status === 200) {
    const botMessage: ChatbotMessageType = {
      role: responseMessage.message.role,
      category: "chat",
      content: responseMessage.message.gemini_response
    };

    return botMessage;
    // -----------------------
    // If token is expired
    // -----------------------
  } else if (responseMessage.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 3000);
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      content: "Session expired. Logging you in again.",
    }; // Return a fallback message
    return botMessage;
  }
  else if (responseMessage.status === 429) {
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      content: "Resource Exhausted!. Please try after some time",
    }; // Return a fallback message
    return botMessage;
    
  }
  // -----------------------
  // In case of an error occurs
  // -----------------------
  else {
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      content: "Please Try Sending Message Again",
    };
    
    return botMessage;
  }
}
else{
    const botMessage: ChatbotMessageType = {
    role: "MindLoom",
    category: "quiz",
    content: responseMessage.message,
  };
  return botMessage;
}
};


// -----------------------
// Generating visualization
// -----------------------

export const visualizer = async () => {
  
  const response = await fetch("/api/visualize");
  const resp = await response.json();
  if (resp.status === 200) {
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      visualization: resp.message,
    };
    return botMessage;
  } else if (resp.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 6000);
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      content: "Session expired. Logging you in again.",
    }; // Return a fallback message
    return botMessage;
      } 
      
  else if (resp.status === 429) {
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      content: "Resource Exhausted!. Please try after some time",
    }; // Return a fallback message
    return botMessage;

  }
  else {
    const botMessage: ChatbotMessageType = {
      role: "MindLoom",
      category: "chat",
      content: "Please Try Generating Visualization Again",
    };

    return botMessage;
  }
};
