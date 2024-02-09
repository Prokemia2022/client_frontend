import useFetchToken from "./useFetchToken.hook";
import { Get_Salesperson } from "../pages/api/clients/salesperson/route.api";
import { Get_Client } from "../pages/api/clients/client/route.api";
import { Get_Manufacturer } from "../pages/api/supplier/manufacturer/route.api";
import { Get_Distributor } from "../pages/api/supplier/distributor/route.api";

const UseFetchUserData = async() =>{
    const retrived_token = useFetchToken();
    let data = null;
    if (retrived_token === null){
        return null;
    }
    if(retrived_token?.account_type === 'client'){
        const result = await Get_Client(retrived_token?.email).then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
        data = result;
    }
    if(retrived_token?.account_type === 'distributor'){
        const result = await Get_Distributor(retrived_token?.email).then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
        data = result;
    }
    if(retrived_token?.account_type === 'manufacturer'){
        const result = await Get_Manufacturer(retrived_token?.email).then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
        data = result;
    }
    if(retrived_token?.account_type === 'salesperson'){
        const result = await Get_Salesperson(retrived_token?.email).then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
        data = result;
    }
    return data;
}
export default UseFetchUserData;