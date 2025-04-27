import { Card, CardContent } from "../components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4 dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-6 flex space-x-4">
            <BackButton />
            <Button asChild>
              <Link to="/"><Home className="mr-2 h-4 w-4" /> Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
