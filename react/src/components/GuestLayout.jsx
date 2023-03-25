import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/context-provider";

export default function GuestLayout() {
    const { token } = useStateContext();

    if(token){
        return <Navigate to='/users' />
    }
    

    return(
        <div>
            
            <Outlet />
        </div>
    );
}