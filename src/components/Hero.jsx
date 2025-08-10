import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, CheckCircle } from 'lucide-react'

const Hero = () => {
  const [heroImage, setHeroImage] = useState(null)
  const [buttonSettings, setButtonSettings] = useState({
    heroCallButton: {
      backgroundColor: '#10b981',
      hoverBackgroundColor: '#059669',
      textColor: '#ffffff',
      text: 'Hemen Ara'
    },
    heroWhatsappButton: {
      backgroundColor: '#10b981',
      hoverBackgroundColor: '#059669',
      textColor: '#ffffff',
      text: 'WhatsApp'
    }
  })

  useEffect(() => {
    const loadHeroImage = () => {
      try {
        const savedImages = localStorage.getItem('gallery_images')
        if (savedImages) {
          const allImages = JSON.parse(savedImages)
          const heroImages = allImages.filter(img => img.category === 'hero')
          if (heroImages.length > 0) {
            setHeroImage(heroImages[0]) // İlk hero resmini kullan
          }
        }
      } catch (error) {
        console.error('Hero resmi yüklenirken hata:', error)
      }
    }

    const loadButtonSettings = () => {
      try {
        const savedSettings = localStorage.getItem('buttonSettings')
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setButtonSettings({
            heroCallButton: settings.heroCallButton || buttonSettings.heroCallButton,
            heroWhatsappButton: settings.heroWhatsappButton || buttonSettings.heroWhatsappButton
          })
        }
      } catch (error) {
        console.error('Buton ayarları yüklenirken hata:', error)
      }
    }

    loadHeroImage()
    loadButtonSettings()

    // Listen for button settings changes
    const handleButtonSettingsChange = (event) => {
      const settings = event.detail
      setButtonSettings({
        heroCallButton: settings.heroCallButton || buttonSettings.heroCallButton,
        heroWhatsappButton: settings.heroWhatsappButton || buttonSettings.heroWhatsappButton
      })
    }

    window.addEventListener('buttonSettingsChanged', handleButtonSettingsChange)
    return () => {
      window.removeEventListener('buttonSettingsChanged', handleButtonSettingsChange)
    }
  }, [])
  const scrollToContact = () => {
    const element = document.getElementById('contact')
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
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block text-blue-600 typewriter">Klima Ustam</span>
                <span className="block text-blue-600">Profesyonel</span>
                <span className="block text-blue-600">Klima Servisi</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Klima bakım, onarım, tamir ve montaj hizmetlerinde 15 yıllık tecrübe. 
                Müşteri memnuniyeti odaklı çalışma prensibimizle kaliteli hizmet sunuyoruz.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">15 Yıllık Tecrübe</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">7/24 Hizmet</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Garantili İşçilik</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Uygun Fiyat</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: buttonSettings.heroCallButton.backgroundColor,
                  color: buttonSettings.heroCallButton.textColor
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = buttonSettings.heroCallButton.hoverBackgroundColor
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = buttonSettings.heroCallButton.backgroundColor
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                {buttonSettings.heroCallButton.text}
              </Button>
              <Button 
                size="lg" 
                onClick={openWhatsApp}
                className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: buttonSettings.heroWhatsappButton.backgroundColor,
                  color: buttonSettings.heroWhatsappButton.textColor
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = buttonSettings.heroWhatsappButton.hoverBackgroundColor
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = buttonSettings.heroWhatsappButton.backgroundColor
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {buttonSettings.heroWhatsappButton.text}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {heroImage ? (
                <div className="w-full h-[500px] relative">
                  <img
                    src={heroImage.url}
                    alt={heroImage.alt || heroImage.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  {/* Fallback content - hidden by default */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center absolute inset-0">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">❄️</div>
                      <h3 className="text-2xl font-bold">Profesyonel Klima Servisi</h3>
                      <p className="text-blue-100 mt-2">Güvenilir ve Kaliteli Hizmet</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[500px] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">❄️</div>
                    <h3 className="text-2xl font-bold">Profesyonel Klima Servisi</h3>
                    <p className="text-blue-100 mt-2">Güvenilir ve Kaliteli Hizmet</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">1000+ Mutlu Müşteri</p>
                  <p className="text-sm text-gray-600">Güvenilir hizmet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-blue-50/50 to-transparent -z-10"></div>
    </section>
  )
}

export default Hero

