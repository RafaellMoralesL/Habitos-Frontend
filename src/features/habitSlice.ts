import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";
type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdate: Date;
}

type HabitState = {
    habits: Habit[];
}

const initialState: HabitState = {
    habits: []
}
export const fetchHabitsThunk = createAsyncThunk("habits/fetchHabits", async () => {
    return await fetchHabits();
});

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabits: (state, action) => {
            state.habits = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        })
    }
});

export const { addHabits} = habitSlice.actions;
export default habitSlice.reducer;
