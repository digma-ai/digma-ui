import { useDispatch, useSelector } from "react-redux";
import type { MainDispatch, MainRootState } from "./store";

export const useMainDispatch = useDispatch.withTypes<MainDispatch>();
export const useMainSelector = useSelector.withTypes<MainRootState>();
