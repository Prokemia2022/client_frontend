import { Get_Products_By_Lister } from "../../pages/api/product/route.api";

export const useProductsByLister = async(lister_id)=>{
    let result = await Get_Products_By_Lister(lister_id).then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching products")
    })
    return result;
}