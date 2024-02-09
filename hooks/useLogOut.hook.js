import Cookies from 'universal-cookie';

export default function UseLogOut(){
    const cookies = new Cookies();
    cookies.remove('user_token', { path: '/' });
}