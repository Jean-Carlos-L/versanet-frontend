import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

function PageRoutes() {
   return (
      <BrowserRouter>
         <PublicRoutes />
         <PrivateRoutes />
      </BrowserRouter>
   )
}

export default PageRoutes