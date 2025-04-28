import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const BasketballTrivia: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Basketball Trivia</h2>
        <p>Coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default BasketballTrivia;