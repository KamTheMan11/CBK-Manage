import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Camera } from "lucide-react";

interface CameraControlsProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

export default function CameraControls({ selectedView, onViewChange }: CameraControlsProps) {
  const cameraOptions = [
    { id: 'broadcast', label: 'Broadcast', description: 'Classic TV-style view' },
    { id: 'sideline', label: 'Sideline', description: 'View from the sideline' },
    { id: 'overhead', label: 'Overhead', description: 'Top-down view' },
    { id: 'baseline', label: 'Baseline', description: 'View from behind the basket' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <Camera className="h-5 w-5 mr-2 text-[#003087]" />
        <h3 className="font-bold text-[#003087]">Camera Angle</h3>
      </div>
      
      <RadioGroup value={selectedView} onValueChange={onViewChange} className="flex flex-col space-y-1">
        {cameraOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="cursor-pointer flex flex-col">
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
