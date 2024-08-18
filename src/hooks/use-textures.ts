import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
특정 텍스처를 미리 로드하고 이를 참조하는 훅
 */
export const useTextures = (spriteSources: string[]) => {
  //모든 텍스처를 캐시하여 필요할 때마다 사용하도록 합니다.
  const texturesRef = useRef<{ [key: string]: THREE.Texture }>({});

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    //각각의 스프라이트 이미지를 로드하고 텍스처로 변환한 후 저장
    spriteSources.forEach((src) => {
      textureLoader.load(src, (texture) => {
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;

        texturesRef.current[src] = texture;
      });
    });
  }, [spriteSources]);

  return texturesRef;
};
