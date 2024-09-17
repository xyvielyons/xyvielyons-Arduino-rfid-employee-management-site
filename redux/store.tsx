// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
//import the ConterSlice from Slices folder
import AddEmployeeSlice from "./slices/AddEmployeeSlice";
//configure your store
export const store = configureStore({
    
    reducer: {
      
      //define your slices here
      //the first is the name of the slice parsing in the counterSlice
      AddEmployee:AddEmployeeSlice
     
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;