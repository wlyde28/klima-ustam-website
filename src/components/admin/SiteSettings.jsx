import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Phone, Mail, MapPin, Clock, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, Save, Upload, Image, Palette, Type, Layout, Shield, Bell, Database, Code } from 'lucide-react'

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    // Site Genel Bilgileri
    siteName: '',
    siteDescription: '',
    siteKeywords: '',
    siteLogo: '',
    siteFavicon: '',
    
    // İletişim Bilgileri
    phone: '',
    email: '',
    address: '',
    workingHours: '',
    whatsapp: '',
    
    // Sosyal Medya
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    
    // Tema Ayarları
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#F59E0B',
    backgroundColor: '#F8FAFC',
    textColor: '#1F2937',
    
    // Header Ayarları
    headerStyle: 'modern',
    showContactInfo: true,
    showSocialMedia: true,
    stickyHeader: true,
    
    // Footer Ayarları
    footerText: '',
    showFooterSocial: true,
    showFooterContact: true,
    
    // SEO Ayarları
    metaTitle: '',
    metaDescription: '',
    googleAnalytics: '',
    googleTagManager: '',
    
    // Bildirim Ayarları
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Güvenlik Ayarları
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'Genel', icon: Settings },
    { id: 'contact', name: 'İletişim', icon: Phone },
    { id: 'social', name: 'Sosyal Medya', icon: Globe },
    { id: 'theme', name: 'Tema', icon: Palette },
    { id: 'layout', name: 'Düzen', icon: Layout },
    { id: 'seo', name: 'SEO', icon: Code },
    { id: 'notifications', name: 'Bildirimler', icon: Bell },
    { id: 'security', name: 'Güvenlik', icon: Shield }
  ]

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('siteSettings') || '{}')
      setSettings(prev => ({ ...prev, ...data }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      localStorage.setItem('siteSettings', JSON.stringify(settings))
      showNotification('Ayarlar başarıyla kaydedildi', 'success')
    } catch (err) {
      setError(err.message)
      showNotification('Ayarlar kaydedilirken hata oluştu', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (file, field) => {
    try {
      // Dosya yükleme simülasyonu - gerçek uygulamada dosya sunucuya yüklenecek
       const fileUrl = URL.createObjectURL(file)
       setSettings(prev => ({ ...prev, [field]: fileUrl }))
       showNotification('Dosya başarıyla yüklendi', 'success')
    } catch (err) {
      showNotification('Dosya yüklenirken hata oluştu', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Adı</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => updateSetting('siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => updateSetting('siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelimeler</label>
        <input
          type="text"
          value={settings.siteKeywords}
          onChange={(e) => updateSetting('siteKeywords', e.target.value)}
          placeholder="kelime1, kelime2, kelime3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Logosu</label>
          <div className="flex items-center space-x-4">
            {settings.siteLogo && (
              <img src={settings.siteLogo} alt="Logo" className="w-16 h-16 object-contain border rounded" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'siteLogo')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
          <div className="flex items-center space-x-4">
            {settings.siteFavicon && (
              <img src={settings.siteFavicon} alt="Favicon" className="w-8 h-8 object-contain border rounded" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'siteFavicon')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderContactTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => updateSetting('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => updateSetting('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
        <textarea
          value={settings.address}
          onChange={(e) => updateSetting('address', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Saatleri</label>
          <input
            type="text"
            value={settings.workingHours}
            onChange={(e) => updateSetting('workingHours', e.target.value)}
            placeholder="Pazartesi - Cuma: 09:00 - 18:00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
          <input
            type="tel"
            value={settings.whatsapp}
            onChange={(e) => updateSetting('whatsapp', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Facebook className="w-4 h-4 inline mr-2" />
            Facebook
          </label>
          <input
            type="url"
            value={settings.facebook}
            onChange={(e) => updateSetting('facebook', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Twitter className="w-4 h-4 inline mr-2" />
            Twitter
          </label>
          <input
            type="url"
            value={settings.twitter}
            onChange={(e) => updateSetting('twitter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Instagram className="w-4 h-4 inline mr-2" />
            Instagram
          </label>
          <input
            type="url"
            value={settings.instagram}
            onChange={(e) => updateSetting('instagram', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Linkedin className="w-4 h-4 inline mr-2" />
            LinkedIn
          </label>
          <input
            type="url"
            value={settings.linkedin}
            onChange={(e) => updateSetting('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Youtube className="w-4 h-4 inline mr-2" />
          YouTube
        </label>
        <input
          type="url"
          value={settings.youtube}
          onChange={(e) => updateSetting('youtube', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )

  const renderThemeTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ana Renk</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => updateSetting('primaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => updateSetting('primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">İkincil Renk</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => updateSetting('secondaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={settings.secondaryColor}
              onChange={(e) => updateSetting('secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vurgu Rengi</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => updateSetting('accentColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={settings.accentColor}
              onChange={(e) => updateSetting('accentColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Arkaplan Rengi</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => updateSetting('backgroundColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={settings.backgroundColor}
              onChange={(e) => updateSetting('backgroundColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metin Rengi</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.textColor}
              onChange={(e) => updateSetting('textColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={settings.textColor}
              onChange={(e) => updateSetting('textColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderLayoutTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Header Stili</label>
        <select 
          value={settings.headerStyle} 
          onChange={(e) => updateSetting('headerStyle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="modern">Modern</option>
          <option value="classic">Klasik</option>
          <option value="minimal">Minimal</option>
          <option value="bold">Kalın</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">İletişim Bilgilerini Göster</label>
          <input
            type="checkbox"
            checked={settings.showContactInfo}
            onChange={(e) => updateSetting('showContactInfo', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Sosyal Medya Linklerini Göster</label>
          <input
            type="checkbox"
            checked={settings.showSocialMedia}
            onChange={(e) => updateSetting('showSocialMedia', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Sabit Header</label>
          <input
            type="checkbox"
            checked={settings.stickyHeader}
            onChange={(e) => updateSetting('stickyHeader', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Footer Metni</label>
        <textarea
          value={settings.footerText}
          onChange={(e) => updateSetting('footerText', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Footer'da Sosyal Medya Göster</label>
          <input
            type="checkbox"
            checked={settings.showFooterSocial}
            onChange={(e) => updateSetting('showFooterSocial', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Footer'da İletişim Bilgileri Göster</label>
          <input
            type="checkbox"
            checked={settings.showFooterContact}
            onChange={(e) => updateSetting('showFooterContact', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )

  const renderSeoTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Başlık</label>
        <input
          type="text"
          value={settings.metaTitle}
          onChange={(e) => updateSetting('metaTitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Açıklama</label>
        <textarea
          value={settings.metaDescription}
          onChange={(e) => updateSetting('metaDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
        <input
          type="text"
          value={settings.googleAnalytics}
          onChange={(e) => updateSetting('googleAnalytics', e.target.value)}
          placeholder="GA-XXXXXXXXX-X"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google Tag Manager ID</label>
        <input
          type="text"
          value={settings.googleTagManager}
          onChange={(e) => updateSetting('googleTagManager', e.target.value)}
          placeholder="GTM-XXXXXXX"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">E-posta Bildirimleri</label>
            <p className="text-xs text-gray-500">Yeni mesajlar ve yorumlar için e-posta bildirimi al</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">SMS Bildirimleri</label>
            <p className="text-xs text-gray-500">Acil durumlar için SMS bildirimi al</p>
          </div>
          <input
            type="checkbox"
            checked={settings.smsNotifications}
            onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Push Bildirimleri</label>
            <p className="text-xs text-gray-500">Tarayıcı bildirimleri al</p>
          </div>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Bakım Modu</label>
            <p className="text-xs text-gray-500">Site bakım modunda olduğunda ziyaretçiler bakım sayfasını görür</p>
          </div>
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => updateSetting('maintenanceMode', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Kayıt Olma İzni</label>
            <p className="text-xs text-gray-500">Yeni kullanıcıların kayıt olmasına izin ver</p>
          </div>
          <input
            type="checkbox"
            checked={settings.allowRegistration}
            onChange={(e) => updateSetting('allowRegistration', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">E-posta Doğrulama Gerekli</label>
            <p className="text-xs text-gray-500">Yeni kullanıcılar e-posta adreslerini doğrulamalı</p>
          </div>
          <input
            type="checkbox"
            checked={settings.requireEmailVerification}
            onChange={(e) => updateSetting('requireEmailVerification', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab()
      case 'contact': return renderContactTab()
      case 'social': return renderSocialTab()
      case 'theme': return renderThemeTab()
      case 'layout': return renderLayoutTab()
      case 'seo': return renderSeoTab()
      case 'notifications': return renderNotificationsTab()
      case 'security': return renderSecurityTab()
      default: return renderGeneralTab()
    }
  }

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Hata: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Site Ayarları
                </h1>
                <p className="text-gray-600">Sitenizin tüm ayarlarını buradan yönetebilirsiniz</p>
              </div>
            </div>
            
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          activeTab === tab.id ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {(() => {
                    const activeTabData = tabs.find(tab => tab.id === activeTab)
                    const Icon = activeTabData?.icon || Settings
                    return (
                      <>
                        <Icon className="w-5 h-5" />
                        <span>{activeTabData?.name || 'Genel'}</span>
                      </>
                    )
                  })()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTabContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteSettings