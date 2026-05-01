import { useState } from 'react';
import { Phone, MapPin, Star, ChevronDown, Map, Navigation } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { fetchHospitals } from '../services/api';

const mapPins = [
  { id: 1, x: '25%', y: '35%', name: 'Global Health' },
  { id: 2, x: '55%', y: '50%', name: "St. Mary's" },
  { id: 3, x: '70%', y: '30%', name: 'Unity Advanced' },
  { id: 4, x: '40%', y: '65%', name: 'Meridian' },
];

const HospitalList = () => {
  const [openNow, setOpenNow] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [activePin, setActivePin] = useState(null);

  const { data: hospitalsData, loading, error } = useFetch(fetchHospitals);
  const hospitals = hospitalsData || [];

  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-70px-4rem)]">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 shrink-0 bg-white rounded-2xl shadow-sm p-6 overflow-y-auto border border-gray-100 flex flex-col gap-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>

        {/* Language */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Language</h3>
          <div className="flex flex-col gap-2">
            {['English', 'French', 'Spanish', 'German'].map(lang => (
              <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                  className="w-4 h-4 accent-primary-blue rounded"
                />
                <span className="text-sm text-gray-600 group-hover:text-primary-blue font-medium transition-colors">{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Specialties */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Specialties</h3>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium pr-8 focus:outline-none focus:border-primary-blue">
              <option value="">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="surgical">Surgical</option>
              <option value="oncology">Oncology</option>
              <option value="general">General</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Rating */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Minimum Rating</h3>
          <div className="flex flex-wrap gap-2">
            {[4, 4.5, 4.7, 4.9].map(rating => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${
                  selectedRating === rating
                    ? 'bg-primary-blue text-white border-primary-blue shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-blue hover:text-primary-blue'
                }`}
              >
                <Star size={12} className={selectedRating === rating ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />
                {rating}+
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Open Now Toggle */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700">Open Now</h3>
            <button
              onClick={() => setOpenNow(!openNow)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${openNow ? 'bg-primary-blue' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${openNow ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {openNow && (
            <p className="text-xs text-primary-blue font-semibold mt-2">Showing open facilities only</p>
          )}
        </div>

        <hr className="border-gray-100" />

        <button className="w-full py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
          Clear All Filters
        </button>
      </aside>

      {/* CENTER — Hospital Cards */}
      <main className="flex-1 overflow-y-auto pr-1">
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 font-medium"><span className="text-gray-900 font-bold">{hospitals.length} facilities</span> found near you</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Sort by:
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:border-primary-blue">
                <option>Closest</option>
                <option>Highest Rated</option>
                <option>Lowest Fee</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
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

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {hospitals.map((h) => (
              <div key={h.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-50 overflow-hidden transition-all group">
                {/* Card Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-gray-800">{h.rating}</span>
                    <span className="text-xs text-gray-400">({h.reviews})</span>
                  </div>
                  {/* Open / Closed Badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow ${h.openNow ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                    {h.openNow ? 'Open Now' : 'Closed'}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-2">{h.name}</h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Navigation size={13} className="text-primary-blue" />
                      {h.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-primary-blue" />
                      {h.location}
                    </span>
                  </div>

                  {/* Language Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {h.languages.map(lang => (
                      <span key={lang} className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-primary-blue rounded-md">
                        {lang}
                      </span>
                    ))}
                    {h.specialties.map(spec => (
                      <span key={spec} className="text-[11px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium">Consultation from</p>
                      <p className="text-lg font-extrabold text-gray-900">{h.fee}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-hover transition-all shadow-sm">
                      <Phone size={15} />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* RIGHT — Map Placeholder */}
      <aside className="w-72 shrink-0 hidden xl:block">
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-lg h-full relative overflow-hidden">
          {/* Map grid lines */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)' }}>
          </div>

          {/* Map label */}
          <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl">
            <Map size={16} className="text-white" />
            <span className="text-white text-sm font-bold">Live Map</span>
          </div>

          {/* Static Map Pins */}
          {mapPins.map(pin => (
            <div
              key={pin.id}
              style={{ left: pin.x, top: pin.y }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onMouseEnter={() => setActivePin(pin.id)}
              onMouseLeave={() => setActivePin(null)}
            >
              <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ${activePin === pin.id ? 'bg-amber-400 scale-125' : 'bg-primary-blue'}`}>
                <MapPin size={14} className="text-white fill-white" />
              </div>
              {activePin === pin.id && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-2 shadow-xl text-xs font-bold text-gray-800 whitespace-nowrap">
                  {pin.name}
                </div>
              )}
            </div>
          ))}

          {/* Bottom location tag */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow">
            <Navigation size={14} className="text-primary-blue" />
            <span className="text-sm font-bold text-gray-700">Paris, France</span>
          </div>
        </div>
      </aside>

    </div>
  );
};

export default HospitalList;
