import Cookies from 'universal-cookie';
import { EmailOtp, Otp } from '../pages/api/auth/route.api';
const cookies = new Cookies();

export const Generate_Otp=async()=>{
    const characters = '0123456789';
    let result = ''
    const charactersLength = characters.length
    for (let i = 0;i<6;i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    cookies.set('otp_code', result, { path: '/' });
    return result;
}

export const Send_otp= async(code,email)=>{
    const payload = {
        code,
        email
    }
    const result =  await Otp(payload);
    return result;
}

export const Send_Email_Otp= async(code,email)=>{
    const payload = {
        code,
        email
    }
    const result =  await EmailOtp(payload);
    return result;
}

export const Verify_otp=(user_input)=>{
    const otp_code = cookies.get("otp_code");
    if (user_input === otp_code){
        return 'success';
    }
    return 'error'
}