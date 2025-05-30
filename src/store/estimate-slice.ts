import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Item {
  title: string;
  unit: string;
  quantity: string;
  price: string;
  margin: string;
}

interface Section {
  sectionTitle: string;
  items: Item[];
}

interface EstimateState {
  sections: Section[];
}

const initialState: EstimateState = {
  sections: [],
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    setEstimateData(state, action: PayloadAction<EstimateState>) {
      state.sections.push(...action.payload.sections);
    },
    resetEstimate() {
      return initialState;
    },
  },
});

export const { setEstimateData, resetEstimate } = estimateSlice.actions;

export default estimateSlice.reducer;
