import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
