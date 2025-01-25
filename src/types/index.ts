
type QuizType = {
  question: string;
  options: Array<string>;
  correct_answer: number;
  explanation: string;
}
// Define the Message interface for chatbot and user messages
type ChatbotMessageType = {
    role?: "user" | "guest" |"MindLoom";
    category: string;
    content?: string | { quiz: QuizType[] };
    prompt?: string;
    visualization?: string;
  };

  type StateType = {
    reglo: boolean;
    showQuiz: boolean;
    quiz: Array<QuizType>;
    totalScore: number;
    setReglo: () => void;
    setShowQuiz: () => void;
    setQuiz: (quiz: Array<QuizType>) => void; // Updated to accept an argument
    setTotalScore: (score: number) => void;
  };
  
  export type{
    ChatbotMessageType,
    StateType,
    QuizType,
  }
  

