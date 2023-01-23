import React, { createContext,useState} from "react";

export const AuthContext = createContext({})

function AuthProvider({children}){

    const [Token, setToken] = useState({});
    const [user, setUser] = useState({});

    return(
        <AuthContext.Provider value={{Token,setToken,user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

// Funcao para transportar o token de usuario entre os componentes.