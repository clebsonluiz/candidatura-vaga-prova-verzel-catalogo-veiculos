import React from "react";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


/**
 * 
 * @returns {{ 
 * user: object | null, 
 * getUser: (token: string) => Promise<void | {id: any; millisTime: number; data: any;}>, 
 * setUser: React.Dispatch<React.SetStateAction<undefined>>, 
 * signIn: (formData: object) => void, 
 * signOut: (formData: object) => void, 
 * signRefresh: () => Promise, 
 * logout: () => void,
 * getStoredToken: () => {token: string | null, refresh: string | null}
 * isFetching: Boolean,
 * error: object
 * }}
 */
const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export default useAuth;