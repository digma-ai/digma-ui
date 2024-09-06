import { createSlice } from "zustand-slices";

interface AssetsState {
  showAssetsHeader: boolean;
}

const initialState: AssetsState = {
  showAssetsHeader: true
};

const set = (update: Partial<AssetsState>) => (state: AssetsState) => ({
  ...state,
  ...update
});

export const assetsSlice = createSlice({
  name: "assets",
  value: initialState,
  actions: {
    setShowAssetsHeader: (showAssetsHeader: boolean) =>
      set({ showAssetsHeader })
  }
});
