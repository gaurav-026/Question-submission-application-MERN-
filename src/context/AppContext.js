import { createContext, useEffect, useState } from "react";

//create the context
export const AppContext = createContext();


//Fetch All Data From Database
function AppContextProvider({ children }) {

    const [fetchedData, setFetchedData] = useState([]);
    //Fetch All the DAta from the database
    const fetchTasks = async () => {
        const response = await fetch(`https://question-submission-application-mern.onrender.com/api/v1/getResponse`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const result = await response.json();
        console.log("Fetched result", result);
        // setFetchedData(result.data.object.formData);
        if (result && result.success && result.data && result.data.object) {
            setFetchedData(result.data.object.formData);
        } else {
            console.warn('Unexpected response structure or no data found:', result);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    console.log("Data is:", fetchedData);


    //pass the appcontext provider
    return <AppContext.Provider value={{ fetchedData, setFetchedData }}>
        {children}
    </AppContext.Provider>
};

export default AppContextProvider;