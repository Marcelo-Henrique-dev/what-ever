import { Player } from "./player";

export interface QuizQuestion {
    category: string;
    type: "multiple" | "boolean";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizResponse{
    response_code: number;
    results: QuizQuestion[];
}

export interface QuizConfig{
    amount: number;
    category?: number;
    difficulty?: "easy" | "medium" | "hard" | "";
    type?: "multiple" | "boolean" | "";
}

export interface QuizResult{
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    player: Player;
}

export interface UserAnswer {
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  question_id: number;
}
