import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { GameState, Team } from '../lib/types';

interface CourtViewProps {
  gameState: GameState;
  homeTeam: Team;
  awayTeam: Team;
}

export default function CourtView({ gameState, homeTeam, awayTeam }: CourtViewProps) {
  const basketballRef = useRef<THREE.Mesh>(null);
  
  // Court dimensions (scaled to look good in 3D space)
  const courtWidth = 15;
  const courtLength = 28;
  const courtThickness = 0.1;
  
  // Player positions (simplified for this example)
  const homePlayerPositions = [
    [-3, 0, 5],    // Point Guard
    [3, 0, 5],     // Shooting Guard
    [-5, 0, 10],   // Small Forward
    [0, 0, 10],    // Power Forward
    [5, 0, 10],    // Center
  ];
  
  const awayPlayerPositions = [
    [3, 0, -5],    // Point Guard
    [-3, 0, -5],   // Shooting Guard
    [5, 0, -10],   // Small Forward
    [0, 0, -10],   // Power Forward
    [-5, 0, -10],  // Center
  ];
  
  // Animate the basketball
  useFrame((state) => {
    if (basketballRef.current) {
      // Simple bobbing animation to make the ball look alive
      basketballRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      basketballRef.current.rotation.z += 0.01;
      basketballRef.current.rotation.x += 0.01;
    }
  });
  
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
      
      {/* Basketball */}
      <mesh position={gameState.ballPosition} ref={basketballRef} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial attach="material" color="#D96F32" />
      </mesh>
      
      {/* Home team players */}
      {homePlayerPositions.map((position, index) => (
        <group key={`home-${index}`} position={[position[0], 0, position[2]]}>
          {/* Player body */}
          <Cylinder 
            args={[0.3, 0.3, 2, 16]} 
            position={[0, 1, 0]} 
            castShadow
          >
            <meshStandardMaterial attach="material" color={homeTeam.primaryColor || "#003087"} />
          </Cylinder>
          
          {/* Player jersey number */}
          <Text
            position={[0, 1.5, 0.31]}
            rotation={[0, 0, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {index + 1}
          </Text>
          
          {/* Player name label */}
          <Text
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {homeTeam.players ? homeTeam.players[index]?.lastName || 'Player' : 'Player'}
          </Text>
        </group>
      ))}
      
      {/* Away team players */}
      {awayPlayerPositions.map((position, index) => (
        <group key={`away-${index}`} position={[position[0], 0, position[2]]}>
          {/* Player body */}
          <Cylinder 
            args={[0.3, 0.3, 2, 16]} 
            position={[0, 1, 0]} 
            castShadow
          >
            <meshStandardMaterial attach="material" color={awayTeam.primaryColor || "#FF0000"} />
          </Cylinder>
          
          {/* Player jersey number */}
          <Text
            position={[0, 1.5, 0.31]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {index + 1}
          </Text>
          
          {/* Player name label */}
          <Text
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {awayTeam.players ? awayTeam.players[index]?.lastName || 'Player' : 'Player'}
          </Text>
        </group>
      ))}
    </group>
  );
}
