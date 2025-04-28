
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
  },
  {
    question: "Which conference has won the most NCAA Championships?",
    options: ['SEC', 'Big Ten', 'ACC', 'Pac-12'],
    answer: 'Pac-12'
  },
  {
    question: "Who holds the record for most NCAA Tournament appearances as a head coach?",
    options: ['Mike Krzyzewski', 'Jim Boeheim', 'Roy Williams', 'Dean Smith'],
    answer: 'Mike Krzyzewski'
  },
  {
    question: "What is the lowest seed to ever win the NCAA Championship?",
    options: ['6th seed', '8th seed', '7th seed', '5th seed'],
    answer: '8th seed'
  },
  {
    question: "Which team was the first to win the NCAA Tournament undefeated?",
    options: ['San Francisco', 'UCLA', 'North Carolina', 'Kentucky'],
    answer: 'San Francisco'
  },
  {
    question: "What year did the tournament expand to 64 teams?",
    options: ['1975', '1980', '1985', '1990'],
    answer: '1985'
  },
  {
    question: "Which player holds the record for most points in NCAA Tournament history?",
    options: ['Christian Laettner', 'Oscar Robertson', 'Bill Bradley', 'Pete Maravich'],
    answer: 'Christian Laettner'
  }
];

const BasketballTrivia: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerClick = (selectedOption: string) => {
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getButtonStyle = (option: string) => {
    if (!showFeedback || selectedAnswer !== option) return "bg-white dark:bg-gray-800";
    if (option === questions[currentQuestion].answer) return "bg-green-500 text-white";
    return "bg-red-500 text-white";
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
                  className={`w-full text-left transition-colors ${getButtonStyle(option)}`}
                  variant="outline"
                  onClick={() => !showFeedback && handleAnswerClick(option)}
                  disabled={showFeedback}
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
