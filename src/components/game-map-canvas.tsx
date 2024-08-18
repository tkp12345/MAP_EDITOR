// import { Canvas } from '@react-three/fiber';
// import { useState } from 'react';
// import * as THREE from 'three';
//
// interface Tile {
//   id: number;
//   position: [number, number, number];
//   texture: THREE.Texture;
// }
//
// interface GameMapCanvasProps {
//   selectedSprite: { id: number; src: string } | null;
// }
//
// const TILE_SIZE = 1; // 타일의 크기
//
// export const GameMapCanvas = ({ selectedSprite }: GameMapCanvasProps) => {
//   const [tiles, setTiles] = useState<Tile[]>([]);
//
//   const handleCanvasClick = (e: React.MouseEvent) => {
//     if (!selectedSprite) return;
//
//     const rect = e.currentTarget.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//
//     // 이소메트릭 좌표 변환
//     const isoX = Math.floor((mouseX - mouseY) / TILE_SIZE);
//     const isoY = Math.floor((mouseX + mouseY) / TILE_SIZE);
//     const z = 0;
//
//     const texture = new THREE.TextureLoader().load(selectedSprite.src);
//
//     console.log('Tile Position:', isoX, isoY);
//     console.log('Loaded Texture:', texture);
//     console.log('tiles:', tiles);
//
//     const newTile: Tile = {
//       id: Date.now(),
//       position: [isoX, isoY, z],
//       texture,
//     };
//
//     setTiles((prevTiles) => {
//       const exists = prevTiles.some(
//         (tile) => tile.position[0] === isoX && tile.position[1] === isoY);
//       if (!exists) {
//         return [...prevTiles, newTile];
//       }
//       return prevTiles;
//     });
//   };
//
//
//
//   return (
//     <Canvas orthographic camera={{ zoom: 70, position: [0, 0, 100] }} onClick={handleCanvasClick} style={{ background: '#2d2d2d', width: '800px', height: '600px' }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//
//       <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
//         <gridHelper args={[10, 10, '#ffffff', '#555555']} />
//       </group>
//
//       {tiles.map((tile) => (
//         <mesh key={tile.id} position={tile.position}>
//           {/*<planeGeometry args={[TILE_SIZE, TILE_SIZE]} />*/}
//           {/*<meshBasicMaterial map={tile.texture} transparent />*/}
//           <planeGeometry args={[TILE_SIZE * 10, TILE_SIZE * 10]} />
//           <meshBasicMaterial color="orange" />  {/* 텍스처 대신 기본 색상 사용 */}
//         </mesh>
//       ))}
//     </Canvas>
//   );
// };


import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

interface Tile {
  id: number;
  position: [number, number, number];
  texture: THREE.Texture | null;
}

interface GameMapCanvasProps {
  selectedSprite: { id: number; src: string } | null;
}

const TILE_SIZE = 1; // 타일의 크기

export const GameMapCanvas = ({ selectedSprite }: GameMapCanvasProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!selectedSprite) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 캔버스 크기에 따라 클릭한 위치를 좌표로 변환
    const x = ((mouseX / rect.width) * 2 - 1) * 5;  // -5에서 5 사이의 범위로 변환
    const y = ((mouseY / rect.height) * -2 + 1) * 5; // -5에서 5 사이의 범위로 변환
    const z = 0;

    const textureLoader = new THREE.TextureLoader();

    // 텍스처를 비동기적으로 로드
    textureLoader.load(selectedSprite.src, (loadedTexture) => {
      const newTile: Tile = {
        id: Date.now(),
        position: [x, y, z],
        texture: loadedTexture,
      };

      setTiles((prevTiles) => [...prevTiles, newTile]);
    });
  };

  return (
    <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }} onClick={handleCanvasClick} style={{ background: '#2d2d2d', width: '800px', height: '600px' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <gridHelper args={[10, 10, '#ffffff', '#555555']} />
      </group>

      {tiles.map((tile) => (
        <mesh key={tile.id} position={tile.position}>
          <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
          <meshBasicMaterial map={tile.texture} transparent={true} />
        </mesh>
      ))}
    </Canvas>
  );
};