import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Temporary placeholder components
const FindDoctor = () => <div><h2>Find a Doctor</h2><p>Search for specialists near you.</p></div>;
const Emergency = () => <div><h2>Emergency Services</h2><p>Quick access to emergency help.</p></div>;
const About = () => <div><h2>About TourAid</h2><p>Your medical companion on the go.</p></div>;

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/find-doctor" replace />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
