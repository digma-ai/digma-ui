import { useDispatch, useSelector } from "react-redux";
import type { AdminDispatch, AdminRootState } from "./store";

export const useAdminDispatch = useDispatch.withTypes<AdminDispatch>();
export const useAdminSelector = useSelector.withTypes<AdminRootState>();
