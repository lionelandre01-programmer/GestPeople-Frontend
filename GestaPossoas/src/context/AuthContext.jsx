import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
                    
        }

    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}