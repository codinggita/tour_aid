import { 
  AlertTriangle, Phone, Navigation, Shield, 
  MapPin, Clock, ArrowRight, Languages 
} from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { fetchEmergencyNumbers } from '../services/api';

const Emergency = () => {
  const { data: numbers, loading, error } = useFetch(fetchEmergencyNumbers);
  const nearbyHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      distance: "1.2 km",
      time: "5 mins",
      type: "Level 1 Trauma Center"
    },
    {
      id: 2,
      name: "St. Jude's Medical Center",
      distance: "3.5 km",
      time: "12 mins",
      type: "24/7 Emergency Room"
    }
  ];

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
          <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl shadow-md transition-all flex flex-col items-center justify-center gap-3 h-32 group">
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Phone size={28} />
            </div>
            <span className="font-bold text-lg">Call Ambulance</span>
          </button>
          <button className="bg-primary-blue hover:bg-primary-hover text-white p-4 rounded-xl shadow-md transition-all flex flex-col items-center justify-center gap-3 h-32 group">
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Navigation size={28} />
            </div>
            <span className="font-bold text-lg text-center leading-tight">Find Nearest<br/>Hospital</span>
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 p-4 rounded-xl shadow-sm transition-all flex flex-col items-center justify-center gap-3 h-32 group">
            <div className="bg-blue-50 text-primary-blue p-3 rounded-full group-hover:scale-110 transition-transform">
              <MapPin size={28} />
            </div>
            <span className="font-semibold text-lg text-center leading-tight">Share My<br/>Location</span>
          </button>
        </div>

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
                {nearbyHospitals.map(hospital => (
                  <div key={hospital.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{hospital.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{hospital.type}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                          <MapPin size={14} className="text-gray-500" /> {hospital.distance}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                          <Clock size={14} className="text-amber-500" /> {hospital.time} away
                        </span>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-primary-blue border border-gray-200 px-6 py-2.5 rounded-full font-semibold transition-colors whitespace-nowrap flex justify-center">
                      Get Directions
                    </button>
                  </div>
                ))}
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

            {/* 6. Optional CTA to translator */}
            <div className="bg-gradient-to-br from-primary-blue to-blue-600 rounded-2xl shadow-md p-6 text-white">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Languages size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">Language Barrier?</h3>
              <p className="text-blue-100 text-sm mb-6">Connect with a live medical translator immediately to communicate with local emergency staff.</p>
              <button className="w-full bg-white text-primary-blue font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Connect Translator <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
