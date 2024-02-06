import { UsedashboardContext } from "../../../components/Providers/dashboardContext";
import { Home } from "./Home";
import { Inventory } from "../../../components/ui/Dashboard/Inventory";
import { ViewProduct } from "../../../components/ui/Dashboard/Product/view";
import { New_Product } from "../../../components/ui/Dashboard/Product/new";
import Expert_Body from "../../../components/ui/Dashboard/experts";
import Distributors from "./distributors";
import { Settings } from "./settings";
import Pricing from "../../../components/ui/Dashboard/pricing";
import Edit_Product_Details from "../../../components/ui/Dashboard/Product/edit";

export const Content=()=>{
    const {active_page} = UsedashboardContext();
    if (active_page == 'Home'){ 
        return ( <Home/> ) 
    }else if (active_page == 'Inventory'){ 
        return( <Inventory/> ) 
    }else if (active_page == 'Experts'){ 
        return( <Expert_Body/> ) 
    }else if (active_page == 'Distributors'){ 
        return( <Distributors/> ) 
    }else if (active_page == 'Settings'){ 
        return( <Settings/> ) 
    }else if (active_page == 'Upgrade'){ 
        return( <Pricing/> ) 
    }else if (active_page == 'ViewProduct'){ 
        return( <ViewProduct/> ) 
    }else if (active_page == 'EditProduct'){ 
        return( <Edit_Product_Details/> ) 
    }else if (active_page == 'AddProduct'){ 
        return( <New_Product/> ) 
    }else{
        return( <Home/>)
    }
}