import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* TourAid Info */}
          <div>
            <h3 className="text-xl font-extrabold text-primary-blue mb-4">TourAid</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your trusted medical companion for international travel. We connect you with verified healthcare facilities worldwide, ensuring peace of mind wherever you go.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4 uppercase text-xs tracking-wider">Services</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/find-doctor" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Find a Hospital</Link></li>
              <li><Link to="/emergency" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Emergency Assistance</Link></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Medical Translators</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Travel Insurance Info</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4 uppercase text-xs tracking-wider">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4 uppercase text-xs tracking-wider">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary-blue mt-0.5 shrink-0" />
                <span className="text-sm text-gray-600">123 Innovation Drive, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary-blue shrink-0" />
                <span className="text-sm text-gray-600">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary-blue shrink-0" />
                <span className="text-sm text-gray-600">support@touraid.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Dark Bottom Bar */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TourAid. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
             <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
