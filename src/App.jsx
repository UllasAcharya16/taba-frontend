import { useEffect, useState } from 'react'
import { BarChartIcon as ChartBar, Shield, TrendingUp, BarChart3, Menu, X, Users } from 'lucide-react'
import FileUploadModal from './components/FileUploadModal'
import AboutPage from './components/AboutPage'
import ResultsPage from './components/ResultsPage'
import React from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAboutPage, setShowAboutPage] = useState(false)
  const [showResultsPage, setShowResultsPage] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({
    unlabelled: null,
    fraudSeed: null,
    testData: null
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = document.querySelectorAll('section')
      let current = 0
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
          current = index
        }
      })
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]))
          } else {
            setVisibleElements(prev => {
              const newSet = new Set(prev)
              newSet.delete(entry.target.id)
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    // Function to observe elements
    const observeElements = () => {
      const animatedElements = document.querySelectorAll('[data-animate]')
      animatedElements.forEach(el => {
        observer.observe(el)
        // Check if element is already in viewport and add it immediately
        const rect = el.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
        if (isInViewport) {
          setVisibleElements(prev => new Set([...prev, el.id]))
        }
      })
    }

    // Initial observation
    observeElements()

    // Re-observe when coming back from other pages
    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [showAboutPage, showResultsPage])

  useEffect(() => {
    // Reset and re-check visible elements when returning to home page
    if (!showAboutPage && !showResultsPage) {
      const checkVisibleElements = () => {
        const animatedElements = document.querySelectorAll('[data-animate]')
        const newVisibleElements = new Set()
        
        animatedElements.forEach(el => {
          const rect = el.getBoundingClientRect()
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
          if (isInViewport) {
            newVisibleElements.add(el.id)
          }
        })
        
        setVisibleElements(newVisibleElements)
      }
      
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(checkVisibleElements, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [showAboutPage, showResultsPage])

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('section')
    sections[index]?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleDetectorClick = () => {
    setShowUploadModal(true)
  }

  const handleFileUploaded = (type, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }))
  }

  const handleDetectClick = () => {
    setShowUploadModal(false)
    setShowResultsPage(true)
  }

  const subtitleOpacity = Math.max(0, 1 - scrollY / 400)
  const subtitleTransform = `translateY(-${scrollY * 0.3}px)`

  if (showAboutPage) {
    return <AboutPage onBack={() => setShowAboutPage(false)} />
  }

  if (showResultsPage) {
    return <ResultsPage 
      onBack={() => setShowResultsPage(false)} 
      uploadedFiles={uploadedFiles}
    />
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        onAboutClick={() => setShowAboutPage(true)}
      />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center relative bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 pt-20">
          <div
            id="hero-title"
            data-animate
            className={`transition-all duration-1000 ease-out ${
              visibleElements.has('hero-title') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 tracking-wider mb-8">
              Welcome to TABA
            </h1>
          </div>
          
          <div
            id="hero-subtitle"
            data-animate
            className={`transition-all duration-1000 delay-300 ease-out ${
              visibleElements.has('hero-subtitle') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              opacity: Math.min(subtitleOpacity, visibleElements.has('hero-subtitle') ? 1 : 0),
              transform: `${subtitleTransform} ${visibleElements.has('hero-subtitle') ? 'translateY(0)' : 'translateY(40px)'}`
            }}
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Advanced Technology for Business Analytics - Transforming data into actionable insights 
              with cutting-edge machine learning and fraud detection capabilities
            </p>
          </div>
        </div>
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent transform rotate-12 scale-150"></div>
        </div>
      </section>

      {/* Content Sections */}
      <ContentSection
        id="analytics-section"
        title="Smart Data Analytics"
        description="TABA leverages advanced machine learning algorithms to analyze complex datasets and uncover hidden patterns. Our platform provides real-time insights that help businesses make informed decisions."
        additionalText="With intuitive dashboards and powerful visualization tools, you can transform raw data into meaningful insights that drive growth and innovation."
        icon={<ChartBar className="w-12 h-12" />}
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        reverse={false}
        isVisible={visibleElements.has('analytics-section')}
      />

      <ContentSection
        id="fraud-section"
        title="Advanced Fraud Detection"
        description="Our sophisticated fraud detection system uses artificial intelligence to identify suspicious activities and protect your business from fraudulent transactions."
        additionalText="Machine learning models continuously adapt and improve, learning from new fraud patterns to provide enhanced security for your operations."
        icon={<Shield className="w-12 h-12" />}
        imageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        reverse={true}
        isVisible={visibleElements.has('fraud-section')}
      />

      <ContentSection
        id="intelligence-section"
        title="Business Intelligence"
        description="Transform your business operations with our comprehensive business intelligence suite. TABA provides predictive analytics and performance metrics."
        additionalText="Our platform integrates seamlessly with existing systems, providing a unified view of your business performance across all departments."
        icon={<TrendingUp className="w-12 h-12" />}
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1415&q=80"
        reverse={false}
        isVisible={visibleElements.has('intelligence-section')}
      />

      {/* Detector Section */}
      <section 
        id="detector-section"
        data-animate
        className="min-h-screen flex items-center py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ease-out ${
              visibleElements.has('detector-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-16 tracking-wide">
              TABA DETECTOR
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <DetectorCard
              onClick={handleDetectorClick}
              delay="delay-200"
              isVisible={visibleElements.has('detector-section')}
            />
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-gray-100 scale-125 shadow-lg shadow-gray-100/50' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <FileUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          uploadedFiles={uploadedFiles}
          onFileUploaded={handleFileUploaded}
          onDetectClick={handleDetectClick}
        />
      )}
    </div>
  )
}

function Navbar({ isMenuOpen, setIsMenuOpen, scrollToSection, activeSection, onAboutClick }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', index: 0 },
    { name: 'Analytics', index: 1 },
    { name: 'Security', index: 2 },
    { name: 'Intelligence', index: 3 },
    { name: 'Detector', index: 4 }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-gray-800/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-wider cursor-pointer hover:text-gray-300 transition-colors duration-300"
                onClick={() => scrollToSection(0)}>
              TABA
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.index)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-gray-100 ${
                    activeSection === item.index
                      ? 'text-gray-100 border-b-2 border-gray-400'
                      : 'text-gray-400 hover:border-b-2 hover:border-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={onAboutClick}
                className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-100 transition-all duration-300 hover:border-b-2 hover:border-gray-600 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                About
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-80 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md rounded-lg mt-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.index)}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 rounded-md ${
                  activeSection === item.index
                    ? 'text-gray-100 bg-gray-800'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/50'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={onAboutClick}
              className="block px-3 py-2 text-base font-medium w-full text-left text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 transition-all duration-300 rounded-md flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ContentSection({ id, title, description, additionalText, icon, imageUrl, reverse, isVisible }) {
  return (
    <section 
      id={id}
      data-animate
      className="min-h-screen flex items-center py-20 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
          <div className={`flex-1 space-y-6 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : `opacity-0 ${reverse ? 'translate-x-10' : '-translate-x-10'}`
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-gray-400 transition-all duration-500 hover:text-gray-300 hover:scale-110">
                {icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-wide">
                {title}
              </h2>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {description}
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              {additionalText}
            </p>
            
            <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-700 hover:w-32"></div>
          </div>

          <div className={`flex-1 transition-all duration-1000 delay-300 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : `opacity-0 ${reverse ? '-translate-x-10' : 'translate-x-10'}`
          }`}>
            <div className="relative group">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-gray-900/50"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl transition-opacity duration-500 group-hover:opacity-50"></div>
              
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetectorCard({ onClick, delay, isVisible }) {
  return (
    <div 
      onClick={onClick}
      className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-700/50 cursor-pointer transition-all duration-700 hover:scale-105 hover:bg-gradient-to-br hover:from-gray-700/50 hover:to-gray-800/50 hover:border-gray-600/50 hover:shadow-2xl hover:shadow-gray-900/50 ${delay} ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mb-8 mx-auto text-gray-100 group-hover:from-gray-500 group-hover:to-gray-700 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
        <BarChart3 className="w-10 h-10" />
      </div>
      
      <h3 className="text-3xl font-semibold text-gray-100 mb-6 group-hover:text-white transition-colors duration-300 text-center">
        Start Fraud Detection Analysis
      </h3>
      
      <p className="text-xl text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-center">
        Upload your training data, fraud cases, and test data to begin comprehensive fraud detection analysis with advanced machine learning algorithms.
      </p>
    </div>
  )
}
