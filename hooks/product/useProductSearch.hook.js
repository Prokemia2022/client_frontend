import { Get_Products_By_Search } from "../../pages/api/product/route.api";


export const UseProductsSearch = async(query_params)=>{
    let result = await Get_Products_By_Search(query_params).then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching products")
    })
    return result;
}