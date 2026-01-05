import type { RefObject } from "react";

export const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const postMessage = async (content: string, sessionId: any, abortControllerRef: RefObject<AbortController>) => {
    return await fetch(`${BASE_URL}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, sessionId }),
        signal: abortControllerRef.current.signal
    });
}

export const getHealth = async () => {
    return await fetch(`${BASE_URL}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export const getAuth = async () => {
    return await fetch(`${BASE_URL}/status`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export const logoutGoogle = async () => {
    return await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
}

