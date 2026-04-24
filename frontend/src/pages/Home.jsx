import { Search, MapPin, ChevronDown } from 'lucide-react';

const Home = () => {
  const avatars = [
    'https://i.pravatar.cc/100?img=1',
    'https://i.pravatar.cc/100?img=2',
    'https://i.pravatar.cc/100?img=3',
    'https://i.pravatar.cc/100?img=4',
    'https://i.pravatar.cc/100?img=5',
  ];

  const filters = ['English speaking', 'Hospital Type', 'Within 10km'];

  return (
    <div className="flex flex-col items-center justify-center pt-12 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Medical care, <span className="text-primary-blue">wherever you travel</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Find the best hospitals and doctors across the globe with support in your language. 
          Your health, our priority, anywhere in the world.
        </p>
      </div>

      {/* Search Box Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-3 mb-10 border border-gray-50">
        <div className="flex flex-col md:flex-row items-center gap-2">
          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-blue-50 transition-colors group">
            <MapPin className="text-primary-blue" size={22} />
            <input 
              type="text" 
              placeholder="Search by city, hospital or specialty..." 
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Use My Location Button */}
          <button className="flex items-center gap-2 px-5 py-3 text-primary-blue font-semibold hover:bg-blue-50 rounded-2xl transition-all whitespace-nowrap">
            <span className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></span>
            Use My Location
          </button>

          {/* Search Button */}
          <button className="w-full md:w-auto bg-primary-blue text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-primary-hover hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2">
            <Search size={20} />
            Search
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
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
    </div>
  );
};

export default Home;
