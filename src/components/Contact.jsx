import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [buttonSettings, setButtonSettings] = useState({
    primaryButton: {
      backgroundColor: '#10b981',
      hoverBackgroundColor: '#059669',
      textColor: '#ffffff',
      text: 'Hemen Ara'
    },
    whatsappButton: {
      backgroundColor: '#10b981',
      hoverBackgroundColor: '#059669',
      textColor: '#ffffff',
      text: 'WhatsApp\'tan İletişime Geç'
    },
    contactButton: {
      backgroundColor: '#10b981',
      hoverBackgroundColor: '#059669',
      textColor: '#ffffff',
      text: 'Hemen Ara'
    }
  })

  useEffect(() => {
    fetchContactInfo()
    loadButtonSettings()

    // Listen for button settings changes
    const handleButtonSettingsChange = (event) => {
      const settings = event.detail
      setButtonSettings({
        primaryButton: settings.primaryButton || buttonSettings.primaryButton,
        whatsappButton: settings.whatsappButton || buttonSettings.whatsappButton,
        contactButton: settings.contactButton || buttonSettings.contactButton
      })
    }

    window.addEventListener('buttonSettingsChanged', handleButtonSettingsChange)
    return () => {
      window.removeEventListener('buttonSettingsChanged', handleButtonSettingsChange)
    }
  }, [])

  const loadButtonSettings = () => {
    try {
      const savedSettings = localStorage.getItem('buttonSettings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setButtonSettings({
          primaryButton: settings.primaryButton || buttonSettings.primaryButton,
          whatsappButton: settings.whatsappButton || buttonSettings.whatsappButton,
          contactButton: settings.contactButton || buttonSettings.contactButton
        })
      }
    } catch (error) {
      console.error('Buton ayarları yüklenirken hata:', error)
    }
  }

  const fetchContactInfo = async () => {
    try {
      const settings = JSON.parse(localStorage.getItem('settings') || '{}')
      if (Object.keys(settings).length === 0) {
        // Varsayılan veriler
        setContactInfo({
          phone: '0532 123 4567',
          email: 'info@klimaservisi.com',
          address: 'İstanbul, Türkiye',
          whatsapp: '0532 123 4567',
          working_hours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
          map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1592.4771052572469!2d35.24682840000863!3d37.03473810871451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1528885b2c1bac11%3A0xb11001afa620569c!2zWcO8esO8bmPDvHnEsWwsIDg1MDEyLiBTay4sIDAxMTcwIMOHdWt1cm92YS9BZGFuYQ!5e0!3m2!1str!2str!4v1754778948230!5m2!1str!2str'
        })
      } else {
        setContactInfo({
          phone: settings.contact_phone || '0532 123 4567',
          email: settings.contact_email || 'info@klimaservisi.com',
          address: settings.contact_address || 'İstanbul, Türkiye',
          whatsapp: settings.contact_phone || '0532 123 4567',
          working_hours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
          map_url: settings.map_url
        })
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
      // Fallback data
      setContactInfo({
        phone: '0532 123 4567',
        email: 'info@klimaservisi.com',
        address: 'İstanbul, Türkiye',
        whatsapp: '0532 123 4567',
        working_hours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
        map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1592.4771052572469!2d35.24682840000863!3d37.03473810871451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1528885b2c1bac11%3A0xb11001afa620569c!2zWcO8esO8bmPDvHnEsWwsIDg1MDEyLiBTay4sIDAxMTcwIMOHdWt1cm92YS9BZGFuYQ!5e0!3m2!1str!2str!4v1754778948230!5m2!1str!2str'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // LocalStorage'dan mevcut mesajları al
      const currentMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
      
      // Yeni mesaj oluştur
      const newMessage = {
        id: Math.max(...currentMessages.map(m => m.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        is_read: false,
        created_at: new Date().toISOString()
      }
      
      // Mesajı ekle ve localStorage'a kaydet
      const updatedMessages = [...currentMessages, newMessage]
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages))
      
      setSubmitMessage('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.')
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Mesaj gönderilirken bir hata oluştu. Lütfen telefon ile iletişime geçin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openWhatsApp = () => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}')
    const phoneNumber = settings.whatsapp_phone || settings.contact_phone || '0532 123 4567'
    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    window.open(`https://wa.me/90${cleanPhone}`, '_blank')
  }

  const callPhone = () => {
    window.open(`tel:${contactInfo?.phone}`, '_self')
  }

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Yükleniyor...</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Klima ihtiyaçlarınız için bizimle iletişime geçin. Size en uygun çözümü sunalım.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
                      <p className="text-gray-600">{contactInfo?.phone}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto transition-all duration-300"
                        style={{
                          color: buttonSettings.contactButton.backgroundColor
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = buttonSettings.contactButton.hoverBackgroundColor
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = buttonSettings.contactButton.backgroundColor
                        }}
                        onClick={callPhone}
                      >
                        {buttonSettings.contactButton.text}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                      <p className="text-gray-600">{contactInfo?.whatsapp}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto transition-all duration-300"
                        style={{
                          color: buttonSettings.whatsappButton.backgroundColor
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = buttonSettings.whatsappButton.hoverBackgroundColor
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = buttonSettings.whatsappButton.backgroundColor
                        }}
                        onClick={openWhatsApp}
                      >
                        WhatsApp'tan Yaz
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">E-posta</h4>
                      <p className="text-gray-600">{contactInfo?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Adres</h4>
                      <p className="text-gray-600">{contactInfo?.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h4>
                      <p className="text-gray-600">{contactInfo?.working_hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={callPhone}
                  className="w-full py-3 text-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: buttonSettings.primaryButton.backgroundColor,
                    color: buttonSettings.primaryButton.textColor
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = buttonSettings.primaryButton.hoverBackgroundColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = buttonSettings.primaryButton.backgroundColor
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {buttonSettings.primaryButton.text}
                </Button>
                <Button 
                  onClick={openWhatsApp}
                  className="w-full py-3 text-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: buttonSettings.whatsappButton.backgroundColor,
                    color: buttonSettings.whatsappButton.textColor
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = buttonSettings.whatsappButton.hoverBackgroundColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = buttonSettings.whatsappButton.backgroundColor
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {buttonSettings.whatsappButton.text}
                </Button>
              </div>
            </div>

            {/* Map */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Konum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <iframe
                    src={contactInfo?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2441!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890"}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Konum Haritası"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

