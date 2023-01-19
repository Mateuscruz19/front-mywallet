import React, { createContext,useState} from "react";

export const AuthContext = createContext({})

function AuthProvider({children}){

    const [User, setUser] = useState({});

    return(
        <AuthContext.Provider value={{User,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;