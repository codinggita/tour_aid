import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import HospitalList from './pages/HospitalList';

// Temporary placeholder components
const Emergency = () => <div className="p-8"><h2 className="text-2xl font-bold">Emergency Services</h2><p className="text-gray-500 mt-2">Quick access to emergency help.</p></div>;
const About = () => <div className="p-8"><h2 className="text-2xl font-bold">About TourAid</h2><p className="text-gray-500 mt-2">Your medical companion on the go.</p></div>;

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-doctor" element={<HospitalList />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
