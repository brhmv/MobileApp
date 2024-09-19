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
                storage.set('accessToken', data.accessToken);
                console.log("Refreshed!!");
                // return data.accessToken;
            } else {
                alert('Session expired, please sign in again');
                // storage.clearAll();
                // return null;
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


// export const refreshTokens = async () => {
//     const refreshToken = storage.getString('refreshToken');

//     if (!refreshToken) {
//         console.warn('No refresh token found');
//         return null;
//     }

//     try {
//         const response = await fetch('http://192.168.0.117:3000/auth/refresh', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ refreshToken }),
//         });

//         if (response.ok) {
//             const { accessToken } = await response.json();
//             storage.set('accessToken', accessToken);
//             return accessToken;
//         } else {
//             console.error('Failed to refresh token');
//             alert('Session expired, please sign in again');
//             storage.clearAll();
//             return null;
//         }
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         return null;
//     }
// };

