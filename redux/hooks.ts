// /hooks/hooks.ts
import { useDispatch, useSelector } from "react-redux";
// import RootState and AppDispatch from the store
import { AppDispatch,RootState } from "./store";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();