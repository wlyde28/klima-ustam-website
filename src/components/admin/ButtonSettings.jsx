import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, Palette, RefreshCw } from 'lucide-react'

const ButtonSettings = () => {
  const [settings, setSettings] = useState({
    primaryButton: {
      backgroundColor: '#10b981', // green-500
      hoverBackgroundColor: '#059669', // green-600
      textColor: '#ffffff',
      text: 'Hemen Ara'
    },
    secondaryButton: {
      backgroundColor: '#3b82f6', // blue-500
      hoverBackgroundColor: '#2563eb', // blue-600
      textColor: '#ffffff',
      text: 'İletişime Geç'
    },
    whatsappButton: {
      backgroundColor: '#22c55e', // green-500
      hoverBackgroundColor: '#16a34a', // green-600
      textColor: '#ffffff',
      text: 'WhatsApp'
    },
    contactButton: {
      backgroundColor: '#10b981', // green-500
      hoverBackgroundColor: '#059669', // green-600
      textColor: '#ffffff',
      text: 'İletişim'
    },
    heroCallButton: {
      backgroundColor: '#10b981', // green-500
      hoverBackgroundColor: '#059669', // green-600
      textColor: '#ffffff',
      text: 'Hemen Ara'
    },
    heroWhatsappButton: {
      backgroundColor: '#10b981', // green-500
      hoverBackgroundColor: '#059669', // green-600
      textColor: '#ffffff',
      text: 'WhatsApp'
    }
  })
  
  const [notification, setNotification] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('buttonSettings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error('Ayarlar yüklenirken hata:', error)
    }
  }

  const handleInputChange = (buttonType, field, value) => {
    setSettings(prev => ({
      ...prev,
      [buttonType]: {
        ...prev[buttonType],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      localStorage.setItem('buttonSettings', JSON.stringify(settings))
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('buttonSettingsChanged', {
        detail: settings
      }))
      
      setNotification('Buton ayarları başarıyla kaydedildi!')
      setTimeout(() => setNotification(''), 3000)
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error)
      setNotification('Ayarlar kaydedilirken bir hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  const resetToDefaults = () => {
    const defaultSettings = {
      primaryButton: {
        backgroundColor: '#10b981',
        hoverBackgroundColor: '#059669',
        textColor: '#ffffff',
        text: 'Hemen Ara'
      },
      secondaryButton: {
        backgroundColor: '#3b82f6',
        hoverBackgroundColor: '#2563eb',
        textColor: '#ffffff',
        text: 'İletişime Geç'
      },
      whatsappButton: {
        backgroundColor: '#22c55e',
        hoverBackgroundColor: '#16a34a',
        textColor: '#ffffff',
        text: 'WhatsApp'
      },
      contactButton: {
        backgroundColor: '#10b981',
        hoverBackgroundColor: '#059669',
        textColor: '#ffffff',
        text: 'İletişim'
      },
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
    }
    setSettings(defaultSettings)
  }

  const ButtonPreview = ({ buttonSettings, title }) => (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      <button
        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: buttonSettings.backgroundColor,
          color: buttonSettings.textColor
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = buttonSettings.hoverBackgroundColor
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = buttonSettings.backgroundColor
        }}
      >
        {buttonSettings.text}
      </button>
    </div>
  )

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Palette className="w-6 h-6 mr-2 text-blue-600" />
          Buton Ayarları
        </h2>
        <p className="text-gray-600">Site genelindeki butonların renklerini ve metinlerini özelleştirin</p>
      </div>

      {notification && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          {Object.entries(settings).map(([buttonType, buttonSettings]) => {
            const buttonTitles = {
              primaryButton: 'Ana Buton (Hemen Ara)',
              secondaryButton: 'İkincil Buton',
              whatsappButton: 'WhatsApp Butonu',
              contactButton: 'İletişim Butonu',
              heroCallButton: 'Hero Bölümü - Arama Butonu',
              heroWhatsappButton: 'Hero Bölümü - WhatsApp Butonu'
            }
            
            return (
              <Card key={buttonType} className="border-l-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">{buttonTitles[buttonType]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${buttonType}-text`} className="text-sm font-medium text-gray-700">
                      Buton Metni
                    </Label>
                    <Input
                      id={`${buttonType}-text`}
                      type="text"
                      value={buttonSettings.text}
                      onChange={(e) => handleInputChange(buttonType, 'text', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`${buttonType}-bg`} className="text-sm font-medium text-gray-700">
                        Arka Plan Rengi
                      </Label>
                      <input
                        id={`${buttonType}-bg`}
                        type="color"
                        value={buttonSettings.backgroundColor}
                        onChange={(e) => handleInputChange(buttonType, 'backgroundColor', e.target.value)}
                        className="mt-1 w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${buttonType}-hover`} className="text-sm font-medium text-gray-700">
                        Hover Rengi
                      </Label>
                      <input
                        id={`${buttonType}-hover`}
                        type="color"
                        value={buttonSettings.hoverBackgroundColor}
                        onChange={(e) => handleInputChange(buttonType, 'hoverBackgroundColor', e.target.value)}
                        className="mt-1 w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${buttonType}-text-color`} className="text-sm font-medium text-gray-700">
                        Metin Rengi
                      </Label>
                      <input
                        id={`${buttonType}-text-color`}
                        type="color"
                        value={buttonSettings.textColor}
                        onChange={(e) => handleInputChange(buttonType, 'textColor', e.target.value)}
                        className="mt-1 w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Önizleme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ButtonPreview buttonSettings={settings.primaryButton} title="Ana Buton" />
              <ButtonPreview buttonSettings={settings.secondaryButton} title="İkincil Buton" />
              <ButtonPreview buttonSettings={settings.whatsappButton} title="WhatsApp Butonu" />
              <ButtonPreview buttonSettings={settings.contactButton} title="İletişim Butonu" />
              <ButtonPreview buttonSettings={settings.heroCallButton} title="Hero - Arama Butonu" />
              <ButtonPreview buttonSettings={settings.heroWhatsappButton} title="Hero - WhatsApp Butonu" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <Button
          onClick={resetToDefaults}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Varsayılana Sıfırla</span>
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}</span>
        </Button>
      </div>
    </div>
  )
}

export default ButtonSettings