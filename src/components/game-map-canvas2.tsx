import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

interface Tile {
  id: number;
  position: [number, number, number];
  color: string; // color 속성을 추가
}


const TILE_SIZE = 1; // 타일의 크기

export const GameMapCanvas2 = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 좌표 계산을 단순화하여 중앙 기준으로 타일 배치
    const x = (mouseX / rect.width) * 10 - 5; // x 좌표를 -5에서 5 사이로 변환
    const y = (mouseY / rect.height) * -10 + 5; // y 좌표를 -5에서 5 사이로 변환
    const z = 0;

    const newTile: Tile = {
      id: Date.now(),
      position: [x, y, z],
      color: 'orange', // 모든 타일을 오렌지색으로 설정
    };

    setTiles((prevTiles) => [...prevTiles, newTile]);
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
          <meshBasicMaterial color={tile.color} />  {/* 타일을 오렌지색으로 렌더링 */}
        </mesh>
      ))}
    </Canvas>
  );
};