import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Settings, Home, Users, Volume2, VolumeX, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { useAudio } from "../lib/stores/useAudio";
import { BasketballIcon } from "./BasketballIcon";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMuted, toggleMute, backgroundMusic } = useAudio();

  const toggleSound = () => {
    toggleMute();
    if (backgroundMusic) {
      if (isMuted) {
        backgroundMusic.play().catch(err => console.log("Audio play prevented:", err));
      } else {
        backgroundMusic.pause();
      }
    }
  };

  return (
    <nav className="bg-[#003087] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <BasketballIcon className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">College Hoops Sim</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`}>
              <Home className="h-4 w-4 mr-1" /> Home
            </NavLink>
            <NavLink to="/game" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`}>
              <BasketballIcon className="h-4 w-4 mr-1" /> Play Game
            </NavLink>
            <NavLink to="/team-management" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`}>
              <Users className="h-4 w-4 mr-1" /> Teams
            </NavLink>
            <NavLink to="/march-madness" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`}>
              <Trophy className="h-4 w-4 mr-1" /> March Madness
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`}>
              <Settings className="h-4 w-4 mr-1" /> Settings
            </NavLink>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSound} 
              className="text-white hover:bg-[#002a77]"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-[#002a77] focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#003087] pb-4">
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                <Home className="h-4 w-4 mr-2" /> Home
              </NavLink>
              <NavLink to="/game" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                <BasketballIcon className="h-4 w-4 mr-2" /> Play Game
              </NavLink>
              <NavLink to="/team-management" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                <Users className="h-4 w-4 mr-2" /> Teams
              </NavLink>
              <NavLink to="/march-madness" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                <Trophy className="h-4 w-4 mr-2" /> March Madness
              </NavLink>
              <NavLink to="/settings" className={({ isActive }) => `px-3 py-2 rounded-md flex items-center hover:bg-[#002a77] ${isActive ? 'bg-[#002a77]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                <Settings className="h-4 w-4 mr-2" /> Settings
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}