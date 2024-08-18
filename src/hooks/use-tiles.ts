import { useState } from 'react';
import * as THREE from 'three';

interface Tile {
  id: number;
  position: [number, number, number];
  texture: THREE.Texture;
}

/*
타일의 상태를 관리하고, 타일을 추가하는 훅
 */
export const useTiles = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  const addTile = (position: [number, number, number], texture: THREE.Texture) => {
    const newTile: Tile = {
      id: Date.now(),
      position,
      texture,
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
  };

  return { tiles, addTile };
};