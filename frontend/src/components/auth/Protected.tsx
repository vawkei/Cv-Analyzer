import type React from "react";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { Navigate } from "react-router-dom";



export const ProtectedRoute:React.FC<{children:React.ReactNode}> = (props) => {
    
    const useTypedSelector: TypedUseSelectorHook<RootState>=useSelector;

    const {isLoggedIn} = useTypedSelector((state)=>state.auth);
    
    if(isLoggedIn){
       return props.children
    }else{
        return <Navigate to={"/auth"} replace />
    }
}
 
export const ShowWhenLoggedIn: React.FC<{children:React.ReactNode}> = (props)=>{

    const useTypedSelector : TypedUseSelectorHook<RootState>= useSelector;

    const {isLoggedIn} = useTypedSelector((state)=>state.auth);

    if(isLoggedIn){
        return props.children
    }else{
        return null
    }
};

export const ShowWhenLoggedOut:React.FC<{children:React.ReactNode}> = (props)=>{
    
    const useTypedSelector:TypedUseSelectorHook<RootState>=useSelector;
    const {isLoggedIn} = useTypedSelector((state)=>state.auth);

    if(isLoggedIn){
        return null
    }else{
        return props.children
    }
}