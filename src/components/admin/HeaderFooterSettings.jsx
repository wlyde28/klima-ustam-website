import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, Upload, Palette, Settings, Type, Image } from 'lucide-react'

const HeaderFooterSettings = () => {
  const [settings, setSettings] = useState({
    header: {
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
    },
    footer: {
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
    }
  })

  const [activeTab, setActiveTab] = useState('header')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    // localStorage'dan ayarları yükle
    const savedSettings = localStorage.getItem('headerFooterSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = () => {
    try {
      localStorage.setItem('headerFooterSettings', JSON.stringify(settings))
      setNotification('Ayarlar başarıyla kaydedildi!')
      setTimeout(() => setNotification(''), 3000)
      
      // Sayfayı yenile ki değişiklikler görünsün
      window.location.reload()
    } catch (error) {
      setNotification('Ayarlar kaydedilirken hata oluştu!')
      setTimeout(() => setNotification(''), 3000)
    }
  }

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('header', 'logoUrl', e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetToDefaults = (section) => {
    const defaults = {
      header: {
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
      },
      footer: {
        backgroundColor: '#1f2937',
        textColor: '#ffffff',
        linkColor: '#60a5fa',
        linkHoverColor: '#93c5fd',
        borderColor: '#374151',
        copyrightTextColor: '#9ca3af',
        socialIconColor: '#60a5fa',
        socialIconHoverColor: '#93c5fd'
      }
    }
    
    setSettings(prev => ({
      ...prev,
      [section]: defaults[section]
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Header & Footer Ayarları</h2>
        <p className="text-gray-600">Site başlığı ve alt bilgi bölümlerinin görünümünü özelleştirin</p>
      </div>

      {notification && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {notification}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('header')}
          className={`pb-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'header'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4 inline mr-2" />
          Header Ayarları
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`pb-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'footer'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Palette className="w-4 h-4 inline mr-2" />
          Footer Ayarları
        </button>
      </div>

      {/* Header Settings */}
      {activeTab === 'header' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Ayarları */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Logo Ayarları
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Yükle
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {settings.header.logoUrl && (
                  <img src={settings.header.logoUrl} alt="Logo Preview" className="mt-2 h-12 object-contain" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Genişlik (px)
                  </label>
                  <input
                    type="number"
                    value={settings.header.logoWidth}
                    onChange={(e) => handleInputChange('header', 'logoWidth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Yükseklik (px)
                  </label>
                  <input
                    type="number"
                    value={settings.header.logoHeight}
                    onChange={(e) => handleInputChange('header', 'logoHeight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Renk Ayarları */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Renk Ayarları
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arka Plan Rengi
                </label>
                <input
                  type="color"
                  value={settings.header.backgroundColor}
                  onChange={(e) => handleInputChange('header', 'backgroundColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metin Rengi
                </label>
                <input
                  type="color"
                  value={settings.header.textColor}
                  onChange={(e) => handleInputChange('header', 'textColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navigasyon Metin Rengi
                </label>
                <input
                  type="color"
                  value={settings.header.navigationTextColor}
                  onChange={(e) => handleInputChange('header', 'navigationTextColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navigasyon Hover Rengi
                </label>
                <input
                  type="color"
                  value={settings.header.navigationHoverColor}
                  onChange={(e) => handleInputChange('header', 'navigationHoverColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Buton Renkleri */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Buton Renkleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon Butonu
                </label>
                <input
                  type="color"
                  value={settings.header.phoneButtonColor}
                  onChange={(e) => handleInputChange('header', 'phoneButtonColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Butonu
                </label>
                <input
                  type="color"
                  value={settings.header.whatsappButtonColor}
                  onChange={(e) => handleInputChange('header', 'whatsappButtonColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Butonu
                </label>
                <input
                  type="color"
                  value={settings.header.adminButtonColor}
                  onChange={(e) => handleInputChange('header', 'adminButtonColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Scroll Durumu Renkleri */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Scroll Durumu Renkleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scroll Arka Plan Rengi
                </label>
                <input
                  type="color"
                  value={settings.header.scrolledBackgroundColor}
                  onChange={(e) => handleInputChange('header', 'scrolledBackgroundColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scroll Metin Rengi
                </label>
                <input
                  type="color"
                  value={settings.header.scrolledTextColor}
                  onChange={(e) => handleInputChange('header', 'scrolledTextColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={() => resetToDefaults('header')} variant="outline">
              Varsayılana Sıfırla
            </Button>
          </div>
        </div>
      )}

      {/* Footer Settings */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          {/* Logo Ayarları */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Logo Ayarları
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Logo Dosyası Seç
                 </label>
                 <input
                   type="file"
                   accept="image/*"
                   onChange={(e) => {
                     const file = e.target.files[0]
                     if (file) {
                       const reader = new FileReader()
                       reader.onload = (event) => {
                         handleInputChange('footer', 'logoUrl', event.target.result)
                       }
                       reader.readAsDataURL(file)
                     }
                   }}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {settings.footer.logoUrl && (
                   <div className="mt-2">
                     <img 
                       src={settings.footer.logoUrl} 
                       alt="Footer Logo Preview" 
                       className="h-16 w-auto border border-gray-200 rounded"
                     />
                   </div>
                 )}
               </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Genişlik (px)
                </label>
                <input
                  type="number"
                  value={settings.footer.logoWidth}
                  onChange={(e) => handleInputChange('footer', 'logoWidth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Yükseklik (px)
                </label>
                <input
                  type="number"
                  value={settings.footer.logoHeight}
                  onChange={(e) => handleInputChange('footer', 'logoHeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temel Renkler */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Temel Renkler
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arka Plan Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.backgroundColor}
                  onChange={(e) => handleInputChange('footer', 'backgroundColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metin Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.textColor}
                  onChange={(e) => handleInputChange('footer', 'textColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kenarlık Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.borderColor}
                  onChange={(e) => handleInputChange('footer', 'borderColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telif Hakkı Metin Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.copyrightTextColor}
                  onChange={(e) => handleInputChange('footer', 'copyrightTextColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>

            {/* Link ve İkon Renkleri */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Link ve İkon Renkleri
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.linkColor}
                  onChange={(e) => handleInputChange('footer', 'linkColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Hover Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.linkHoverColor}
                  onChange={(e) => handleInputChange('footer', 'linkHoverColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sosyal Medya İkon Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.socialIconColor}
                  onChange={(e) => handleInputChange('footer', 'socialIconColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sosyal Medya İkon Hover Rengi
                </label>
                <input
                  type="color"
                  value={settings.footer.socialIconHoverColor}
                  onChange={(e) => handleInputChange('footer', 'socialIconHoverColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={() => resetToDefaults('footer')} variant="outline">
              Varsayılana Sıfırla
            </Button>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Ayarları Kaydet</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderFooterSettings