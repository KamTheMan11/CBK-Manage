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
    question: "Which network historically aired the Final Four?",
    options: ['CBS', 'NBC', 'ABC', 'FOX'],
    answer: 'CBS'
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