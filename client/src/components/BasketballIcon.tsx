import { Circle } from "lucide-react";

interface BasketballIconProps {
  className?: string;
}

export const BasketballIcon = ({ className }: BasketballIconProps) => (
  <div className={`relative ${className || ""}`}>
    <Circle className="text-[#F47321] fill-current" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[80%] h-[80%] border-2 border-black dark:border-white rounded-full"></div>
      <div className="absolute w-full h-[2px] bg-black dark:bg-white"></div>
      <div className="absolute w-[2px] h-full bg-black dark:bg-white"></div>
    </div>
  </div>
);