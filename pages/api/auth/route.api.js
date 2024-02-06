import axios from 'axios';
import Handler from '../routehandler';
import Cookies from 'universal-cookie';

let base_url = Handler();

export async function Verify_User_Email(payload) {
	const result = await axios.put(`${base_url}/api/verify_email`,payload);
    return result;
}

export async function SignIn(payload) {
	const cookies = new Cookies();
	const result = await axios.post(`${base_url}/api/signin`,payload);
	cookies.set('user_token', result?.data, { path: '/' });
	return result;
}

export async function SignUp(payload) {
	const cookies = new Cookies();
	const result = await axios.post(`${base_url}/api/signup/${payload?.account_type}`,payload)
	if(result?.status === 201){
        return result;
    }else{
        cookies.set('user_token', result?.data, { path: '/' });
        return result;
    }
}

export async function Password_Reset(payload) {
    const result = await axios.put(`${base_url}/api/password_reset`,payload);
    return result;
}

export async function Otp(payload) {
    const result = axios.post(`${base_url}/api/otp/send/password_reset`,payload)
    return result;
}

export async function EmailOtp(payload) {
    const result = axios.post(`${base_url}/api/otp/send/verify_email`,payload)
    return result;
}


export async function DeleteAccount(payload) {
	const result = await axios.post(`${base_url}/api/delete/${payload?.account_type}?query=${payload?.email_of_company}`);
    return result;
}