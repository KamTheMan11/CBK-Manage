import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useAudio } from '../lib/stores/useAudio';
import ScoreBoard from './ScoreBoard';
import CameraControls from './CameraControls';
import CourtView from './CourtView';
import { useSimulation } from '../lib/stores/useSimulation';
import { Button } from './ui/button';
import { Play, Pause, SkipForward, RefreshCw } from 'lucide-react';
import { useSettings } from '../lib/stores/useSettings';
import { GamePhase } from '../lib/types';

interface GameSimulationProps {
  homeTeamId: number;
  awayTeamId: number;
}

export default function GameSimulation({ homeTeamId, awayTeamId }: GameSimulationProps) {
  const [selectedCameraView, setSelectedCameraView] = useState<string>('broadcast');
  const { gameSettings } = useSettings();
  const { 
    startGame, 
    pauseGame, 
    resetGame, 
    skipToNextQuarter, 
    gameState,
    homeTeam, 
    awayTeam,
    gamePhase,
    isGamePaused
  } = useSimulation();
  const { playHit, playSuccess } = useAudio();

  useEffect(() => {
    if (homeTeamId && awayTeamId) {
      resetGame(homeTeamId, awayTeamId);
    }
  }, [resetGame, homeTeamId, awayTeamId]);

  // Handle sound effects for scores and buzzer
  useEffect(() => {
    if (!homeTeam || !awayTeam) return;
    // Check for score events
    if (gameState.lastEvent?.type === 'score') {
      playSuccess();
    }
    
    // Check for foul events or end of quarter
    if (gameState.lastEvent?.type === 'foul' || gameState.lastEvent?.type === 'quarter_end') {
      playHit();
    }
  }, [gameState.lastEvent, playHit, playSuccess]);

  const handleGameControl = () => {
    if (isGamePaused || gamePhase === GamePhase.READY) {
      startGame();
    } else {
      pauseGame();
    }
  };

  const renderGameControls = () => {
    return (
      <div className="flex space-x-2 mt-4">
        <Button 
          onClick={handleGameControl}
          className="bg-[#003087] hover:bg-[#002a77]"
        >
          {isGamePaused || gamePhase === GamePhase.READY ? <Play className="mr-1" /> : <Pause className="mr-1" />}
          {isGamePaused || gamePhase === GamePhase.READY ? 'Start' : 'Pause'}
        </Button>
        
        <Button 
          onClick={skipToNextQuarter}
          className="bg-[#B2BEB5] hover:bg-gray-500 text-black"
          disabled={gamePhase === GamePhase.ENDED}
        >
          <SkipForward className="mr-1" />
          Skip Quarter
        </Button>
        
        <Button 
          onClick={() => resetGame(homeTeamId, awayTeamId)}
          variant="outline"
          className="border-[#003087] text-[#003087]"
        >
          <RefreshCw className="mr-1" />
          Reset Game
        </Button>
      </div>
    );
  };

  if (!homeTeam || !awayTeam) {
    return <div className="p-4 text-center">Loading game data...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <ScoreBoard 
          homeTeam={homeTeam} 
          awayTeam={awayTeam} 
          gameState={gameState}
          gameSettings={gameSettings}
        />
        
        <div>
          <CameraControls 
            selectedView={selectedCameraView} 
            onViewChange={setSelectedCameraView} 
          />
        </div>
      </div>
      
      <div className="w-full h-[60vh] bg-gray-100 rounded-lg overflow-hidden">
        <Canvas shadows>
          <color attach="background" args={['#111111']} />
          
          {/* Different camera positions based on selected view */}
          {selectedCameraView === 'broadcast' && (
            <PerspectiveCamera makeDefault position={[0, 15, 20]} fov={45} />
          )}
          {selectedCameraView === 'sideline' && (
            <PerspectiveCamera makeDefault position={[25, 5, 0]} fov={50} />
          )}
          {selectedCameraView === 'overhead' && (
            <PerspectiveCamera makeDefault position={[0, 25, 0]} fov={60} />
          )}
          {selectedCameraView === 'baseline' && (
            <PerspectiveCamera makeDefault position={[0, 5, 25]} fov={50} />
          )}

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} intensity={1} castShadow />
          
          <CourtView 
            gameState={gameState}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
        </Canvas>
      </div>
      
      {renderGameControls()}
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">Game Events</h3>
        <div className="max-h-40 overflow-y-auto">
          {gameState.events.slice().reverse().map((event, index) => (
            <div key={index} className="py-1 border-b border-gray-100">
              <span className="text-[#003087] font-semibold">{event.time}</span>: {event.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
