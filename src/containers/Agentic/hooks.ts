import { useDispatch, useSelector } from "react-redux";
import type { AgenticDispatch, AgenticRootState } from "./store";

export const useAgenticDispatch = useDispatch.withTypes<AgenticDispatch>();
export const useAgenticSelector = useSelector.withTypes<AgenticRootState>();
