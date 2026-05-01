import { MapPin, Star, CheckCircle2, Clock, Phone, Navigation, ShieldCheck, Globe, Activity, HeartPulse, Info, Map, ChevronRight, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchHospitalById } from '../services/api';

const HospitalDetail = () => {
  const { id } = useParams();
  const { data: hospital, loading, error } = useFetch(() => fetchHospitalById(id || 1), [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 font-bold text-gray-600">Loading details...</span>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl font-bold">
          Failed to load hospital details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner Section */}
      <div className="relative rounded-3xl overflow-hidden h-96 mb-8 shadow-sm border border-gray-100 group">
        <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-md">
              <ShieldCheck size={14} /> Verified Facility
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-md">
              <Star size={14} className="fill-amber-400 text-amber-400" /> {hospital.rating} Top Rated
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{hospital.name}</h1>
          <div className="flex items-center gap-2 text-gray-200 text-sm font-medium">
            <MapPin size={16} className="text-blue-400" />
            {hospital.address}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* Overview Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info size={20} className="text-primary-blue" /> Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Global Health Medical Center is a premier, multi-specialty facility dedicated to providing world-class healthcare for international travelers and local residents. Equipped with state-of-the-art technology and staffed by internationally trained specialists, we ensure the highest standards of medical care in a comfortable, patient-centric environment.
            </p>
          </div>

          {/* Medical Specialties (Grid) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Activity size={20} className="text-primary-blue" /> Medical Specialties
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(hospital.specialties?.length ? hospital.specialties : ['General']).map((spec) => (
                <div key={spec} className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50 hover:border-primary-blue/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-primary-blue shrink-0">
                    <HeartPulse size={18} />
                  </div>
                  <span className="font-semibold text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Spoken (Tags) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe size={20} className="text-primary-blue" /> Languages Spoken
            </h2>
            <div className="flex flex-wrap gap-3">
              {(hospital.languages?.length ? hospital.languages : ['English']).map((lang) => (
                <span key={lang} className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors cursor-default">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Patient Services (List) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-primary-blue" /> Patient Services
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {['24/7 Emergency Care', 'International Insurance Accepted', 'Dedicated Translator', 'Airport Transfers', 'Pharmacy On-site', 'VIP Recovery Rooms'].map((service) => (
                <div key={service} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          {/* Status Card & Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className={`flex items-center gap-3 mb-6 ${hospital.openNow ? 'bg-green-50 border-green-100' : 'bg-gray-100 border-gray-200'} p-4 rounded-xl`}>
              <div className={`w-3 h-3 rounded-full ${hospital.openNow ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-gray-400'}`}></div>
              <div>
                <p className={`${hospital.openNow ? 'text-green-700' : 'text-gray-700'} font-bold`}>{hospital.openNow ? 'Open Now' : 'Closed'}</p>
                <p className={`${hospital.openNow ? 'text-green-600' : 'text-gray-500'} text-xs font-medium`}>{hospital.openNow ? 'Currently receiving patients' : 'Check visiting hours'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 bg-primary-blue text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary-hover transition-all shadow-sm hover:shadow-md">
                <Navigation size={18} /> Navigate Now
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-primary-blue py-3.5 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all border border-blue-100">
                <Phone size={18} /> Call Hospital
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-5 uppercase text-xs tracking-wider">Contact & Hours</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Visiting Hours</p>
                  <p className="text-sm text-gray-500 mt-0.5">10:00 AM - 8:00 PM Daily</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Emergency Contact</p>
                  <p className="text-sm text-primary-blue font-bold mt-0.5">{hospital.contactNumber || '+33 1 23 45 67 89'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Website</p>
                  <p className="text-sm text-primary-blue font-bold mt-0.5 hover:underline cursor-pointer">{hospital.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview Card */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 h-48 relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-blue-50/50" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 20px)' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary-blue border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <MapPin size={18} className="text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity border border-gray-100">
               <div className="flex items-center gap-2">
                 <Map size={16} className="text-primary-blue" />
                 <span className="text-xs font-bold text-gray-800">View larger map</span>
               </div>
               <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Concierge Help Card */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <h3 className="font-bold text-white mb-2 text-lg relative z-10">Need Assistance?</h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed relative z-10">Our medical concierge is ready to help you coordinate your visit and answer any questions.</p>
            <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow flex items-center justify-center gap-2 relative z-10">
              <Calendar size={16} className="text-primary-blue" /> Request Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
