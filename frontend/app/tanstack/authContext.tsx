import { loginSchema } from "@/lib/zodSchema";
import type { User } from "@/schema";
import { createContext, useContext, useState } from "react";
import React from "react";

interface AuthContextType {
    user : User | null;
    isAuthenticated : boolean;
    isLoading : boolean;
    login : (email : string, password: string) => Promise<void>;
    logout : () => Promise<void>;
}


const authContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email: string, password: string) => {
        console.log("Logging in with", email, password);
    }

    const logout = async () => {
        console.log("Logging out");
    }


    const values = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    }

    return ( <authContext.Provider value={values}> {children} </authContext.Provider> )

}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};