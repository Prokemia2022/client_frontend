import axios from 'axios';
import Handler from '../routehandler';

let base_url = Handler();

export async function Get_Technologies_Srt() {
	const result = axios.get(`${base_url}/api/technologies/srt`);
    return result;
}

export async function Get_Technology_data(title) {
	const result = axios.get(`${base_url}/api/technologies/technology?query=${title}`);
    return result;
}

export default async function Suggest_Technology(payload){
	const result = axios.post(`${base_url}/api/suggest_technology`,payload);
    return result;
}