
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const CommentaryButtons: React.FC = () => {
  const [lastComment, setLastComment] = useState<string>('');
  
  const commentaryOptions = [
    { id: 1, text: "What a shot!", audio: "shot" },
    { id: 2, text: "Great defense!", audio: "defense" },
    { id: 3, text: "Timeout called", audio: "timeout" },
    { id: 4, text: "Substitution", audio: "sub" },
    { id: 5, text: "Technical foul", audio: "tech" },
    { id: 6, text: "And-one opportunity!", audio: "and1" },
    { id: 7, text: "From downtown!", audio: "three" },
    { id: 8, text: "Rejected!", audio: "block" }
  ];

  const handleCommentary = (text: string) => {
    setLastComment(text);
    // Show toast notification
    toast.success(text, {
      position: "top-center",
      duration: 2000
    });
    
    // You can expand this to play audio files for each comment
    const audio = new Audio('/sounds/whistle.mp3');
    audio.play();
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="col-span-2 text-xl font-bold mb-2">Commentary Options</h3>
      {commentaryOptions.map((option) => (
        <Button
          key={option.id}
          onClick={() => handleCommentary(option.text)}
          variant="outline"
          className="w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {option.text}
        </Button>
      ))}
      {lastComment && (
        <div className="col-span-2 mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-sm">Last comment: {lastComment}</p>
        </div>
      )}
    </div>
  );
};
