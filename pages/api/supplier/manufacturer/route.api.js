import axios from 'axios';
import Handler from '../../routehandler';

let base_url = Handler();

export async function Get_Manufacturer_Srt() {
    const result = axios.get(`${base_url}/api/manufacturer/srt`);
    return result;
};

export async function Get_Supplier(id){
    const result = axios.get(`${base_url}/api/manufacturer/supplier?query=${id}`)
    return result;
};

export async function Get_Manufacturer(email) {
    const result = axios.get(`${base_url}/api/manufacturer/user?query=${email}`)
    return result;
}

export async function Edit_Manufacturer(payload) {
    const result = axios.put(`${base_url}/api/manufacturer/user/edit`,payload)
    return result;
}
{/**Expert */}
export async function Add_New_Expert_Manufacturer(payload) {
    const result = axios.post(`${base_url}/api/manufacturer/supplier/create_expert`,payload)
    return result;
};

export async function Edit_Expert_Manufacturer(payload) {
    const result = axios.post(`${base_url}/api/manufacturer/supplier/edit_expert`,payload)
    return result;
};

export async function Delete_Expert_Manufacturer(payload) {
    const result = axios.post(`${base_url}/api/manufacturer/supplier/delete_expert`,payload)
    return result;
};
{/**Distributor */}
export async function Add_New_Distributor(payload) {
    const result = axios.post(`${base_url}/api/manufacturer/supplier/create_distributor`,payload)
    return result;
};

export async function Edit_Distributor_Manufacturer(payload) {
    const result = axios.post(`${base_url}/api/manufacturer/supplier/edit_distributor`,payload)
    return result;
};

export async function Delete_Distributor_Manufacturer(payload) {
    const result = axios.post(`${base_url}/api/manufacturer/supplier/delete_distributor`,payload)
    return result;
};
/// 

export async function Manufacturer_request(payload) {
    const result = axios.post(`${base_url}/api/create_request`,payload)
    return result;
}