
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsDoneThunk,  fetchAddHabitThunk} from './features/habit/habitSlice';
import type { RootState, AppDispatch } from "./store";

type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdate: Date;
}

export default function Habits() {
    const dispatch = useDispatch<AppDispatch>();
    // Usar Redux directamente en vez de props
    const habits = useSelector((state: RootState) => state.habits.habits);
    const { status, error } = useSelector((state: RootState) => state.habits);
    const user = useSelector((state: RootState) => state.user.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const calculateProgress = (days: number): number => {
        return Math.min((days / 66) * 100, 100);
    };

    const handleMarkAsDone = async (habitId: string) => {
        if (user) {
            await dispatch(markAsDoneThunk({ habitId, token: user.toString() })).unwrap();
            //Evitar que sobreescriba el Slice con el response del markAsDone
        }
    };

    const handleAddHabit = async () => {
        if (title && description && user) {
            const token = user.toString();
            await dispatch(fetchAddHabitThunk({ token, title, description })).unwrap();
            //Evitar que sobreescriba el Slice con el response del addHabit
            setTitle('');
            setDescription('');
        }
    };
    return (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8 align-content-center">
            <h1 className="text-2xl font-bold mb-4 text-black mt-8">Habits</h1>
            <ul className="space-y-4 max-h-100 overflow-y-auto pt-4">
                {habits.length > 0 ? (
                    habits.map((habit: Habit) => (
                        <li className="flex items-center justify-between mt-2" key={habit._id}>
                            <span className="text-black">{habit.title}</span>
                            <div className="flex items-center space-x-2">
                                <progress className="w-24" value={calculateProgress(habit.days)} max="100"></progress>
                                <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded" 
                                    onClick={() => handleMarkAsDone(habit._id)}>
                                    {status[habit._id] === "loading" ? "Processing" : "Mark as Done"}
                                </button>
                                {status[habit._id] === "failed" && <span className="text-red-500">{error[habit._id]}</span>}
                                {status[habit._id] === "success" && <span className="text-green-500">Already marked as done!</span>}
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No habits available.</li>
                )}
            </ul>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-black">Agrega un habito nuevo</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    />
                </div>
                <button
                    onClick={handleAddHabit}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Add
                </button>
            </div>
        </div>
    );
}