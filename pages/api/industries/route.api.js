import axios from 'axios';
import Handler from '../routehandler';

let base_url = Handler();

export async function Get_Industries_Srt() {
	const result = axios.get(`${base_url}/api/industries/srt`);
    return result;
}

export async function Get_Industry_data(title) {
	const result = axios.get(`${base_url}/api/industries/industry?query=${title}`);
    return result;
}

export default async function Suggest_Industry(payload){
	const result = axios.post(`${base_url}/api/suggest_industry`,payload);
    return result;
}