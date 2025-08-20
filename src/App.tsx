import { useEffect, useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  CheckCircle, 
  Users, 
  Calendar, 
  Award,
  Truck,
  Settings,
  Package,
  HardHat,
  Menu,
  X
} from 'lucide-react';
import displayImage from './assets/displayImage.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const smoothScrollTo = (targetId: string, durationMs = 900) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const nav = document.querySelector('nav') as HTMLElement | null;
    const navHeight = nav?.offsetHeight ?? 0;
    const extraOffset = 8; // small breathing room

    const startY = window.scrollY;
    const targetY = window.scrollY + target.getBoundingClientRect().top - navHeight - extraOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    // Linear easing for constant speed throughout the scroll
    const linear = (t: number) => t;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const easedProgress = linear(t);
      window.scrollTo(0, startY + distance * easedProgress);
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId, 900);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-red-600">Prime Group</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-gray-700 hover:text-red-600 transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-700 hover:text-red-600 transition-colors">About</a>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-gray-700 hover:text-red-600 transition-colors">Services</a>
              <a href="#industries" onClick={(e) => handleNavClick(e, 'industries')} className="text-gray-700 hover:text-red-600 transition-colors">Industries</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="px-2 py-2 text-gray-700 hover:text-red-600 transition-colors">Home</a>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="px-2 py-2 text-gray-700 hover:text-red-600 transition-colors">About</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="px-2 py-2 text-gray-700 hover:text-red-600 transition-colors">Services</a>
                <a href="#industries" onClick={(e) => handleNavClick(e, 'industries')} className="px-2 py-2 text-gray-700 hover:text-red-600 transition-colors">Industries</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="px-2 py-2 text-gray-700 hover:text-red-600 transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 reveal">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Menu</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                Hi, We're<br />
                <span className="text-red-600">Prime Group</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Your trusted staffing partner since 2016
              </p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                High level experience in staffing solutions and employment services, providing quality workforce to meet your business needs.
              </p>
              
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Us
              </button>
              
              <div className="flex items-center gap-2 mt-8">
                <div className="w-6 h-1 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Scroll down</span>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">

                    {/* //profile image section */}
              <div
                className="relative group"
                onMouseEnter={() => setIsSpinning(true)}
                onMouseLeave={() => setIsSpinning(false)}
                onClick={() => setIsSpinning((v) => !v)}
                aria-label="Profile image interactive area"
              >
                {/* soft glow */}
                <div className="absolute inset-0 -z-10 rounded-full bg-red-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div
                  className={`w-72 h-72 lg:w-45 lg:h-45 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-700 ease-out group-hover:scale-105 ${isSpinning ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '8s' }}
                >
                  <div className="w-56 h-56 lg:w-64 lg:h-64 bg-white rounded-full flex items-center justify-center">
                    <img src={displayImage} alt="Profile" className="w-full h-full rounded-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <span className="text-red-600 font-semibold">Since 2016</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-gray-600">Our introduction</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <Users size={80} className="text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">Trusted Staffing Partner</h3>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Since 2016, Prime Group has been dedicated to providing quality staffing solutions tailored to our clients' needs. We specialize in competitive employment and e-commerce services, ensuring you have access to experienced and reliable staff when you need them most.
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">08+</div>
                  <div className="text-sm text-gray-600">Years of<br />experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">500+</div>
                  <div className="text-sm text-gray-600">Completed<br />placements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">24/7</div>
                  <div className="text-sm text-gray-600">Support<br />available</div>
                </div>
              </div>
              
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600">Our commitment to excellence</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-1 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Quality Standards</span>
                  <span className="text-red-600 font-semibold">100%</span>
                </div>
                <div className="bg-gray-200 rounded-lg h-2 mx-4 mb-4">
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '100%'}}></div>
                </div>
              </div>
              
              <div className="bg-white p-1 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Pre-screening Process</span>
                  <span className="text-red-600 font-semibold">95%</span>
                </div>
                <div className="bg-gray-200 rounded-lg h-2 mx-4 mb-4">
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '95%'}}></div>
                </div>
              </div>
              
              <div className="bg-white p-1 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Rapid Fulfillment</span>
                  <span className="text-red-600 font-semibold">90%</span>
                </div>
                <div className="bg-gray-200 rounded-lg h-2 mx-4 mb-4">
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '90%'}}></div>
                </div>
              </div>
              
              <div className="bg-white p-1 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Client Satisfaction</span>
                  <span className="text-red-600 font-semibold">98%</span>
                </div>
                <div className="bg-gray-200 rounded-lg h-2 mx-4 mb-4">
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '98%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Quality over Quantity</h4>
                  <p className="text-gray-600 text-sm">We never take an order unless we can fulfill it at the highest standard</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Extensive Pre-screening</h4>
                  <p className="text-gray-600 text-sm">Background checks, reference verification, and skills testing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Rapid Fulfillment</h4>
                  <p className="text-gray-600 text-sm">Our large database allows us to provide staff at short notice</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Flexible Agreements</h4>
                  <p className="text-gray-600 text-sm">Non-binding, no upfront commitments, opt-out anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">End-to-end staffing solutions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Candidate Sourcing</h3>
              <p className="text-gray-600">Finding the right candidates for your roles with thorough screening</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Forklift Testing</h3>
              <p className="text-gray-600">In-house forklift testing centre with certified instructors</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Background Checks</h3>
              <p className="text-gray-600">Criminal background checks and reference verification when required</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Payroll Management</h3>
              <p className="text-gray-600">Complete payroll services including taxes, WSIB management</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <HardHat className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Safety Training</h3>
              <p className="text-gray-600">Health & safety training including WHMIS, CPR, and certifications</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Transportation</h3>
              <p className="text-gray-600">Ride accommodations and transportation solutions when necessary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Industries & Roles</h2>
            <p className="text-gray-600">Skilled and general trades we cover</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Truck className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">Drivers</h4>
              <p className="text-sm text-gray-600 mt-2">G, DZ, AZ License holders</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Settings className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">Forklift Operators</h4>
              <p className="text-sm text-gray-600 mt-2">Counterbalance, Raymond Reach</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Package className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">Machine Operators</h4>
              <p className="text-sm text-gray-600 mt-2">Production & Manufacturing</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Users className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">Shippers/Receivers</h4>
              <p className="text-sm text-gray-600 mt-2">Warehouse & Logistics</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Settings className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">Production Workers</h4>
              <p className="text-sm text-gray-600 mt-2">Assembly & Quality Control</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <HardHat className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">General Labour</h4>
              <p className="text-sm text-gray-600 mt-2">Various Industries</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Award className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">Skilled Trades</h4>
              <p className="text-sm text-gray-600 mt-2">Professional Specialists</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <Package className="mx-auto text-red-600 mb-3" size={32} />
              <h4 className="font-semibold text-gray-800">More Roles</h4>
              <p className="text-sm text-gray-600 mt-2">Contact for specific needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rates & Terms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Rates & Terms</h2>
          <p className="text-gray-600 mb-12">Flexible and transparent pricing</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Service Rates</h3>
              <p className="text-red-600">Competitive % on top of wages</p>
            </div>
            
            <div className="bg-red-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Payment Terms</h3>
              <p className="text-red-600">Net 30 Days</p>
            </div>
            
            <div className="bg-red-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Agreement</h3>
              <p className="text-red-600">Flexible, non-binding<br />No upfront costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">Get in touch for your staffing needs</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Phone className="text-red-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">905-904-1590</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-red-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">staffing@primetransgroup.ca</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <MapPin className="text-red-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">7050 Bramalea Rd, Unit #14A<br />Mississauga, ON L5S 1T1</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Globe className="text-red-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Website</h4>
                  <p className="text-gray-600">www.primetransgroup.ca</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell us about your staffing needs..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Prime Group. All rights reserved. Your trusted staffing partner since 2016.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;