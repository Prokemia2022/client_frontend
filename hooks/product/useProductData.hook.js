import { Get_Product } from "../../pages/api/product/route.api";

export const useProductData = async(id)=>{
    let result = await Get_Product(id).then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching product")
    })
    return result;
}