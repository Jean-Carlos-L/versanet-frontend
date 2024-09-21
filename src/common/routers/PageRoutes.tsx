import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "../components/Layout";

function PageRoutes() {
   return (
      <BrowserRouter>
         <Layout>
            <PublicRoutes />
            <PrivateRoutes />
         </Layout>
      </BrowserRouter>
   )
}

export default PageRoutes