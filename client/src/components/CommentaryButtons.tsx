
import React from 'react';
import { Button } from './ui/button';

export const CommentaryButtons: React.FC = () => {
  const commentaryOptions = [
    { id: 1, text: "What a shot!" },
    { id: 2, text: "Great defense!" },
    { id: 3, text: "Timeout called" },
    { id: 4, text: "Substitution" },
    { id: 5, text: "Technical foul" },
  ];

  const handleCommentary = (text: string) => {
    // TODO: Implement commentary logic
    console.log('Commentary:', text);
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <h3 className="col-span-2 text-xl font-bold mb-2">Commentary Options</h3>
      {commentaryOptions.map((option) => (
        <Button
          key={option.id}
          onClick={() => handleCommentary(option.text)}
          variant="outline"
          className="w-full"
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
};
