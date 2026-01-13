import { Link } from "react-router-dom";
import MainNav from "../components/main-nav/MainNav";

const ErrorPage = () => {
    return ( 
        <>
            <MainNav />
            <main style={{width:"100%",maxWidth:"70rem",margin:"5rem auto"}}>
                <h2>Page not found</h2>
                <p>
                    <Link to={"/"}>Click here to Go Home.</Link>
                </p>
            </main>
        </>
     );
}
 
export default ErrorPage;