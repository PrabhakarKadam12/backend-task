import axios from "axios";
import { config } from "../config";

export const fetchUsers = async (results: number): Promise<any[]> => {
    const response = await axios.get(`${config.apiURL}?results=${results}`);
    return response.data.results;
};
