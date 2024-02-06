import axios from 'axios';
import Handler from '../../routehandler';

let base_url = Handler();

export async function Get_Salesperson(email) {
    const result = axios.get(`${base_url}/api/salesperson/user?query=${email}`)
    return result;
}

export async function Edit_Salesperson(payload) {
    const result = axios.put(`${base_url}/api/salesperson/edit`,payload)
    return result;
}

export async function Get_Sales_By_Creator(id) {
    const result = axios.get(`${base_url}/api/sales/creator?query=${id}`)
    return result;
}

export async function Delete_Sale(id) {
    const result = axios.delete(`${base_url}/api/sales/sale/delete?query=${id}`)
    return result;
}

export async function Edit_Sale_Data(payload) {
    const result = axios.put(`${base_url}/api/sales/sale/edit?query=${payload?.sale_id}`,payload)
    return result;
}


export default async function Create_Sale(payload) {
    const result = axios.post(`${base_url}/api/sales/new`,payload)
    return result;
}