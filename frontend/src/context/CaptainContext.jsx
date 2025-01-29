import { createContext, useState } from "react";


export const CaptainDataContext = createContext();

export const CaptainContext = ({children}) =>{
    const [captain, setCaptain] = useState({})

    return (
        <CaptainDataContext.Provider value={{captain, setCaptain}}>
            {children}
        </CaptainDataContext.Provider>
    )
}