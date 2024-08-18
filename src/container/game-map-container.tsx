import { Sprite } from '@/types/sprite'
import { useState } from 'react'
import styled from '@emotion/styled'
import { GameMapCanvas } from '@/components/game-map-canvas';
import { SpritesSection } from '@/components/sprites-section';


export const GameMapContainer = () => {
    const [selectedSprite, setSelectedSprite] = useState<Sprite | null>(null);
console.log('selectedSprite:',selectedSprite)
    const handleSpriteSelect = (sprite: Sprite) => {
        setSelectedSprite(sprite);
    };

    return (
        <GameMapLayout>
            <SpritesSection onSelect={handleSpriteSelect} />
            <GameMapCanvas selectedSprite={selectedSprite} />
        </GameMapLayout>
    );
};


const GameMapLayout = styled.div`
    display: flex;
`