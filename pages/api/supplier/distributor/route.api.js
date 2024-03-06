import axios from 'axios';
import Handler from '../../routehandler';

let base_url = Handler();


export async function Get_Distributors_Srt() {
	const result = axios.get(`${base_url}/api/distributor/srt`);
    return result;
}

export async function Get_Supplier_Distributor(id) {
    const result = axios.get(`${base_url}/api/distributor/supplier?query=${id}`)
    return result;
}

export async function Get_Distributor(email) {
    const result = axios.get(`${base_url}/api/distributor/user?query=${email}`)
    return result;
}

export async function Edit_Distributor(payload) {
    const result = axios.put(`${base_url}/api/distributor/user/edit`,payload)
    return result;
}
{/**Expert */}
export async function Add_New_Expert_Distributor(payload) {
    const result = axios.post(`${base_url}/api/distributor/supplier/create_expert`,payload)
    return result;
};

export async function Edit_Expert_Distributor(payload) {
    const result = axios.post(`${base_url}/api/distributor/supplier/edit_expert`,payload)
    return result;
};

export async function Delete_Expert_Distributor(payload) {
    const result = axios.post(`${base_url}/api/distributor/supplier/delete_expert`,payload)
    return result;
};
{/**Distributor */}
export async function Add_New_Manufacturer_Distributor(payload) {
    const result = axios.post(`${base_url}/api/distributor/supplier/create_manufacturer`,payload)
    return result;
};

export async function Edit_Manufacturer_Distributor(payload) {
    const result = axios.post(`${base_url}/api/distributor/supplier/edit_manufacturer`,payload)
    return result;
};

export async function Delete_Manufacturer_Distributor(payload) {
    const result = axios.post(`${base_url}/api/distributor/supplier/delete_manufacturer`,payload)
    return result;
};