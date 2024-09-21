import Sidebar from "./SIdebar";

function Layout({ children }: LayoutProps): JSX.Element {
   return (
      <div className="flex flex-1 min-h-screen flex-grow flex-col bg-gray-800">
         <div className="flex">
            <Sidebar />
            <div className="p-3 w-full">{children}</div>
         </div>
         {/* <Footer /> */}
      </div>
   );
}

interface LayoutProps {
   children: React.ReactNode;
}

export default Layout;