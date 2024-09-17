// store/slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { employeeDefaultStateTypes } from "@/types";

//our initial counter state is o
const initialState: employeeDefaultStateTypes = {
  currentStep: 1,
  formData:{}

};
 
const AddEmployeeSlice = createSlice({
//name of the slice
  name: "AddEmployeeSlice",
  //the initial state
  initialState,
  //the reducer functions
  reducers: {
    setCurrentStep:(state,action)=>{
        state.currentStep = action.payload;

    },
    updateFormData:(state,action)=>{
        state.formData = {
            ...state.formData,
            ...action.payload
        }
    }
  },
});

//export the reducers from counterSlice.actions
export const { setCurrentStep, updateFormData } = AddEmployeeSlice.actions;
//export the counterSlice.reducer
export default AddEmployeeSlice.reducer;