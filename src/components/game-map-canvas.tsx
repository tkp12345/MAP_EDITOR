import { useTextures } from '@/hooks/use-textures'
import { useTiles } from '@/hooks/use-tiles'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import forestImg from '@/assets/images/forest.png';
import tileImg from '@/assets/images/tile.png';
import treeImg from '@/assets/images/tree.png';
import { useToastStore } from '@/store/toastStore';
import { OrbitControls } from '@react-three/drei';

interface GameMapCanvasProps {
  selectedSprite: { id: number; src: string } | null;
}

const GRID_SIZE = 30; // 캔버스 그리드 전체 크기
const SEGMENTS = 30;  // 캔버스 그리드의 세그먼트 수 (그리드의 셀 수)
const TILE_SIZE = GRID_SIZE / SEGMENTS;
const spriteSources = [forestImg, tileImg,treeImg];

export const GameMapCanvas = ({ selectedSprite }: GameMapCanvasProps) => {
  const {showToast} = useToastStore()
  const texturesRef = useTextures(spriteSources);
  const { tiles, addTile } = useTiles();
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    drawTile(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    drawTile(e);
  };

  const drawTile = (e: React.MouseEvent) => {
    if (!selectedSprite) return showToast('요소를 선택해 주세요');

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = Math.floor(((mouseX / rect.width) * GRID_SIZE - GRID_SIZE / 2) / TILE_SIZE) * TILE_SIZE;
    const y = Math.floor(((mouseY / rect.height) * -GRID_SIZE + GRID_SIZE / 2) / TILE_SIZE) * TILE_SIZE;
    const z = 0;

    const loadedTexture = texturesRef.current[selectedSprite.src];

    if (loadedTexture) {
      addTile([x, y, z], loadedTexture);
    }
  };

  return (
    <Canvas
      orthographic
      camera={{ zoom: 50, position: [0, 0, 100] }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ background: '#2d2d2d', width: '800px', height: '600px' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls
        enablePan={true}
        enableRotate={false}
        enableZoom={true}
        zoomSpeed={0.5}
        maxZoom={100}
        minZoom={10} // 최소 줌을 줄여 더 가까이 확대  
        target={[0, 0, 0]} // 카메라 기준점
      />

      <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <gridHelper args={[GRID_SIZE, SEGMENTS, '#ffffff', '#555555']} />
      </group>

      {tiles.map((tile) => (
        <mesh key={tile.id} position={tile.position}>
          <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
          <meshBasicMaterial
            map={tile.texture}
            transparent={true}
            alphaTest={0.5} // 투명도 임계값 설정
          />
        </mesh>
      ))}
    </Canvas>
  );
};