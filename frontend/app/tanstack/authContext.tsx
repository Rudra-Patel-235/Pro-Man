import { loginSchema } from "@/lib/zodSchema";
import type { User } from "@/schema";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { queryClient } from "./rqprovider";
import { useLocation, useNavigate } from "react-router";
import { publicRoutes } from "@/lib/public";
import { set } from "zod";

interface AuthContextType {
    user : User | null;
    isAuthenticated : boolean;
    isLoading : boolean;
    login : (data: any) => Promise<void>;
    logout : () => Promise<void>;
}


const authContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const isPublicRoute = publicRoutes.includes(currPath);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            const userData = localStorage.getItem('user');
            if(userData) {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }else {
                setIsAuthenticated(false);
                if(!isPublicRoute){
                    navigate('/login');
                }
            }
            setIsLoading(false);
        }

        checkAuth();
    }, [])


    useEffect(() => {
        const handleLogout = () => {
            logout();
            navigate('/login');
        }

        window.addEventListener('force-logout', handleLogout);
        return () => {
            window.removeEventListener('force-logout', handleLogout);
        }
    }, [])

    const login = async (data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        // setIsLoading(false)
    }

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        queryClient.clear();
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