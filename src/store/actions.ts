/*
 * @Author: lvy lvy
 * @Date: 2023-06-19 14:04:16
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 15:51:11
 * @FilePath: /my-t3-app/src/store/actions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { create } from 'zustand';
import {
  DefaultLoadingManager,
  Matrix4,
  Object3D,
  Scene,
  WebGLRenderer,
} from 'three';
import { pixelData } from './pixel';

type Numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type NumberKeys = keyof Numbers;
export type StoreType = {
  scene: Scene | null | undefined,
  pixelData: pixelData | null,
  setPixelData: (data: pixelData) => void,
  strokeColorIndex: number
  setStrokeColorIndex: (color: number) => void,
  strokeColorArray: string[],
  entityDepth: Numbers,
  setEntityDepth: (entityDepth: Numbers) => void
}

const useEditor = create<StoreType>((set) => ({
  scene: null,
  pixelData: {},
  setPixelData: (pixelData: any) => set({ pixelData }),
  strokeColorIndex: 1,
  setStrokeColorIndex: (strokeColorIndex: number) => set({ strokeColorIndex }),
  strokeColorArray: [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#1B1A1B',
    '#00ffff',
    '#000000',
    '#ffffff',
    '#888888',
  ],
  entityDepth: 1,
  setEntityDepth: (entityDepth: Numbers) => set({ entityDepth }),
}));

export default useEditor