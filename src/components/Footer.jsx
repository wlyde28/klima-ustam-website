import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react'
import logo from '../assets/klima-ustam-logo.svg'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [footerSettings, setFooterSettings] = useState({
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    linkColor: '#60a5fa',
    linkHoverColor: '#93c5fd',
    borderColor: '#374151',
    copyrightTextColor: '#9ca3af',
    socialIconColor: '#60a5fa',
    socialIconHoverColor: '#93c5fd',
    logoUrl: '',
    logoWidth: '150',
    logoHeight: '50'
  })

  useEffect(() => {
    // localStorage'dan footer ayarlarını yükle
    const savedSettings = localStorage.getItem('headerFooterSettings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      if (settings.footer) {
        setFooterSettings(settings.footer)
      }
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWhatsApp = () => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}')
    const phoneNumber = settings.whatsapp_phone || settings.contact_phone || '0532 123 4567'
    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    window.open(`https://wa.me/90${cleanPhone}`, '_blank')
  }

  return (
    <footer 
      className="transition-colors duration-300"
      style={{
        backgroundColor: footerSettings.backgroundColor,
        color: footerSettings.textColor
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={footerSettings.logoUrl || logo} 
                alt="Klima Ustam" 
                style={{
                  width: footerSettings.logoUrl ? `${footerSettings.logoWidth}px` : 'auto',
                  height: footerSettings.logoUrl ? `${footerSettings.logoHeight}px` : '48px'
                }}
                className={footerSettings.logoUrl ? '' : 'h-12 w-auto'}
              />
            </div>
            <p 
              className="leading-relaxed"
              style={{ color: footerSettings.textColor }}
            >
              15 yıllık tecrübemizle klima bakım, onarım, tamir ve montaj hizmetlerinde 
              güvenilir çözüm ortağınız.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: footerSettings.socialIconColor + '20',
                  color: footerSettings.socialIconColor
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = footerSettings.socialIconHoverColor
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = footerSettings.socialIconColor + '20'
                  e.target.style.color = footerSettings.socialIconColor
                }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: footerSettings.socialIconColor + '20',
                  color: footerSettings.socialIconColor
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = footerSettings.socialIconHoverColor
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = footerSettings.socialIconColor + '20'
                  e.target.style.color = footerSettings.socialIconColor
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: footerSettings.socialIconColor + '20',
                  color: footerSettings.socialIconColor
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = footerSettings.socialIconHoverColor
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = footerSettings.socialIconColor + '20'
                  e.target.style.color = footerSettings.socialIconColor
                }}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 
              className="text-lg font-semibold"
              style={{ color: footerSettings.textColor }}
            >
              Hızlı Linkler
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="transition-colors"
                  style={{ color: footerSettings.linkColor }}
                  onMouseEnter={(e) => {
                    e.target.style.color = footerSettings.linkHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = footerSettings.linkColor
                  }}
                >
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="transition-colors"
                  style={{ color: footerSettings.linkColor }}
                  onMouseEnter={(e) => {
                    e.target.style.color = footerSettings.linkHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = footerSettings.linkColor
                  }}
                >
                  Hizmetler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="transition-colors"
                  style={{ color: footerSettings.linkColor }}
                  onMouseEnter={(e) => {
                    e.target.style.color = footerSettings.linkHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = footerSettings.linkColor
                  }}
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="transition-colors"
                  style={{ color: footerSettings.linkColor }}
                  onMouseEnter={(e) => {
                    e.target.style.color = footerSettings.linkHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = footerSettings.linkColor
                  }}
                >
                  Müşteri Yorumları
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="transition-colors"
                  style={{ color: footerSettings.linkColor }}
                  onMouseEnter={(e) => {
                    e.target.style.color = footerSettings.linkHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = footerSettings.linkColor
                  }}
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 
              className="text-lg font-semibold"
              style={{ color: footerSettings.textColor }}
            >
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2">
              <li style={{ color: footerSettings.textColor }}>Klima Bakım</li>
              <li style={{ color: footerSettings.textColor }}>Klima Onarım</li>
              <li style={{ color: footerSettings.textColor }}>Klima Montaj</li>
              <li style={{ color: footerSettings.textColor }}>Klima Gaz Dolumu</li>
              <li style={{ color: footerSettings.textColor }}>7/24 Acil Servis</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 
              className="text-lg font-semibold text-center"
              style={{ color: footerSettings.textColor }}
            >
              İletişim
            </h4>
            <div className="space-y-3 flex flex-col items-center">
              <div className="flex items-center space-x-3">
                <Phone 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: footerSettings.linkColor }}
                />
                <span style={{ color: footerSettings.textColor }}>0555 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: footerSettings.linkColor }}
                />
                <span style={{ color: footerSettings.textColor }}>info@klimaustam.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: footerSettings.linkColor }}
                />
                <span style={{ color: footerSettings.textColor }}>İstanbul, Türkiye</span>
              </div>
              <button 
                onClick={openWhatsApp}
                className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp'tan Ulaşın</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-12 pt-8"
          style={{ borderTop: `1px solid ${footerSettings.borderColor}` }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div 
              className="text-sm"
              style={{ color: footerSettings.copyrightTextColor }}
            >
              © {currentYear} Klima Ustam. Tüm hakları saklıdır. Durukan Medya
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="transition-colors"
                style={{ color: footerSettings.linkColor }}
                onMouseEnter={(e) => {
                  e.target.style.color = footerSettings.linkHoverColor
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = footerSettings.linkColor
                }}
              >
                Gizlilik Politikası
              </a>
              <a 
                href="#" 
                className="transition-colors"
                style={{ color: footerSettings.linkColor }}
                onMouseEnter={(e) => {
                  e.target.style.color = footerSettings.linkHoverColor
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = footerSettings.linkColor
                }}
              >
                Kullanım Şartları
              </a>
              <a 
                href="#" 
                className="transition-colors"
                style={{ color: footerSettings.linkColor }}
                onMouseEnter={(e) => {
                  e.target.style.color = footerSettings.linkHoverColor
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = footerSettings.linkColor
                }}
              >
                KVKK
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

