import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }: LayoutProps): JSX.Element {
   return (
      <div className="flex flex-1 min-h-screen flex-grow flex-col bg-gray-100">
         <div className="flex">
            <ToastContainer />
            <Sidebar />
            <div className="w-full">{children}</div>
         </div>
         {/* <Footer /> */}
      </div>
   );
}

interface LayoutProps {
   children: React.ReactNode;
}

export default Layout;