import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Navigation from "./components/Navigation";
import { useAudio } from "./lib/stores/useAudio";
import { useEffect } from "react";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const GamePage = lazy(() => import("./pages/GamePage"));
const TeamManagementPage = lazy(() => import("./pages/TeamManagementPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const MarchMadnessPage = lazy(() => import("./pages/MarchMadnessPage"));
const NotFoundPage = lazy(() => import("./pages/not-found"));

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Load audio assets
  useEffect(() => {
    // Background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    // Hit sound (for buzzer, fouls, etc)
    const hitSfx = new Audio("/sounds/hit.mp3");
    setHitSound(hitSfx);

    // Success sound (for baskets, game wins)
    const successSfx = new Audio("/sounds/success.mp3");
    setSuccessSound(successSfx);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-gray-900 dark:text-white">
      <Navigation />
      
      <main className="flex-1 container mx-auto p-4">
        <Suspense fallback={<div className="flex items-center justify-center h-96">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/team-management" element={<TeamManagementPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/march-madness" element={<MarchMadnessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
