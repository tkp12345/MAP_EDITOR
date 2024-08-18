import { Sprite } from '@/types/sprite'
import styled from '@emotion/styled'
import { useState } from 'react';

interface SpritesProps {
    onSelect: (sprite:Sprite)=> void
}

const DEFAULT_SPRITE: Sprite[] = [
    { id: 1, src: '/public/icons/forest.png' },
    { id: 2, src: '/public/icons/tile.png' },
    { id: 3, src: '/public/icons/tree.png' }
];



export const SpritesSection = ({onSelect}:SpritesProps) => {
    const [selected, setSelected] = useState<Sprite | null>(null);

    const handleSelect = (sprite: Sprite) => {
        setSelected(sprite);
        onSelect(sprite);
    };

    return (
        <SpritesLayout>
            {DEFAULT_SPRITE.map(sprite=> (
                <SpriteItem
                  key={sprite.id}
                  src={sprite.src}
                  alt={`sprite-${sprite.id}`}
                  onClick={() => handleSelect(sprite)}
                  isSelected={selected?.id === sprite.id}
                />
            ))}
        </SpritesLayout>
    );
};

const SpritesLayout = styled.div`
    width: 200px;
    background: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing(1)};
    display: flex;
    flex-wrap: wrap;
`;

const SpriteItem = styled.img<{ isSelected: boolean }>`
    width: 50px;
    height: 50px;
    margin: ${({ theme }) => theme.spacing(0.5)};
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 2px solid ${({ theme }) => theme.colors.secondary}; /* 기본 테두리 색상 */
    background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.selectedBackground : 'transparent')}; /* 선택 시 배경 검정색 */
    border-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.selectedBorder : theme.colors.secondary)}; /* 선택 시 테두리 색상 변경 */
    box-sizing: border-box; /* 테두리 포함 크기 계산 */
`;