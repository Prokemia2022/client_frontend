export const useUserDashboardroute=(account_type,_id)=>{
    let route;
    if(account_type === 'client'){
        route = `/dashboard/client?uid=${_id}`
    }
    if(account_type === 'distributor'){
        route = `/dashboard/distributor?uid=${_id}`
    }
    if(account_type === 'manufacturer'){
        route = `/dashboard/manufacturer?uid=${_id}`
    }
    if(account_type === 'salesperson'){
        route = `/dashboard/salesperson?uid=${_id}`
    }
    return route;
}