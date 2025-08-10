import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, XCircle } from 'lucide-react'

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    whatsapp_phone: '',
    whatsapp_link: '',
    facebook_link: '',
    instagram_link: '',
    twitter_link: '',
    color_palette: '',
    map_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('settings') || '{}')
      if (Object.keys(data).length === 0) {
        const defaultSettings = {
          site_title: 'Klima Servisi',
          site_description: 'Profesyonel klima bakım ve onarım hizmetleri',
          contact_phone: '0532 123 4567',
          contact_email: 'info@klimaservisi.com',
          contact_address: 'Yüzüncüyıl Mahallesi 85012 Sokak Çukurova/ADANA',
          whatsapp_phone: '0532 123 4567',
          whatsapp_link: 'https://wa.me/905321234567',
          facebook_link: 'https://facebook.com/klimaservisi',
          instagram_link: 'https://instagram.com/klimaservisi',
          twitter_link: 'https://twitter.com/klimaservisi',
          color_palette: 'blue',
          map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1592.4771052572469!2d35.24682840000863!3d37.03473810871451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1528885b2c1bac11%3A0xb11001afa620569c!2zWcO8esO8bmPDvHnEsWwsIDg1MDEyLiBTay4sIDAxMTcwIMOHdWt1cm92YS9BZGFuYQ!5e0!3m2!1str!2str!4v1754778948230!5m2!1str!2str'
        }
        localStorage.setItem('settings', JSON.stringify(defaultSettings))
        setSettings(defaultSettings)
      } else {
        setSettings(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    try {
      localStorage.setItem('settings', JSON.stringify(settings))
      setMessage('Ayarlar başarıyla kaydedildi!')
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Hata: {error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Site Ayarları</h1>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="siteTitle">Site Başlığı</Label>
              <Input
                id="siteTitle"
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Açıklaması</Label>
              <Textarea
                id="siteDescription"
                value={settings.site_description}
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Telefon</Label>
              <Input
                id="contactPhone"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">E-posta</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="contactAddress">Adres</Label>
              <Textarea
                id="contactAddress"
                value={settings.contact_address}
                onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="whatsappPhone">WhatsApp Numarası</Label>
              <Input
                id="whatsappPhone"
                value={settings.whatsapp_phone}
                onChange={(e) => setSettings({ ...settings, whatsapp_phone: e.target.value })}
                placeholder="0532 123 4567"
              />
            </div>
            <div>
              <Label htmlFor="whatsappLink">WhatsApp Linki</Label>
              <Input
                id="whatsappLink"
                value={settings.whatsapp_link}
                onChange={(e) => setSettings({ ...settings, whatsapp_link: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="facebookLink">Facebook Linki</Label>
              <Input
                id="facebookLink"
                value={settings.facebook_link}
                onChange={(e) => setSettings({ ...settings, facebook_link: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="instagramLink">Instagram Linki</Label>
              <Input
                id="instagramLink"
                value={settings.instagram_link}
                onChange={(e) => setSettings({ ...settings, instagram_link: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="twitterLink">Twitter Linki</Label>
              <Input
                id="twitterLink"
                value={settings.twitter_link}
                onChange={(e) => setSettings({ ...settings, twitter_link: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="colorPalette">Renk Paleti</Label>
              <Input
                id="colorPalette"
                value={settings.color_palette}
                onChange={(e) => setSettings({ ...settings, color_palette: e.target.value })}
                placeholder="#RRGGBB, #RRGGBB, ..."
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mapUrl">Harita URL'si (Google Maps Embed)</Label>
              <Textarea
                id="mapUrl"
                value={settings.map_url}
                onChange={(e) => setSettings({ ...settings, map_url: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                Google Maps'ten "Paylaş" → "Harita yerleştir" → "HTML'yi kopyala" seçeneğinden src URL'sini alın
              </p>
            </div>
          </div>
          <Button onClick={handleSaveSettings} className="mt-4">
            <Save className="w-4 h-4 mr-2" />Ayarları Kaydet
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsManagement


