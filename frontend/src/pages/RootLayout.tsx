import { Outlet } from "react-router-dom";
import MainNav from "../components/main-nav/MainNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const RootLayout = () => {
    return ( 
        <>
            <MainNav />
            <ToastContainer />
            {/* <main style={{width:"100%",maxWidth:"70rem",margin:"2rem auto"}}> */}
            <main style={{width:"100%",maxWidth:"70rem",margin:"5rem auto"}}>
                <Outlet />
            </main>
        </>
     );
}
 
export default RootLayout;