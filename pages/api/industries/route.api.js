import axios from 'axios';
import Handler from '../routehandler';

let base_url = Handler();
const options = {
    // Ensure no referrer is sent
    'Referrer-Policy': 'no-referrer',
}

export async function Get_Industries_Srt() {
	// const result = await axios.get(`${base_url}/api/industries/srt`,{headers: options});
    // return result;
    try {
        const result = await axios.get(`${base_url}/api/industries/srt`, { headers: options });
        return result; // Return just the data from the response
    } catch (error) {
        // Handle errors
        console.error('Error fetching industries:', error);
        throw error; // Rethrow the error to be handled elsewhere
    }
}

export async function Get_Industry_data(title) {
	const result = axios.get(`${base_url}/api/industries/industry?query=${title}`);
    return result;
}

export default async function Suggest_Industry(payload){
	const result = axios.post(`${base_url}/api/suggest_industry`,payload);
    return result;
}