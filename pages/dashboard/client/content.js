import { UsedashboardContext } from "../../../components/Providers/dashboardContext";
import { Home } from "./Home"
import { Settings } from "./Settings";
import { Quotes } from "./quotes";
import { Samples } from "./samples";

export const Content=()=>{
    const {active_page} = UsedashboardContext();
    if (active_page == 'Home'){ 
        return ( <Home /> ) 
    }else if (active_page == 'Quotes'){ 
        return( <Quotes /> ) 
    }else if (active_page == 'Samples'){ 
        return( <Samples /> ) 
    }else if (active_page == 'Settings'){ 
        return( <Settings /> ) 
    }else{
        return( <Home />)
    }
}