import { useState, useEffect } from 'react'
import { Menu, X, Phone, MessageCircle, Settings, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '../assets/klima-ustam-logo.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerSettings, setHeaderSettings] = useState({
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    logoUrl: '',
    logoWidth: '150',
    logoHeight: '50',
    navigationTextColor: '#ffffff',
    navigationHoverColor: '#dbeafe',
    phoneButtonColor: '#3b82f6',
    whatsappButtonColor: '#22c55e',
    adminButtonColor: '#8b5cf6',
    scrolledBackgroundColor: '#ffffff',
    scrolledTextColor: '#374151'
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // localStorage'dan header ayarlarını yükle
    const savedSettings = localStorage.getItem('headerFooterSettings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      if (settings.header) {
        setHeaderSettings(settings.header)
      }
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const openWhatsApp = () => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}')
    const phoneNumber = settings.whatsapp_phone || settings.contact_phone || '0532 123 4567'
    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    window.open(`https://wa.me/90${cleanPhone}`, '_blank')
  }

  const callPhone = () => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}')
    const phoneNumber = settings.contact_phone || '0532 123 4567'
    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    window.location.href = `tel:+90${cleanPhone}`
  }

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 shadow-lg ${
        isScrolled 
          ? 'backdrop-blur-md border-b border-blue-100' 
          : ''
      }`}
      style={{
        backgroundColor: isScrolled 
          ? headerSettings.scrolledBackgroundColor + 'F2' // 95% opacity
          : headerSettings.backgroundColor,
        color: isScrolled 
          ? headerSettings.scrolledTextColor
          : headerSettings.textColor
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <img 
                src={headerSettings.logoUrl || logo} 
                alt="Klima Ustam Logo" 
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: headerSettings.logoWidth + 'px',
                  height: headerSettings.logoHeight + 'px'
                }}
              />
              <div className="absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {[
              { id: 'home', label: 'Ana Sayfa' },
              { id: 'services', label: 'Hizmetler' },
              { id: 'about', label: 'Hakkımızda' },
              { id: 'testimonials', label: 'Yorumlar' },
              { id: 'contact', label: 'İletişim' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                style={{
                  color: isScrolled 
                    ? headerSettings.scrolledTextColor
                    : headerSettings.navigationTextColor,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = isScrolled 
                    ? headerSettings.scrolledTextColor
                    : headerSettings.navigationHoverColor
                  e.target.style.backgroundColor = isScrolled 
                    ? headerSettings.navigationHoverColor + '20'
                    : headerSettings.navigationHoverColor + '30'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isScrolled 
                    ? headerSettings.scrolledTextColor
                    : headerSettings.navigationTextColor
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={callPhone}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 hover:shadow-md"
              style={{
                color: headerSettings.phoneButtonColor,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = headerSettings.phoneButtonColor + '20'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
              }}
            >
              <Phone className="w-4 h-4" />
              <span>Hemen Ara</span>
            </button>

          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              size="sm" 
              onClick={openWhatsApp}
              className="flex items-center space-x-2 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              style={{
                backgroundColor: headerSettings.whatsappButtonColor
              }}
              onMouseEnter={(e) => {
                const color = headerSettings.whatsappButtonColor
                const darkerColor = color.replace('#', '')
                const r = parseInt(darkerColor.substr(0,2), 16)
                const g = parseInt(darkerColor.substr(2,2), 16)
                const b = parseInt(darkerColor.substr(4,2), 16)
                e.target.style.backgroundColor = `rgb(${Math.max(0, r-30)}, ${Math.max(0, g-30)}, ${Math.max(0, b-30)})`
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = headerSettings.whatsappButtonColor
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              isScrolled 
                ? 'text-gray-700 hover:bg-blue-50' 
                : 'text-white hover:bg-white/20'
            }`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`md:hidden mt-4 pb-4 border-t pt-4 ${
            isScrolled ? 'border-blue-100' : 'border-white/20'
          }`}>
            <div className="flex flex-col space-y-2">
              {[
                { id: 'home', label: 'Ana Sayfa' },
                { id: 'services', label: 'Hizmetler' },
                { id: 'about', label: 'Hakkımızda' },
                { id: 'testimonials', label: 'Yorumlar' },
                { id: 'contact', label: 'İletişim' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isScrolled 
                      ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md' 
                      : 'text-blue-100 hover:text-blue-50 hover:bg-blue-600/30 hover:shadow-md'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={callPhone}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${
                  isScrolled 
                    ? 'hover:bg-blue-50 hover:shadow-md' 
                    : 'hover:bg-white/20 hover:shadow-md'
                }`}
                style={{
                  color: headerSettings.phoneButtonColor
                }}
              >
                <Phone className="w-4 h-4" />
                <span>Hemen Ara</span>
              </button>

              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                <Button 
                  size="sm" 
                  onClick={openWhatsApp}
                  className="flex items-center justify-center space-x-2 text-white transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  style={{
                    backgroundColor: headerSettings.whatsappButtonColor
                  }}
                  onMouseEnter={(e) => {
                    const color = headerSettings.whatsappButtonColor
                    const darkerColor = color.replace('#', '')
                    const r = parseInt(darkerColor.substr(0,2), 16)
                    const g = parseInt(darkerColor.substr(2,2), 16)
                    const b = parseInt(darkerColor.substr(4,2), 16)
                    e.target.style.backgroundColor = `rgb(${Math.max(0, r-30)}, ${Math.max(0, g-30)}, ${Math.max(0, b-30)})`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = headerSettings.whatsappButtonColor
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

