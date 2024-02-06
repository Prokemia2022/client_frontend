import { Get_Products_Srt } from "../../pages/api/product/route.api";

export const useProductsSrt = async()=>{
    let result = await Get_Products_Srt().then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching products")
    })
    return result;
}