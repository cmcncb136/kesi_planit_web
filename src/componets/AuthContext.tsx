import React, {createContext, useContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {axiosInstance} from "./api/axiosInstance"
import {User as AppUser} from "./dto/User"

interface AuthContextType {
    user: AppUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<AppUser | null>(null);

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("firebaseUser", firebaseUser)
            if (firebaseUser) {
                await axiosInstance.get("/user").then(response => {
                        // if(response.status == 404) {}
                        setUser(response.data);
                    }
                )
            } else
                setUser(null);

            setLoading(false)
        })


        return () => unsubscribe() //컴포넌트 언 마운트시 리스너를 정리
    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);