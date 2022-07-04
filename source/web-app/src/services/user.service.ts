import { ACCESS_TOKEN_KEY } from "../common/constants";
import { CreateUserInput } from "../models/createUserInput";
import { UserLoginInput } from "../models/userLoginInput";
import api from "./base.service";

export const AuthenticateUser = async (data: UserLoginInput) => {
    const response = await api.post('users/login', JSON.stringify(data));
    return response.data;
}

export const SaveAccessToken = (token: string) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export const IsUserAuthenticated = async () => {
    const response = await api.get('users/is-authenticated');
    return response.data;
}

export const RegisterUser = async (data: CreateUserInput) => {
    const response = await api.post('users/register', JSON.stringify(data));
    return response.data;
}
