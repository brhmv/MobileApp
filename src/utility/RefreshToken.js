import { storage } from "./MMKV";

export const refreshTokens = async () => {
    const refreshToken = storage.getString('refreshToken');

    if (refreshToken) {
        const url = 'http://192.168.0.117:3000/auth/refresh';
        const body = JSON.stringify({ token: refreshToken });

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                storage.set('token', data.accessToken);
                console.log(data);
                console.log("Refreshed!!");
            } else {
                alert('Session expired, please sign in again');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    } else {
        console.warn('No refresh token found');
        return null;
    }
};