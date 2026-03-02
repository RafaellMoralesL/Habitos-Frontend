import './App.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabitsThunk } from "./features/habitSlice";
import type {RootState, AppDispatch } from './store';
import Habits from './habits';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: RootState) => state.habits.habits);

  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);
  
  return (
    <>
  <div>
    <Habits habits={habits}/>
  </div>
    </>
  )
}

export default App
