import axios from "axios";

export const authRegister = async ({ username, password, role }: { username: string; password: string; role: string; }) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/auth/register`, {
        username,
        password,
        role
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
}

export const authLogin = async ({ username, password }: { username: string; password: string }) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/auth/login`, {
        username,
        password
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
}