import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WhatsAppButton = () => {
  const [headerSettings, setHeaderSettings] = useState({
    whatsappButtonColor: '#22c55e'
  })

  useEffect(() => {
    const loadHeaderSettings = () => {
      try {
        const savedSettings = localStorage.getItem('headerFooterSettings')
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          if (settings.header) {
            setHeaderSettings(prev => ({
              ...prev,
              ...settings.header
            }))
          }
        }
      } catch (error) {
        console.error('Header ayarları yüklenirken hata:', error)
      }
    }

    loadHeaderSettings()
  }, [])

  const openWhatsApp = () => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}')
    const phoneNumber = settings.whatsapp_phone || settings.contact_phone || '0532 123 4567'
    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    const message = 'Merhaba, klima hizmetiniz hakkında bilgi almak istiyorum.'
    const whatsappUrl = `https://wa.me/90${cleanPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openWhatsApp}
        className="text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
        size="icon"
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
        <MessageCircle className="w-7 h-7" />
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        WhatsApp'tan yazın
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )
}

export default WhatsAppButton

