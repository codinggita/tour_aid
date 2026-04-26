import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="mx-auto px-8 max-w-[1400px]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
