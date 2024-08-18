import { Sprite } from '@/types/sprite'
import styled from '@emotion/styled'

interface SpritesProps {
    onSelect: (sprite:Sprite)=> void
}

const DEFAULT_SPRITE: Sprite[] = [
    { id: 1, src: '/public/icons/forest.png' },
    { id: 2, src: '/public/icons/tile.png' },
    { id: 3, src: '/public/icons/tree.png' }
];



export const SpritesSection = ({onSelect}:SpritesProps) => {
    return (
        <SpritesLayout>
            {DEFAULT_SPRITE.map(sprite=> (
                <SpriteItem
                  key={sprite.id}
                  src={sprite.src}
                  alt={`sprite-${sprite.id}`}
                  onClick={() => onSelect(sprite)}
                />
            ))}
        </SpritesLayout>
    );
};

const SpritesLayout = styled.div`
    width: 200px;
    background: #333;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
`

const SpriteItem = styled.img`
    width: 50px;
    height: 50px;
    margin: 5px;
    cursor: pointer;
`