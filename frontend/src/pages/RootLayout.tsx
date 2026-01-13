import { Outlet } from "react-router-dom";
import MainNav from "../components/main-nav/MainNav";

const RootLayout = () => {
    return ( 
        <>
            <MainNav />
            <main style={{width:"100%",maxWidth:"70rem",margin:"2rem auto"}}>
                <Outlet />
            </main>
        </>
     );
}
 
export default RootLayout;