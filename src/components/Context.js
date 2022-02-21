import { createContext, useState } from "react";

const initialState = {
    user: null,
    token: null
}

const contextObj = createContext(initialState)

function GlobalContextProvider({ children }) {
    const [data, setData] = useState(JSON.parse(sessionStorage.getItem('sessionData')) || initialState)

    function loginSuccessful(userData, token) {
        sessionStorage.getItem('session', JSON.stringify(userData))
        console.log(setData({ ...data, user: userData, token }));
    }
    function logout() {
        sessionStorage.clear()
        setData(initialState);
    }
    const globalStore = { data, loginSuccessful, logout };
    return (
        <contextObj.Provider value={globalStore}>{children}</contextObj.Provider>
    )
}

export { contextObj, GlobalContextProvider }