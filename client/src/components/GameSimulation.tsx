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

  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        handleGameControl();
        return;
      }

      setKeysPressed(prev => ({ ...prev, [e.key.toLowerCase()]: true }));

      // Handle action keys
      switch (e.key.toLowerCase()) {
        case 'x':
          // Pass ball
          console.log('Pass ball');
          break;
        case 'z':
          // Shoot ball
          console.log('Shoot ball');
          break;
        case 'c':
          // Jump
          console.log('Jump');
          break;
        case ' ':
          // Timeout/Foul
          console.log('Timeout/Foul');
          break;
        case 'l':
          // Juke move
          console.log('Juke move');
          break;
        case 'r':
          // Spin move
          console.log('Spin move');
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Movement handling in game loop
  useEffect(() => {
    if (isGamePaused || gamePhase !== GamePhase.PLAYING) return;

    const movePlayer = () => {
      const speed = 0.1;
      let moveX = 0;
      let moveY = 0;

      // WASD or Arrow keys movement
      if (keysPressed['w'] || keysPressed['arrowup']) moveY -= speed;
      if (keysPressed['s'] || keysPressed['arrowdown']) moveY += speed;
      if (keysPressed['a'] || keysPressed['arrowleft']) moveX -= speed;
      if (keysPressed['d'] || keysPressed['arrowright']) moveX += speed;

      // TODO: Update player position in game state
      if (moveX !== 0 || moveY !== 0) {
        console.log(`Move player: ${moveX}, ${moveY}`);
      }
    };

    const gameLoop = setInterval(movePlayer, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [keysPressed, isGamePaused, gamePhase]);

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

      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">Controls</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Movement: WASD or Arrow Keys</div>
          <div>Pass: X</div>
          <div>Shoot: Z</div>
          <div>Jump: C</div>
          <div>Pause: P</div>
          <div>Timeout/Foul: Space</div>
          <div>Juke: L</div>
          <div>Spin: R</div>
        </div>
      </div>

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
