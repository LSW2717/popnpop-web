import api from '../config/axios/AxiosConfig'
import {HomeResponse} from "@/interfaces/HomeInterface";


export const getHome = async (): Promise<HomeResponse> => {
    const response = await api.get<HomeResponse>('/home');
    return response.data;
};
