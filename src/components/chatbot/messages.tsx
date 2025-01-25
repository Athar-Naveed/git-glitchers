"use client";
// ------------------------
// Imports
// ------------------------
import Image from "next/image";
import {useState, useRef, useEffect,memo} from "react";
import {ChatbotMessageType} from "@/types";
import {ChevronDown} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
// ------------------------
// Messages are being displayed here
// ------------------------
const ChatbotMessages = memo(({
  messages,
  thinking,
}: {
  messages: ChatbotMessageType[];
  thinking: boolean;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  // ------------------------
  // Scroll to bottom function
  // ------------------------
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };
  
  // ------------------------
  // Handle scroll event to show/hide the button
  // ------------------------
  const handleScroll = () => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      const isNearBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight <
        100;
      setIsButtonVisible(!isNearBottom);
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // ------------------------
  // Automatically scroll to the bottom when new messages arrive
  // ------------------------
  useEffect(scrollToBottom, [messages]);
  
  // ------------------------
  // Thinking timer
  // ------------------------
  useEffect(() => {
    let startTime: number;
  
    if (thinking) {
      startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setTimer(elapsedSeconds);
      }, 1000);
  
      return () => clearInterval(interval);
    } else {
      setTimer(0);
    }
  }, [thinking]);
  

  return (
    <>
      <div className="flex-1 overflow-y-auto py-8 space-y-6 scroll-container">
  {messages.map((message: any, index: number) => (
    <div
      key={index}
      className={`flex ${message.role !== "MindLoom" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`inline-block rounded-xl break-words max-w-[290px] overscroll-x-scroll no-scrollbar sm:max-w-[600px] md:max-w-[700px] lg:max-w-[600px] xl:max-w-[800px] ${
          message.role !== "MindLoom"
            ? "bg-slate-900 text-slate-200"
            : "text-slate-900"
        }`}
      >
        {message.role !== "MindLoom" ? (
          // User messages
          <div className="whitespace-pre-wrap p-4">
            <bdi>{message.content}</bdi>
          </div>
        ) : message.content === "Thinking" && thinking ? (
          // Thinking Spinner
          <div className="flex items-center space-x-2">
            <div className="loader animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-gray-500 dark:text-gray-300">Thinking... {timer}s</span>
          </div>
        ) : message.content === "Visualizing" && thinking ? (
          // Visualization Spinner
          <div className="flex items-center space-x-2">
            <div className="loader animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-gray-500 dark:text-gray-300">
              Generating Visualization... {timer}s
            </span>
          </div>
        ) : (
          <>
            <div className="flex">
              <Image
                src="/logo.png"
                width={35}
                height={35}
                alt="MindLoom"
                className="mx-3"
                priority={false}
              />
              <p className="ml-1 mt-[6px] font-semibold">MindLoom</p>
            </div>

            <div className="grid gap-3 pr-8 pl-2 py-2 overflow-x-scroll max-w-fulls">
              {/* Display both text content and visualization if available */}
              {message.content && (
                <bdi className="leading-10 no-scrollbar">
                  <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                </bdi>
              )}
              {message.visualization && (
                <div className="video mt-4">
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={`/api/visualize/${message.visualization}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>


      {/*
      // ------------------------ 
      // Scroll to Bottom Button 
      // ------------------------
      */}
      {isButtonVisible && (
        <button
          className="fixed bottom-[9rem] left-1/2 lg:left-[60%] xl:left-[58%] transform -translate-x-1/2 bg-dark-logo-primary text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
          onClick={scrollToBottom}
        >
          <ChevronDown />
        </button>
      )}
    </>
  );
});

export default ChatbotMessages;
