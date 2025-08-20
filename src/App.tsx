import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  
  // Enhanced scroll animations with smoother transforms
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 8]);

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

  const smoothScrollTo = (targetId: string, durationMs = 1200) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const nav = document.querySelector('nav') as HTMLElement | null;
    const navHeight = nav?.offsetHeight ?? 0;
    const extraOffset = 8; // small breathing room

    const startY = window.scrollY;
    const targetY = window.scrollY + target.getBoundingClientRect().top - navHeight - extraOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    // Smooth easing function for better scroll experience
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const easedProgress = easeInOutCubic(t);
      window.scrollTo(0, startY + distance * easedProgress);
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50"
        style={{ 
          opacity: headerOpacity, 
          scale: headerScale,
          backdropFilter: `blur(${headerBlur}px)`
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.8 }
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-red-600">Prime Trans Group</div>
            
            {/* Desktop Menu */}
            <motion.div 
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, staggerChildren: 0.1 }}
            >
              {['home', 'about', 'services', 'industries', 'contact'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  onClick={(e) => handleNavClick(e, item)} 
                  className="text-gray-700 hover:text-red-600 transition-colors relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + (index * 0.1),
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item === 'home' ? 'Home' : 
                   item === 'about' ? 'About' :
                   item === 'services' ? 'Services' :
                   item === 'industries' ? 'Industries' : 'Contact'}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden py-4 border-t border-gray-200 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="flex flex-col space-y-2"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  {['home', 'about', 'services', 'industries', 'contact'].map((item, index) => (
                    <motion.a 
                      key={item}
                      href={`#${item}`} 
                      onClick={(e) => handleNavClick(e, item)} 
                      className="px-2 py-2 text-gray-700 hover:text-red-600 transition-colors capitalize"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }
                        }
                      }}
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item === 'home' ? 'Home' : 
                       item === 'about' ? 'About' :
                       item === 'services' ? 'Services' :
                       item === 'industries' ? 'Industries' : 'Contact'}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 reveal scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 mb-8 lg:mb-0"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.68, -0.55, 0.265, 1.55]
                }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Menu</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                Hi, We're<br />
                <span className="text-red-600">Prime Trans Group</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                Your trusted staffing partner since 2016
              </motion.p>
              
              <motion.p 
                className="text-gray-700 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                High level experience in staffing solutions and employment services, providing quality workforce to meet your business needs.
              </motion.p>
              
              <motion.button 
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.5,
                  ease: [0.68, -0.55, 0.265, 1.55]
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(220, 38, 38, 0.3)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
              
              <motion.div 
                className="flex items-center gap-2 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <motion.div 
                  className="w-6 h-1 bg-red-500 rounded"
                  animate={{ 
                    scaleX: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <motion.span 
                  className="text-sm text-gray-600"
                  animate={{ 
                    y: [0, -3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Scroll down
                </motion.span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 80, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >

                    {/* //profile image section */}
                <motion.div
                className="relative group"
                onMouseEnter={() => setIsSpinning(true)}
                onMouseLeave={() => setIsSpinning(false)}
                onClick={() => setIsSpinning((v) => !v)}
                aria-label="Profile image interactive area"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                initial={{ opacity: 0, scale: 0.5, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ willChange: 'transform' }}
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
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 2.0,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="text-red-600 font-semibold">Since 2016</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white reveal scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              About Us
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our introduction
            </motion.p>
          </motion.div>
          
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-8 h-80 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Users size={80} className="text-red-600 mx-auto mb-4" />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold text-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      Trusted Staffing Partner
                    </motion.h3>
                  </div>
                </motion.div>
              </motion.div>
            
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.p 
                  className="text-gray-700 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Since 2016, Prime Group has been dedicated to providing quality staffing solutions tailored to our clients' needs. We specialize in competitive employment and e-commerce services, ensuring you have access to experienced and reliable staff when you need them most.
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-3 gap-8 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="text-2xl font-bold text-red-600">08+</div>
                    <div className="text-sm text-gray-600">Years of<br />experience</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <div className="text-2xl font-bold text-red-600">500+</div>
                    <div className="text-sm text-gray-600">Completed<br />placements</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    <div className="text-2xl font-bold text-red-600">24/7</div>
                    <div className="text-sm text-gray-600">Support<br />available</div>
                  </motion.div>
                </motion.div>
                
                <motion.button 
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.button>
              </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Why Choose Us / Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 reveal">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Why Choose Us
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our commitment to excellence
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="bg-white p-1 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Quality Standards</span>
                  <span className="text-red-600 font-semibold">100%</span>
                </div>
                <motion.div 
                  className="bg-gray-200 rounded-lg h-2 mx-4 mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '100%'}}></div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-1 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Pre-screening Process</span>
                  <span className="text-red-600 font-semibold">95%</span>
                </div>
                <motion.div 
                  className="bg-gray-200 rounded-lg h-2 mx-4 mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '95%'}}></div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-1 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Rapid Fulfillment</span>
                  <span className="text-red-600 font-semibold">90%</span>
                </div>
                <motion.div 
                  className="bg-gray-200 rounded-lg h-2 mx-4 mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.0 }}
                >
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '90%'}}></div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-1 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <span className="font-medium text-gray-700">Client Satisfaction</span>
                  <span className="text-red-600 font-semibold">98%</span>
                </div>
                <motion.div 
                  className="bg-gray-200 rounded-lg h-2 mx-4 mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <div className="bg-red-500 h-2 rounded-lg" style={{width: '98%'}}></div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">Quality over Quantity</h4>
                  <p className="text-gray-600 text-sm">We never take an order unless we can fulfill it at the highest standard</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">Extensive Pre-screening</h4>
                  <p className="text-gray-600 text-sm">Background checks, reference verification, and skills testing</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rapid Fulfillment</h4>
                  <p className="text-gray-600 text-sm">Our large database allows us to provide staff at short notice</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">Flexible Agreements</h4>
                  <p className="text-gray-600 text-sm">Non-binding, no upfront commitments, opt-out anytime</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white reveal scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              End-to-end staffing solutions
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <motion.div 
                className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4"
                variants={{
                  hidden: { scale: 0, rotate: -180 },
                  show: { 
                    scale: 1, 
                    rotate: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.68, -0.55, 0.265, 1.55]
                    }
                  }
                }}
              >
                <Users className="text-red-600" size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Candidate Sourcing</h3>
              <p className="text-gray-600">Finding the right candidates for your roles with thorough screening</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Forklift Testing</h3>
              <p className="text-gray-600">In-house forklift testing centre with certified instructors</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Background Checks</h3>
              <p className="text-gray-600">Criminal background checks and reference verification when required</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Payroll Management</h3>
              <p className="text-gray-600">Complete payroll services including taxes, WSIB management</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <HardHat className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Safety Training</h3>
              <p className="text-gray-600">Health & safety training including WHMIS, CPR, and certifications</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Transportation</h3>
              <p className="text-gray-600">Ride accommodations and transportation solutions when necessary</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 reveal scroll-mt-24">
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
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-24">
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

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Footer */}
      <motion.footer 
        className="bg-red-600 text-white py-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Prime Group. All rights reserved. Your trusted staffing partner since 2016.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;