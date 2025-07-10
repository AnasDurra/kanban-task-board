import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 px-2 py-4 mb-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
