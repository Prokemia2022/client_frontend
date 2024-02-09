import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export default function useFetchToken(){
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    if (token){
        const decoded_token = jwt_decode(token);
        return decoded_token;
    }else{
        return null;
    }
}