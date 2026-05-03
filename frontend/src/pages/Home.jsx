import { useState, useEffect } from 'react';
import { 
  Search, MapPin, ChevronDown, Stethoscope, HeartPulse, 
  Eye, Pill, Baby, Activity, Star, BadgeCheck 
} from 'lucide-react';
import hospitalService from '../services/hospitalService';

const Home = () => {
  const avatars = [
    'https://i.pravatar.cc/100?img=1',
    'https://i.pravatar.cc/100?img=2',
    'https://i.pravatar.cc/100?img=3',
    'https://i.pravatar.cc/100?img=4',
    'https://i.pravatar.cc/100?img=5',
  ];

  const filters = ['English speaking', 'Hospital Type', 'Within 10km'];

  const medicalNeeds = [
    { icon: <Stethoscope size={24} />, label: 'General Visit' },
    { icon: <HeartPulse size={24} />, label: 'Cardiology' },
    { icon: <Eye size={24} />, label: 'Eye Care' },
    { icon: <Pill size={24} />, label: 'Pharmacy' },
    { icon: <Baby size={24} />, label: 'Pediatrics' },
    { icon: <Activity size={24} />, label: 'Check-up' },
  ];

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationMessage, setLocationMessage] = useState('');

  const fetchHospitalsData = async (params = {}) => {
    try {
      setLoading(true);
      const data = await hospitalService.getHospitals(params);
      setHospitals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load facilities. Please try again later.');
      console.error("Error fetching hospitals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalsData({});
  }, []);

  const handleSearchClick = () => {
    setLocationMessage('');
    fetchHospitalsData({ city: searchText });
  };

  const handleUseLocation = () => {
    if ("geolocation" in navigator) {
      setLocationMessage('');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          setSearchText('');
          setLocationMessage('Showing nearby hospitals');
          fetchHospitalsData({ lat, lng });
        },
        (err) => {
          console.error("Error getting location:", err);
          setLocationMessage('Location access denied');
        }
      );
    } else {
      setLocationMessage('Location access denied');
    }
  };

  return (
    <div className="flex flex-col pt-12 pb-20 space-y-24">
      {/* Hero & Search Section */}
      <section className="flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Medical care, <span className="text-primary-blue">wherever you travel</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Find the best hospitals and doctors across the globe with support in your language. 
            Your health, our priority, anywhere in the world.
          </p>
        </div>

        {/* Search Box Container */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-3 mb-10 border border-gray-50">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-blue-50 transition-colors group">
              <MapPin className="text-primary-blue" size={22} />
              <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                placeholder="Search by city..." 
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
              />
            </div>
            <button 
              onClick={handleUseLocation}
              className="flex items-center gap-2 px-5 py-3 text-primary-blue font-semibold hover:bg-blue-50 rounded-2xl transition-all whitespace-nowrap">
              <span className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></span>
              Use My Location
            </button>
            <button 
              onClick={handleSearchClick}
              className="w-full md:w-auto bg-primary-blue text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-primary-hover hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2">
              <Search size={20} />
              Search
            </button>
          </div>
        </div>

        {locationMessage && (
          <div className={`mb-6 text-sm font-semibold ${locationMessage === 'Location access denied' ? 'text-red-500' : 'text-green-600'}`}>
            {locationMessage}
          </div>
        )}

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button 
              key={filter}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-primary-blue hover:text-primary-blue hover:bg-blue-50 transition-all shadow-sm group"
            >
              {filter}
              <ChevronDown size={16} className="text-gray-400 group-hover:text-primary-blue" />
            </button>
          ))}
        </div>

        {/* Social Proof */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex -space-x-3">
            {avatars.map((url, i) => (
              <img 
                key={i} 
                src={url} 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
              />
            ))}
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary-blue shadow-sm">
              +2M
            </div>
          </div>
          <p className="text-gray-500 font-medium">
            Used by <span className="text-gray-900 font-bold">2M+ travelers</span> worldwide
          </p>
        </div>
      </section>

      {/* Common Medical Needs Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Common Medical Needs</h2>
          <p className="text-gray-500 font-medium">Quick access to popular categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {medicalNeeds.map((need, i) => (
            <div 
              key={i}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-blue-50 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-blue-50 rounded-xl mb-4 text-primary-blue group-hover:bg-white transition-colors">
                {need.icon}
              </div>
              <span className="font-bold text-gray-700 text-sm text-center">{need.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Medical Facilities Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Medical Facilities</h2>
            <p className="text-gray-500 font-medium">Top-rated hospitals verified by TourAid</p>
          </div>
          <button className="text-primary-blue font-bold hover:underline">View All</button>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 font-semibold text-gray-600">Loading facilities...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium">
            Failed to load facilities. Please try again later.
          </div>
        )}

        {!loading && !error && hospitals.length === 0 && (
          <div className="bg-gray-50 text-gray-500 p-8 rounded-xl text-center font-medium">
            No hospitals found
          </div>
        )}

        {!loading && !error && hospitals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hospital) => (
              <div 
                key={hospital.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-50 group"
              >
                {/* Card Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Mocking verified for display purposes */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <BadgeCheck size={16} className="text-green-500" />
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Verified</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-amber-600">{hospital.rating}</span>
                    </div>
                  </div>

                  {location.lat && location.lng && hospital.distance !== undefined && hospital.distance !== null && (
                    <div className="flex items-center gap-1 mb-3 text-primary-blue">
                      <MapPin size={14} />
                      <span className="text-sm font-bold">{Number(hospital.distance).toFixed(1)} km away</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {hospital.specialties?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3.5 bg-white border-2 border-primary-blue text-primary-blue rounded-2xl font-bold hover:bg-primary-blue hover:text-white transition-all shadow-sm hover:shadow-blue-100">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
