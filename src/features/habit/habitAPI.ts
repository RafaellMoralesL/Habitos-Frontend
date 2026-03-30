
const API_URL = import.meta.env.VITE_API_URL;
// Peticion o consulta de los habitos con token
export const fetchHabits = async (token:string) => {
    const response = await fetch(`${API_URL}/habits`, {
        headers: {Authorization: 'Bearer ' +token } 
    });
    if (!response.ok) {
        throw new Error("Failed to fetch habits");
    }
    return response.json();
};


// Marcar habito por id con token
export const markAsDone = async (habitId: string, token: string) => {
    const response = await fetch(`${API_URL}/habits/markasdone/${habitId}`, {
        method: "PATCH",
        headers: {Authorization: 'Bearer '+token }
    });
    return response.json();
};

// Consulta para agregar el habito desde el frontend
export const fetchAddHabit = async (token:string, title:string, description:string) => {
    const response = await fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: {Authorization: 'Bearer '+token ,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "description": description
        })
    });
    if (!response.ok) {
        throw new Error("Failed to fetch habits");
    }
    return response.json();
};