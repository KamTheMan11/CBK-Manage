import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder, Plane, Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GameState, Team, PossessionType } from '../lib/types';

interface CourtViewProps {
  gameState: GameState;
  homeTeam: Team;
  awayTeam: Team;
}

export default function CourtView({ gameState, homeTeam, awayTeam }: CourtViewProps) {
  const basketballRef = useRef<THREE.Mesh>(null);
  const shotClockRef = useRef<THREE.Group>(null);
  const homePlayersRef = useRef<THREE.Group[]>([]);
  const awayPlayersRef = useRef<THREE.Group[]>([]);
  
  // State for player animations
  const [jumpingPlayer, setJumpingPlayer] = useState<{team: 'home' | 'away', index: number} | null>(null);
  const [dunking, setDunking] = useState(false);
  const [shotClockWarning, setShotClockWarning] = useState(false);
  
  // Court dimensions (scaled to look good in 3D space)
  const courtWidth = 15;
  const courtLength = 28;
  const courtThickness = 0.1;
  
  // Load pixel art texture for the ball
  const ballTexture = new THREE.TextureLoader().load('/assets/sprites/ic_launcher_foreground.png');
  
  // Set up jumping animation when game events occur
  useEffect(() => {
    if (gameState.lastEvent?.type === 'score') {
      // Find the player who scored
      const scoringTeam = gameState.lastEvent.teamId === homeTeam.id ? 'home' : 'away';
      const playerIndex = Math.floor(Math.random() * 5); // Random player for now, could be based on event playerId
      
      setJumpingPlayer({ team: scoringTeam, index: playerIndex });
      setDunking(Math.random() > 0.5); // 50% chance of dunking animation
      
      // Reset after animation
      setTimeout(() => {
        setJumpingPlayer(null);
        setDunking(false);
      }, 1000);
    }
  }, [gameState.lastEvent, homeTeam.id, awayTeam.id]);
  
  // Shot clock warning effect
  useEffect(() => {
    if (gameState.shotClockRemaining <= 5 && gameState.shotClockRemaining > 0) {
      setShotClockWarning(true);
    } else {
      setShotClockWarning(false);
    }
  }, [gameState.shotClockRemaining]);
  
  // Initial refs setup
  useEffect(() => {
    homePlayersRef.current = Array(5).fill(null).map(() => React.createRef<THREE.Group>());
    awayPlayersRef.current = Array(5).fill(null).map(() => React.createRef<THREE.Group>());
  }, []);
  
  // Dynamic player positions that shift based on possession
  const getPlayerPositions = (team: 'home' | 'away') => {
    const isHomePossession = gameState.possession === PossessionType.HOME;
    const isOffense = (team === 'home' && isHomePossession) || (team === 'away' && !isHomePossession);
    const direction = team === 'home' ? 1 : -1;
    const offensiveEnd = team === 'home' ? -1 : 1;
    
    if (isOffense) {
      // Offensive formation - spread around the basket
      return [
        [-3 * direction, 0, 8 * offensiveEnd],    // Point Guard
        [3 * direction, 0, 6 * offensiveEnd],    // Shooting Guard
        [-5 * direction, 0, 4 * offensiveEnd],   // Small Forward
        [1 * direction, 0, 2 * offensiveEnd],   // Power Forward
        [4 * direction, 0, 2 * offensiveEnd],   // Center
      ];
    } else {
      // Defensive formation - protect the basket
      return [
        [2 * direction, 0, 2 * offensiveEnd],    // Point Guard
        [-2 * direction, 0, 2 * offensiveEnd],   // Shooting Guard
        [4 * direction, 0, 4 * offensiveEnd],    // Small Forward
        [-4 * direction, 0, 4 * offensiveEnd],   // Power Forward
        [0, 0, 1 * offensiveEnd],                // Center
      ];
    }
  };
  
  const homePlayerPositions = getPlayerPositions('home');
  const awayPlayerPositions = getPlayerPositions('away');
  
  // Animate the basketball and players
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Basketball animation
    if (basketballRef.current) {
      // More dynamic ball movement
      if (dunking) {
        // Dunking animation
        basketballRef.current.position.y = 3 + Math.sin(time * 5) * 0.5;
        basketballRef.current.rotation.z += 0.1;
        basketballRef.current.rotation.x += 0.1;
      } else {
        // Normal dribbling animation
        basketballRef.current.position.y = 1 + Math.abs(Math.sin(time * 5)) * 0.8;
        basketballRef.current.rotation.z += 0.03;
        basketballRef.current.rotation.x += 0.03;
      }
    }
    
    // Shot clock animation
    if (shotClockRef.current) {
      if (shotClockWarning) {
        shotClockRef.current.scale.x = 1 + Math.sin(time * 10) * 0.1;
        shotClockRef.current.scale.y = 1 + Math.sin(time * 10) * 0.1;
        shotClockRef.current.scale.z = 1 + Math.sin(time * 10) * 0.1;
      } else {
        shotClockRef.current.scale.set(1, 1, 1);
      }
    }
    
    // Player animations - more arcade style movements
    homePlayersRef.current.forEach((ref, index) => {
      if (ref.current) {
        // Subtle bobbing animation for all players
        ref.current.position.y = Math.sin(time * 2 + index) * 0.05;
        
        // Jumping/celebration animation for scoring player
        if (jumpingPlayer && jumpingPlayer.team === 'home' && jumpingPlayer.index === index) {
          ref.current.position.y = Math.sin(time * 10) * 0.5;
          ref.current.rotation.y += 0.1;
        }
      }
    });
    
    awayPlayersRef.current.forEach((ref, index) => {
      if (ref.current) {
        // Subtle bobbing animation for all players
        ref.current.position.y = Math.sin(time * 2 + index + 2.5) * 0.05;
        
        // Jumping/celebration animation for scoring player
        if (jumpingPlayer && jumpingPlayer.team === 'away' && jumpingPlayer.index === index) {
          ref.current.position.y = Math.sin(time * 10) * 0.5;
          ref.current.rotation.y += 0.1;
        }
      }
    });
  });
  
  // Generate a pixel-art style texture for players
  const generatePlayerTexture = (color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw pixelated player
      ctx.fillStyle = color;
      ctx.fillRect(8, 8, 16, 24);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(12, 12, 8, 4);
      ctx.fillStyle = '#000000';
      ctx.fillRect(14, 14, 4, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
  };
  
  const homeTexture = generatePlayerTexture(homeTeam.primaryColor || "#003087");
  const awayTexture = generatePlayerTexture(awayTeam.primaryColor || "#FF0000");
  
  return (
    <group>
      {/* Court floor */}
      <Plane 
        args={[courtWidth, courtLength]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <meshStandardMaterial attach="material" color="#C8B88A" />
      </Plane>
      
      {/* Court markings */}
      <group position={[0, 0.01, 0]}>
        {/* Center circle */}
        <Cylinder 
          args={[2, 2, 0.01, 32, 1, false, 0, Math.PI * 2]} 
          position={[0, 0, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial attach="material" color="#8B4513" side={THREE.DoubleSide} wireframe={true} />
        </Cylinder>
        
        {/* Center line */}
        <Box 
          args={[courtWidth, 0.01, 0.1]} 
          position={[0, 0, 0]}
        >
          <meshStandardMaterial attach="material" color="#8B4513" />
        </Box>
        
        {/* Three point arcs */}
        <Cylinder 
          args={[6, 6, 0.01, 32, 1, false, 0, Math.PI]} 
          position={[0, 0, -courtLength / 2 + 5.5]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial attach="material" color="#8B4513" side={THREE.DoubleSide} wireframe={true} />
        </Cylinder>
        
        <Cylinder 
          args={[6, 6, 0.01, 32, 1, false, 0, Math.PI]} 
          position={[0, 0, courtLength / 2 - 5.5]} 
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <meshStandardMaterial attach="material" color="#8B4513" side={THREE.DoubleSide} wireframe={true} />
        </Cylinder>
      </group>
      
      {/* Shot clock displays */}
      <group position={[0, 5, -courtLength / 2 + 1]} ref={shotClockRef}>
        <Billboard>
          <Box args={[1.5, 0.8, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial attach="material" color="#000000" />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.5}
            color={shotClockWarning ? "#FF0000" : "#FF3300"}
            font="/assets/fonts/digital-7.ttf"
            anchorX="center"
            anchorY="middle"
          >
            {Math.max(0, Math.ceil(gameState.shotClockRemaining))}
          </Text>
        </Billboard>
      </group>
      
      <group position={[0, 5, courtLength / 2 - 1]} ref={shotClockRef}>
        <Billboard>
          <Box args={[1.5, 0.8, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial attach="material" color="#000000" />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.5}
            color={shotClockWarning ? "#FF0000" : "#FF3300"}
            font="/assets/fonts/digital-7.ttf"
            anchorX="center"
            anchorY="middle"
          >
            {Math.max(0, Math.ceil(gameState.shotClockRemaining))}
          </Text>
        </Billboard>
      </group>
      
      {/* Baskets */}
      <group position={[0, 0, -courtLength / 2 + 1]}>
        <Box args={[0.2, 3, 0.2]} position={[0, 1.5, 0]}>
          <meshStandardMaterial attach="material" color="#000000" />
        </Box>
        <Box args={[1.8, 0.1, 1.2]} position={[0, 3, 0.6]}>
          <meshStandardMaterial attach="material" color="#FF0000" />
        </Box>
        <Cylinder args={[0.45, 0.45, 0.05, 16]} position={[0, 3, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial attach="material" color="#FF0000" />
        </Cylinder>
      </group>
      
      <group position={[0, 0, courtLength / 2 - 1]}>
        <Box args={[0.2, 3, 0.2]} position={[0, 1.5, 0]}>
          <meshStandardMaterial attach="material" color="#000000" />
        </Box>
        <Box args={[1.8, 0.1, 1.2]} position={[0, 3, -0.6]}>
          <meshStandardMaterial attach="material" color="#FF0000" />
        </Box>
        <Cylinder args={[0.45, 0.45, 0.05, 16]} position={[0, 3, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial attach="material" color="#FF0000" />
        </Cylinder>
      </group>
      
      {/* Basketball - now with pixel art texture */}
      <mesh position={gameState.ballPosition} ref={basketballRef} castShadow>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial 
          attach="material" 
          color="#D96F32" 
          map={ballTexture}
          emissive="#D96F32"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Home team players - now with arcade style */}
      {homePlayerPositions.map((position, index) => {
        // Get player data if available
        const player = homeTeam.players?.[index];
        return (
          <group 
            key={`home-${index}`} 
            position={[position[0], position[1], position[2]]}
            ref={(el) => { homePlayersRef.current[index] = el as any; }}
          >
            {/* Player body - more arcade-like with pixel art texture */}
            <Billboard>
              <Box 
                args={[1, 2, 0.1]} 
                position={[0, 1, 0]} 
                castShadow
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={homeTeam.primaryColor || "#003087"}
                  map={homeTexture}
                />
              </Box>
              
              {/* Player number */}
              <Text
                position={[0, 1.2, 0.06]}
                fontSize={0.4}
                color="white"
                font="/assets/fonts/pixel.ttf"
                anchorX="center"
                anchorY="middle"
              >
                {player?.number || (index + 1)}
              </Text>
            </Billboard>
            
            {/* Player name label */}
            <Text
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.3}
              color="#000000"
              font="/assets/fonts/pixel.ttf"
              anchorX="center"
              anchorY="middle"
            >
              {player?.lastName || `Player ${index + 1}`}
            </Text>
            
            {/* Player stats indicator when they have the ball */}
            {gameState.possession === PossessionType.HOME && 
              Math.floor(Math.random() * 5) === index && (
              <Billboard position={[0, 2.5, 0]}>
                <Html transform scale={0.1} rotation={[0, Math.PI, 0]}>
                  <div style={{ 
                    backgroundColor: '#003087', 
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    whiteSpace: 'nowrap'
                  }}>
                    {player?.attributes.shooting || 75}🏀
                  </div>
                </Html>
              </Billboard>
            )}
          </group>
        );
      })}
      
      {/* Away team players - now with arcade style */}
      {awayPlayerPositions.map((position, index) => {
        // Get player data if available
        const player = awayTeam.players?.[index];
        return (
          <group 
            key={`away-${index}`} 
            position={[position[0], position[1], position[2]]}
            ref={(el) => { awayPlayersRef.current[index] = el as any; }}
          >
            {/* Player body - more arcade-like with pixel art texture */}
            <Billboard>
              <Box 
                args={[1, 2, 0.1]} 
                position={[0, 1, 0]} 
                castShadow
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={awayTeam.primaryColor || "#FF0000"}
                  map={awayTexture}
                />
              </Box>
              
              {/* Player number */}
              <Text
                position={[0, 1.2, 0.06]}
                fontSize={0.4}
                color="white"
                font="/assets/fonts/pixel.ttf"
                anchorX="center"
                anchorY="middle"
              >
                {player?.number || (index + 1)}
              </Text>
            </Billboard>
            
            {/* Player name label */}
            <Text
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.3}
              color="#000000"
              font="/assets/fonts/pixel.ttf"
              anchorX="center"
              anchorY="middle"
            >
              {player?.lastName || `Player ${index + 1}`}
            </Text>
            
            {/* Player stats indicator when they have the ball */}
            {gameState.possession === PossessionType.AWAY && 
              Math.floor(Math.random() * 5) === index && (
              <Billboard position={[0, 2.5, 0]}>
                <Html transform scale={0.1} rotation={[0, Math.PI, 0]}>
                  <div style={{ 
                    backgroundColor: awayTeam.primaryColor || '#ff0000', 
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    whiteSpace: 'nowrap'
                  }}>
                    {player?.attributes.shooting || 75}🏀
                  </div>
                </Html>
              </Billboard>
            )}
          </group>
        );
      })}
    </group>
  );
}