import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnakebarState {
  message: string;
}

const initialState: SnakebarState = {
  message: "",
};

const counterSlice = createSlice({
  name: "snakebar",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = counterSlice.actions;
export default counterSlice.reducer;
