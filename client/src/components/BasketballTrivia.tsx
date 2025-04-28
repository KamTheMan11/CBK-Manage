
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const triviaQuestions: TriviaQuestion[] = [
  {
    question: "Which team has won the most NCAA Championships?",
    options: ["Kentucky", "North Carolina", "Duke", "UCLA"],
    correctAnswer: "UCLA"
  },
  {
    question: "What is the lowest seed to ever win the NCAA Tournament?",
    options: ["#8 Villanova", "#6 Kansas", "#7 UConn", "#5 Butler"],
    correctAnswer: "#8 Villanova"
  },
  {
    question: "Which conference has won the most NCAA Championships?",
    options: ["ACC", "Big East", "SEC", "Pac-12"],
    correctAnswer: "ACC"
  },
  {
    question: "Who holds the record for most points in a single NCAA Tournament game?",
    options: ["Bill Bradley", "Austin Carr", "David Robinson", "Pete Maravich"],
    correctAnswer: "Austin Carr"
  },
  {
    question: "What year did the NCAA Tournament expand to 64 teams?",
    options: ["1980", "1985", "1989", "1992"],
    correctAnswer: "1985"
  }
];

export const BasketballTrivia: React.FC = () => {
  const [currentQuestions, setCurrentQuestions] = useState<TriviaQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    // Randomly select 5 questions
    const shuffled = [...triviaQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswered(true);
    if (answer === currentQuestions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setAnswered(false);
    setSelectedAnswer("");
  };

  if (currentQuestions.length === 0) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Basketball Trivia Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        {currentIndex < currentQuestions.length ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Question {currentIndex + 1}: {currentQuestions[currentIndex].question}
              </h3>
              <div className="space-y-2">
                {currentQuestions[currentIndex].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => !answered && handleAnswer(option)}
                    className={`w-full ${
                      answered
                        ? option === currentQuestions[currentIndex].correctAnswer
                          ? "bg-green-500"
                          : option === selectedAnswer
                          ? "bg-red-500"
                          : ""
                        : ""
                    }`}
                    disabled={answered}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            {answered && (
              <Button onClick={nextQuestion}>
                {currentIndex === currentQuestions.length - 1 ? "See Results" : "Next Question"}
              </Button>
            )}
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quiz Complete!</h3>
            <p className="text-lg">Your Score: {score} out of 5</p>
            <Button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                const shuffled = [...triviaQuestions].sort(() => 0.5 - Math.random());
                setCurrentQuestions(shuffled.slice(0, 5));
              }}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
