import { useState } from 'react';
import { 
  AlertTriangle, Phone, Navigation, Shield, 
  MapPin, Clock, ArrowRight, Languages 
} from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { fetchEmergencyNumbers } from '../services/api';
import hospitalService from '../services/hospitalService';

const Emergency = () => {
  const { data: numbers, loading, error } = useFetch(fetchEmergencyNumbers);
  
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  const [selectedPhrase, setSelectedPhrase] = useState("I need a doctor");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");

  const translations = {
    "I need a doctor": { Hindi: "मुझे डॉक्टर की जरूरत है", Gujarati: "મારે ડૉક્ટરની જરૂર છે", French: "J'ai besoin d'un médecin" },
    "Where is the pharmacy?": { Hindi: "फार्मेसी कहाँ है?", Gujarati: "ફાર્મસી ક્યાં છે?", French: "Où est la pharmacie?" },
    "Call an ambulance": { Hindi: "एम्बुलेंस बुलाओ", Gujarati: "એમ્બ્યુલન્સ બોલાવો", French: "Appelez une ambulance" },
    "I am in pain": { Hindi: "मुझे दर्द हो रहा है", Gujarati: "મને પીડા થઈ રહી છે", French: "J'ai mal" }
  };
  const phrases = Object.keys(translations);
  const languages = ["Hindi", "Gujarati", "French"];

  const handleShareLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          setLocationError('');
          
          setLoadingHospitals(true);
          try {
            const hospitals = await hospitalService.getHospitals({ lat, lng });
            setNearbyHospitals(hospitals.slice(0, 3));
          } catch (err) {
            console.error("Failed to fetch nearby hospitals", err);
          } finally {
            setLoadingHospitals(false);
          }
        },
        () => {
          setLocationError('Permission to access location was denied.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const emergencyTips = [
    { title: "Choking", desc: "Perform abdominal thrusts (Heimlich maneuver). If the person becomes unconscious, begin CPR." },
    { title: "Severe Bleeding", desc: "Apply direct continuous pressure to the wound with a clean cloth. Do not remove the cloth if it becomes soaked; add more layers." },
    { title: "Heart Attack", desc: "Have the person sit down, rest, and try to keep calm. Loosen any tight clothing. Call emergency services immediately." }
  ];

  return (
    <div className="min-h-screen bg-bg-light pb-12">
      {/* 1. Alert Header */}
      <div className="bg-red-50 border-b border-red-100 py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600 mt-1 flex-shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-red-700">Emergency Assistance</h1>
            <p className="text-red-600 mt-2">If you or someone else is in immediate danger or experiencing a severe medical emergency, please call local emergency services immediately.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-8">
        {/* 2. Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <a href={`tel:${numbers?.ambulance || '108'}`} className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl shadow-md transition-all flex flex-col items-center justify-center gap-3 h-32 group">
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Phone size={28} />
            </div>
            <span className="font-bold text-lg">Call Ambulance</span>
          </a>
          <a href={`tel:${numbers?.police || '100'}`} className="bg-primary-blue hover:bg-primary-hover text-white p-4 rounded-xl shadow-md transition-all flex flex-col items-center justify-center gap-3 h-32 group">
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Shield size={28} />
            </div>
            <span className="font-bold text-lg text-center leading-tight">Call Police</span>
          </a>
          <button onClick={handleShareLocation} className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 p-4 rounded-xl shadow-sm transition-all flex flex-col items-center justify-center gap-3 h-32 group relative">
            <div className="bg-blue-50 text-primary-blue p-3 rounded-full group-hover:scale-110 transition-transform">
              <MapPin size={28} />
            </div>
            <span className="font-semibold text-lg text-center leading-tight">Share My<br/>Location</span>
          </button>
        </div>

        {location && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-8 font-semibold flex items-center gap-2 border border-green-200 shadow-sm">
            <MapPin size={20} />
            Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        )}
        {locationError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 font-semibold flex items-center gap-2 border border-red-200 shadow-sm">
            <AlertTriangle size={20} />
            {locationError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 4. Nearby Hospitals */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Shield className="text-primary-blue" size={24} />
                  Nearby 24/7 Hospitals
                </h2>
                <button className="text-sm font-semibold text-primary-blue hover:underline">View Map</button>
              </div>
              <div className="space-y-4">
                {loadingHospitals ? (
                  <div className="p-4 bg-gray-50 rounded-xl text-gray-500 font-medium">Finding nearest hospitals...</div>
                ) : nearbyHospitals.length > 0 ? (
                  nearbyHospitals.map(hospital => (
                    <div key={hospital.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{hospital.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{hospital.specialties?.join(', ') || 'General Hospital'}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                            <MapPin size={14} className="text-gray-500" /> {hospital.distance || 'Near you'}
                          </span>
                        </div>
                      </div>
                      <a 
                        href={hospital.coordinates ? `https://www.google.com/maps?q=${hospital.coordinates.lat},${hospital.coordinates.lng}` : '#'} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-primary-blue border border-gray-200 px-6 py-2.5 rounded-full font-semibold transition-colors whitespace-nowrap flex justify-center text-center"
                      >
                        Get Directions
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-5 bg-gray-50 rounded-2xl text-gray-500 font-medium text-center border border-gray-100">
                    Share your location to find nearby hospitals.
                  </div>
                )}
              </div>
            </section>

            {/* 5. Emergency Tips */}
            <section>
              <h2 className="text-xl font-bold mb-4">Quick First-Aid Tips</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {emergencyTips.map((tip, idx) => (
                  <div key={idx} className="p-5">
                    <h3 className="font-bold text-red-600 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* 3. Emergency Contacts Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg mb-4">Emergency Numbers</h3>
              
              {loading && <p className="text-sm text-gray-500 font-medium">Loading numbers...</p>}
              {error && <p className="text-sm text-red-500 font-medium">Failed to load numbers</p>}
              
              {!loading && !error && numbers && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <div>
                      <p className="font-semibold text-gray-900">Ambulance</p>
                      <p className="text-lg font-bold text-red-600 mt-0.5">{numbers.ambulance}</p>
                    </div>
                    <button className="bg-red-50 text-red-600 p-3 rounded-full hover:bg-red-100 transition-colors">
                      <Phone size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <div>
                      <p className="font-semibold text-gray-900">Police</p>
                      <p className="text-lg font-bold text-primary-blue mt-0.5">{numbers.police}</p>
                    </div>
                    <button className="bg-blue-50 text-primary-blue p-3 rounded-full hover:bg-blue-100 transition-colors">
                      <Phone size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Fire Brigade</p>
                      <p className="text-lg font-bold text-orange-600 mt-0.5">{numbers.fire}</p>
                    </div>
                    <button className="bg-orange-50 text-orange-600 p-3 rounded-full hover:bg-orange-100 transition-colors">
                      <Phone size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Translator Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4 text-primary-blue">
                <Languages size={24} />
                <h3 className="font-bold text-lg text-gray-900">Medical Translator</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phrase</label>
                  <select 
                    value={selectedPhrase}
                    onChange={(e) => setSelectedPhrase(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-primary-blue"
                  >
                    {phrases.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Translate To</label>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-primary-blue"
                  >
                    {languages.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-2">
                  <p className="text-xs text-primary-blue font-bold uppercase tracking-wider mb-1">Translation</p>
                  <p className="text-lg font-bold text-gray-900">{translations[selectedPhrase][selectedLanguage]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
