import { createSlice } from "zustand-slices";

interface AssetsState {
  showAssetsHeaderToolBox: boolean;
}

const initialState: AssetsState = {
  showAssetsHeaderToolBox: true
};

const set = (update: Partial<AssetsState>) => (state: AssetsState) => ({
  ...state,
  ...update
});

export const assetsSlice = createSlice({
  name: "assets",
  value: initialState,
  actions: {
    setShowAssetsHeaderToolBox: (showAssetsHeaderToolBox: boolean) =>
      set({ showAssetsHeaderToolBox })
  }
});
