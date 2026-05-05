import { useState, useEffect } from 'react';
import { Phone, MapPin, Star, ChevronDown, Navigation, SlidersHorizontal, X } from 'lucide-react';
import hospitalService from '../services/hospitalService';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
};

const HospitalList = () => {
  const [openNow, setOpenNow] = useState(false);
  const [filters, setFilters] = useState({
    language: 'English',
    rating: null,
    specialty: '',
    sortBy: 'Closest',
    lat: null,
    lng: null,
    city: ''
  });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchHospitalsData = async () => {
      try {
        setLoading(true);
        const data = await hospitalService.getHospitals(filters);
        setHospitals(data);
        setError(null);
      } catch (err) {
        setError('Failed to load facilities. Please try again later.');
        console.error("Error fetching hospitals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalsData();
  }, [filters]);

  const handleUseLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => setFilters(prev => ({ ...prev, lat: position.coords.latitude, lng: position.coords.longitude, city: '' })),
        () => setFilters(prev => ({ ...prev, city: 'Delhi', lat: null, lng: null }))
      );
    } else {
      setFilters(prev => ({ ...prev, city: 'Delhi', lat: null, lng: null }));
    }
  };

  const clearFilters = () => {
    setFilters({ language: '', rating: null, specialty: '', sortBy: 'Closest', lat: null, lng: null, city: '' });
  };

  const getFilterText = () => {
    const parts = [];
    if (filters.language) parts.push(`${filters.language}-speaking`);
    if (filters.rating) parts.push(`${filters.rating}+ rated`);
    if (filters.specialty) parts.push(filters.specialty);
    return parts.length ? `Showing ${parts.join(', ')} hospitals` : 'Showing all hospitals';
  };

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button onClick={handleUseLocation} className="text-xs font-bold text-primary-blue hover:underline flex items-center gap-1">
          <Navigation size={12} /> Use My Location
        </button>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Language</h3>
        <div className="relative group">
          <select
            value={filters.language}
            onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium pr-8 focus:outline-none focus:border-primary-blue cursor-pointer"
          >
            <option value="English">English speaking</option>
            <option value="Hindi">Hindi speaking</option>
            <option value="Gujarati">Gujarati speaking</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-blue pointer-events-none" />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Specialties */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Specialties</h3>
        <div className="relative">
          <select
            value={filters.specialty}
            onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium pr-8 focus:outline-none focus:border-primary-blue cursor-pointer">
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Oncology">Oncology</option>
            <option value="Neurology">Neurology</option>
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
              onClick={() => setFilters(prev => ({ ...prev, rating: filters.rating === rating ? null : rating }))}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${
                filters.rating === rating
                  ? 'bg-primary-blue text-white border-primary-blue shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-blue hover:text-primary-blue'
              }`}
            >
              <Star size={12} className={filters.rating === rating ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />
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

      <button onClick={clearFilters} className="w-full py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-70px-4rem)]">

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden">
        <button
          id="mobile-filter-toggle"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-2xl shadow-sm font-semibold text-gray-700 hover:border-primary-blue hover:text-primary-blue transition-all"
        >
          <SlidersHorizontal size={18} />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          {showMobileFilters ? <X size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Mobile Filter Panel */}
        {showMobileFilters && (
          <div className="mt-3 bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <FilterPanel />
          </div>
        )}
      </div>

      {/* LEFT SIDEBAR — Desktop only */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white rounded-2xl shadow-sm p-6 overflow-y-auto border border-gray-100 flex-col gap-6">
        <FilterPanel />
      </aside>

      {/* CENTER — Hospital Cards */}
      <main className="flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <p className="text-gray-500 font-medium text-sm sm:text-base">{getFilterText()}: <span className="text-gray-900 font-bold">{hospitals.length} facilities</span> found</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Sort by:
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:border-primary-blue cursor-pointer">
                <option value="Closest">Closest</option>
                <option value="Rating (High to Low)">Highest Rated</option>
                <option value="Lowest Fee">Lowest Fee</option>
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

        {!loading && !error && hospitals.length === 0 && (
          <div className="bg-gray-50 text-gray-500 p-8 rounded-xl text-center font-medium mt-4">
            No hospitals found for selected language
          </div>
        )}

        {!loading && !error && hospitals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
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

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Navigation size={13} className="text-primary-blue" />
                      {h.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-primary-blue" />
                      {h.location}
                    </span>
                  </div>

                  {/* Language & Specialty Tags */}
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

      {/* RIGHT — Map (xl+ only) */}
      <aside className="w-72 shrink-0 hidden xl:block rounded-2xl shadow-lg relative overflow-hidden border border-gray-100 z-0">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater
            center={filters.lat && filters.lng ? [filters.lat, filters.lng] : [20.5937, 78.9629]}
            zoom={filters.lat && filters.lng ? 11 : 4}
          />

          {hospitals.map(h => h.coordinates && (
            <Marker key={h.id} position={[h.coordinates.lat, h.coordinates.lng]}>
              <Popup>
                <div className="font-bold text-gray-900">{h.name}</div>
                <div className="text-xs font-semibold text-primary-blue mt-1">⭐ {h.rating} ({h.reviews} reviews)</div>
                <div className="text-xs text-gray-600 mt-1">{h.location}</div>
                <div className="text-xs font-extrabold text-gray-900 mt-1">Fee: {h.fee}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </aside>

    </div>
  );
};

export default HospitalList;
