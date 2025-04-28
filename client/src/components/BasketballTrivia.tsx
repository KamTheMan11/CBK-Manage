
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
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const questions = [
  {
    question: "Which team has won the most NCAA Division I Men's Basketball Championships?",
    options: ['Kentucky', 'North Carolina', 'Duke', 'UCLA'],
    answer: 'UCLA'
  },
  {
    question: "Who holds the record for most points in a single NCAA tournament game?",
    options: ['Bill Bradley', 'Austin Carr', 'David Robinson', 'Glen Rice'],
    answer: 'Austin Carr'
  },
  {
    question: "Which conference has won the most NCAA Basketball Championships?",
    options: ['SEC', 'ACC', 'Big East', 'Pac-12'],
    answer: 'Pac-12'
  },
  {
    question: "Who was the first freshman to win the NCAA Tournament Most Outstanding Player award?",
    options: ['Carmelo Anthony', 'Magic Johnson', 'Patrick Ewing', 'Anthony Davis'],
    answer: 'Anthony Davis'
  },
  {
    question: "What year was the first NCAA Basketball Tournament held?",
    options: ['1929', '1939', '1949', '1959'],
    answer: '1939'
  }
];

const BasketballTrivia: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Basketball Trivia</h1>
      <Card className="p-6">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-xl mb-4">Your Score: {score} out of {questions.length}</h2>
            <Button onClick={resetQuiz}>Play Again</Button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg mb-4">Question {currentQuestion + 1} of {questions.length}</h2>
            <p className="mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  className="w-full text-left"
                  variant="outline"
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BasketballTrivia;
