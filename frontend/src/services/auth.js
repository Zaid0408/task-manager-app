import { postRequest } from "./api";

export async function login(loginPayload){
    const result= await postRequest('/auth/login',loginPayload);
    return result;
}

export async function signup(loginPayload){
    const result= await postRequest('/auth/signup',loginPayload);
    return result;
}

export async function logout(loginPayload){
    const result= await postRequest('/auth/logout',loginPayload);
    return result;
}

export function isAuthenticated(){
    const token = getToken();
    return !!token; // Returns true if token exists, false otherwise
}

export function getToken(){
    try {
        const token = localStorage.getItem('authToken'); 
        return token;
    } catch (error) {
        console.error("Error retrieving token from local storage:", error);
        return null;
    }
}

export function removeToken(){
    localStorage.removeItem('authToken')
}

export function setToken(token){
    localStorage.setItem('authToken', token); 
}