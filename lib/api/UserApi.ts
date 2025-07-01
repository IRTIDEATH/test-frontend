import axios from "axios";

export const userDetail = async (token: any) => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/auth/profile`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
}