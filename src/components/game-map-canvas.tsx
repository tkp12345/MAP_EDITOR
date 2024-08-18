import { Canvas } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Tile {
  id: number;
  position: [number, number, number];
  texture: THREE.Texture;
}

interface GameMapCanvasProps {
  selectedSprite: { id: number; src: string } | null;
}

const TILE_SIZE = 1; // 타일의 크기

export const GameMapCanvas = ({ selectedSprite }: GameMapCanvasProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const texturesRef = useRef<{ [key: string]: THREE.Texture }>({});
  const [isDrawing, setIsDrawing] = useState(false); // 마우스가 눌려 있는지 추적

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const spriteSources = [
      '/public/icons/forest.png',
      '/public/icons/tile.png',
      '/public/icons/tree.png',
    ];

    spriteSources.forEach((src) => {
      textureLoader.load(src, (texture) => {
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;

        texturesRef.current[src] = texture;
      });
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    drawTile(e); // 마우스가 눌리면 바로 타일을 그리기 시작
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return; // 마우스가 눌려 있는 동안에만 그리기
    drawTile(e);
  };

  const drawTile = (e: React.MouseEvent) => {
    if (!selectedSprite) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = Math.floor(((mouseX / rect.width) * 10 - 5) / TILE_SIZE) * TILE_SIZE;
    const y = Math.floor(((mouseY / rect.height) * -10 + 5) / TILE_SIZE) * TILE_SIZE;
    const z = 0;

    const loadedTexture = texturesRef.current[selectedSprite.src];

    if (loadedTexture) {
      const newTile: Tile = {
        id: Date.now(),
        position: [x, y, z],
        texture: loadedTexture,
      };

      setTiles((prevTiles) => {
        const exists = prevTiles.some(
          (tile) => tile.position[0] === newTile.position[0] && tile.position[1] === newTile.position[1]
        );
        if (!exists) {
          return [...prevTiles, newTile];
        }
        return prevTiles;
      });
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