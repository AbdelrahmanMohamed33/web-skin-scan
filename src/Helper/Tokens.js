import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { DateTime } from 'luxon'; // Import DateTime from luxon

export function saveToken(key, token) {
    // Save the token in a cookie with httpOnly flag
    Cookies.set(key, token);
  };
/*export function getToken(key) {
    // Save the token in a cookie
    return Cookies.get(key);
};*/
export function getToken(key) {
    return Cookies.get(key) || "";
}

export function isTokenExpired(token) {
    if (!token || typeof token !== "string") {
        return true; // Consider it expired if it's not a string
    }
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = DateTime.now().toSeconds();
        return decodedToken.exp < currentTime;
    } catch (e) {
        console.error("Error decoding token:", e);
        return true; // Assume expired if decoding fails
    }
}
/*
export function isTokenExpired(token) {
    if (token === null) {
        return true; // Token is null, consider it expired
    }
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = DateTime.now().toSeconds(); // Current time in seconds
        return decodedToken.exp < currentTime; // Check if exp claim is before current time
    } catch (e) {
        console.error("Error decoding token:", e);
        return true; // Assume expired if decoding fails
    }
}*/
export function deleteToken(key) {
    Cookies.remove(key);
}
/*export function getName(token){
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
}*/
export function getName(token) {
    if (!token || typeof token !== "string") return null;
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
}

export function getId(token) {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.uid ;
  }
}