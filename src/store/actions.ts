/*
 * @Author: lvy lvy
 * @Date: 2023-06-19 14:04:16
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 14:04:31
 * @FilePath: /my-t3-app/src/store/actions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: lvy lvy
 * @Date: 2023-06-11 02:26:46
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 14:00:12
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

export type StoreType = {
  scene: Scene | null | undefined,
  pixelData: ,
}
const useEditor = create<StoreType>((set) => ({
  scene: null,
  pixelData: {},
  setPixelData: (pixelData: any) => set({ pixelData }),
}));

export default useEditor