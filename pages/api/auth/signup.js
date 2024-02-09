import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function SignUp(payload) {
	const cookies = new Cookies();
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = await axios.post(`${base_url}/api/signup/${payload?.account_type}`,payload)
	if(result?.status === 201){
        return result;
    }else{
        cookies.set('user_token', result?.data, { path: '/' });
        return result;
    }
}