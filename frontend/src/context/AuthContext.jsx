import { createContext, useEffect, useState } from "react";
import { TK_ACCESS, TK_REFRESH, getUserTKCookie, setUserTKCookie, clearTKCookie } from "../utils/userCookie";
import jwtDecode from "jwt-decode";

import { API_URL_AUTH_RS, API_URL_AUTH_TK, API_URL_AUTH_REGISTER, API_URL_AUTH_LOGOUT, API_URL_USERS } from "../utils/apiUrls";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(undefined);

    const signIn = (formData) => {
        setIsFetching(true)
        fetch(API_URL_AUTH_TK, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(async data => {
            if (data.status == 200) {
                const json = await data.json();
                setUserTKCookie(TK_ACCESS, json.access);
                setUserTKCookie(TK_REFRESH, json.refresh);
                window.location.replace(window.location.origin)
            }
            else return data.json();
        }).catch(err => {
            setError(err)
        }).finally(() => setIsFetching(false))
    }

    const signOut = (formData) => {
        setIsFetching(true)
        fetch(API_URL_AUTH_REGISTER, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(async data => {
            if (data.status == 201) {
                const json = await data.json();
                setUserTKCookie(TK_ACCESS, json.access);
                setUserTKCookie(TK_REFRESH, json.refresh);
                window.location.replace(window.location.origin)
            }
            else return data.json();
        }).catch(err => {
            setError(err)
        }).finally(() => setIsFetching(false))
    }

    const signRefresh = async () => {
        setIsFetching(true)
        const tk_r = getUserTKCookie(TK_REFRESH);

        return fetch(API_URL_AUTH_RS, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: tk_r })
        }).then(async data => {
            if (data.status == 200) {
                const json = await data.json();
                setUserTKCookie(TK_ACCESS, json.access);
                return json.access;
            }
            else return null;
        }).catch(err => {
            setError(err)
        }).finally(() => setIsFetching(false));
    }


    const logout = () => {
        setIsFetching(true)
        const tk = getUserTKCookie(TK_ACCESS);
        const tk_r = getUserTKCookie(TK_REFRESH);

        fetch(API_URL_AUTH_LOGOUT, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            },
            body: JSON.stringify({ refresh: tk_r })
        }).then(data => {
            if (data.status == 204) {

                clearTKCookie(TK_ACCESS);
                clearTKCookie(TK_REFRESH);
                window.location.replace(window.location.origin)
            }
            else return data.json();
        }).catch(err => {
            setError(err)
        }).finally(() => setIsFetching(false))
    }

    const getUser = async (token) => {
        setIsFetching(true)
        const info = jwtDecode(token);
        return fetch(`${API_URL_USERS}${info.user_id}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        ).then(async res => {
            if (res.status == 200) {
                const json = await res.json();

                return {
                    id: info.user_id, millisTime: info.exp * 1000,
                    data: json
                };
            }
            else throw Error();
        }).catch(err => {
            setError(err)
            setUser({ id: info.user_id, millisTime: info.exp * 1000 });
        }).finally(() => setIsFetching(false))

    }

    const getStoredToken = () => {

        const token = getUserTKCookie(TK_ACCESS);
        const refresh = getUserTKCookie(TK_REFRESH);

        return { token, refresh };
    }

    useEffect(() => {

        const stored = getStoredToken();

        const token = stored.token;
        const refresh = stored.refresh;

        if (token || refresh) {
            const info = jwtDecode(token ?? refresh);

            if (token && !refresh) {
                clearTKCookie(TK_ACCESS);
                clearTKCookie(TK_REFRESH);
            }
            else if (!token || (info.exp * 1000) < Date.now()) {
                signRefresh().then(token => {
                    getUser(token).then(setUser);
                })
            }
            else {
                getUser(token).then(setUser);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, getUser, setUser, signIn, signOut, signRefresh, logout, getStoredToken, isFetching, error }} >
            {children}
        </AuthContext.Provider>
    )
}
