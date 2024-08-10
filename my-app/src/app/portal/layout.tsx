import Sidebar from "@/components/portal/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
