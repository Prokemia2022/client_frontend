import { UsedashboardContext } from "../../../components/Providers/dashboardContext";
import Home from "./Home"
import Settings from "./Settings";
import Edit_Sale from "./components/ui/edit";
import New_Sale from "./components/ui/new_sale";
import ViewSale from "./components/ui/view";
import Sales from "./sales";

export default function Content(){
    const {active_page} = UsedashboardContext();
    if (active_page == 'Home'){ 
        return ( <Home /> ) 
    }else if (active_page == 'Sales'){ 
        return( <Sales /> ) 
    }else if (active_page == 'New_Sales'){ 
        return( <New_Sale /> ) 
    }else if (active_page == 'View_Sale'){ 
        return( <ViewSale /> ) 
    }else if (active_page == 'Edit_Sale'){ 
        return( <Edit_Sale /> ) 
    }else if (active_page == 'Settings'){ 
        return( <Settings /> ) 
    }else{
        return( <Home />)
    }
}