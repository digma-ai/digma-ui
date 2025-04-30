import { useDispatch, useSelector } from "react-redux";
import type { RecentActivityDispatch, RecentActivityRootState } from "./store";

export const useRecentActivityDispatch =
  useDispatch.withTypes<RecentActivityDispatch>();
export const useRecentActivitySelector =
  useSelector.withTypes<RecentActivityRootState>();
