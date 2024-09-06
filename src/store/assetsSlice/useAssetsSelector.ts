import { useStore } from "../useStore";

export const useAssetsSelector = () => useStore((state) => state.assets);
