import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Award, Clock, ThumbsUp } from 'lucide-react'

const About = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('settings') || '{}')
      if (Object.keys(data).length === 0) {
        // Varsayılan veriler
        setSettings({
          about_title: 'Hakkımızda',
          about_content: '15 yıllık tecrübemizle klima bakım, onarım ve montaj hizmetlerinde sektörün öncü firmalarından biriyiz. Müşteri memnuniyeti odaklı çalışma prensibimizle kaliteli hizmet sunuyoruz.'
        })
      } else {
        setSettings({
          about_title: data.site_title || 'Hakkımızda',
          about_content: data.site_description || '15 yıllık tecrübemizle klima bakım, onarım ve montaj hizmetlerinde sektörün öncü firmalarından biriyiz. Müşteri memnuniyeti odaklı çalışma prensibimizle kaliteli hizmet sunuyoruz.'
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      // Fallback data
      setSettings({
        about_title: 'Hakkımızda',
        about_content: '15 yıllık tecrübemizle klima bakım, onarım ve montaj hizmetlerinde sektörün öncü firmalarından biriyiz. Müşteri memnuniyeti odaklı çalışma prensibimizle kaliteli hizmet sunuyoruz.'
      })
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      icon: Users,
      number: '1000+',
      label: 'Mutlu Müşteri',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Award,
      number: '15',
      label: 'Yıllık Tecrübe',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Hizmet',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: ThumbsUp,
      number: '%98',
      label: 'Memnuniyet',
      color: 'bg-purple-100 text-purple-600'
    }
  ]

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Yükleniyor...</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {settings?.about_title || 'Hakkımızda'}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {settings?.about_content || '15 yıllık tecrübemizle klima bakım, onarım ve montaj hizmetlerinde sektörün öncü firmalarından biriyiz. Müşteri memnuniyeti odaklı çalışma prensibimizle kaliteli hizmet sunuyoruz.'}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Çalışma Prensiplerimiz</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Müşteri memnuniyeti odaklı hizmet anlayışı</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Kaliteli malzeme ve orijinal yedek parça kullanımı</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Uzman teknisyen kadrosu ile profesyonel hizmet</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Uygun fiyat ve şeffaf ücretlendirme</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Hızlı ve güvenilir servis anlayışı</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Image/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-full">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Sertifikalarımız</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-900">Klima Teknisyeni Sertifikası</h4>
                      <p className="text-sm text-gray-600">Mesleki Yeterlilik Kurumu</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-900">İş Güvenliği Sertifikası</h4>
                      <p className="text-sm text-gray-600">Çalışma ve Sosyal Güvenlik Bakanlığı</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-900">Çevre Sertifikası</h4>
                      <p className="text-sm text-gray-600">Çevre ve Şehircilik Bakanlığı</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.color} mb-4`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

