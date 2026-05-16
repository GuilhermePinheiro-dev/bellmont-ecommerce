import { Link } from "@tanstack/react-router";
import LogoBellmont from "@/assets/img/logo-bellmont.png"

export const Logo = () => {
    return ( 
        <Link to="/" className="self-center">
            <img src={LogoBellmont} alt="Logo Bellmont" className="w-62.5 h-40"/>
        </Link>
     );
}
 