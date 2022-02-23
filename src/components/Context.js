import { createContext, useState } from "react";

const initialState = {
    user: null,
    token: null
}

const contextObj = createContext(initialState)

function GlobalContextProvider({ children }) {

    const [data, setData] = useState(JSON.parse(sessionStorage.getItem('sessionData')) || initialState);

    function loginSuccessful(userData, token) {

        const updatedData = { ...data }
        if (userData) {
            updatedData.user = userData
        }

        if (token) {
            updatedData.token = token
        }
        setData(updatedData);
        sessionStorage.setItem('sessionData', JSON.stringify(updatedData));
    }
    function logout() {
        sessionStorage.clear();
        setData(initialState);
    }
    const globalStore = { data, loginSuccessful, logout };
    return (
        <contextObj.Provider value={globalStore}>{children}</contextObj.Provider>
    )
}

export { contextObj, GlobalContextProvider }