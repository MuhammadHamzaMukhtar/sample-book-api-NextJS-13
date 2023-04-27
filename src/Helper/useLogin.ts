import loginUser from "./loginUser";
import Cookies from "js-cookie"

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const user = await loginUser(username, password);
        if(user){
            Cookies.set("currentUser", JSON.stringify(user));
        }

        return user;
    }

    return {login};
}