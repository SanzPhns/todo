import { createContext, useState } from "react";


export const Context = createContext();

export const ContextProvider = ({children})=>{
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    let [count, setCount] = useState(0);
    const [deletedTasks, setDeletedTasks] = useState([]);

    return(
        <Context.Provider 
           value={{value, setValue, tasks, setTasks, count, setCount, deletedTasks, setDeletedTasks}}>
            {children}
        </Context.Provider>
    );
}