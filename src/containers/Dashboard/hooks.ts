import { useDispatch, useSelector } from "react-redux";
import type { DashboardDispatch, DashboardRootState } from "./store";

export const useDashboardDispatch = useDispatch.withTypes<DashboardDispatch>();
export const useDashboardSelector = useSelector.withTypes<DashboardRootState>();
