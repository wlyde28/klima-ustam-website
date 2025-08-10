import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wrench, Settings, Hammer, Droplets, ArrowRight } from 'lucide-react'

// Service icons mapping
const serviceIcons = {
  'Klima Bakım': Settings,
  'Klima Onarım': Wrench,
  'Klima Montaj': Hammer,
  'Klima Gaz Dolumu': Droplets
}

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('services') || '[]')
      if (data.length === 0) {
        // Varsayılan veriler
        const defaultServices = [
          {
            id: 1,
            title: 'Klima Bakım',
            description: 'Klimanızın uzun ömürlü olması ve verimli çalışması için düzenli bakım hizmeti sunuyoruz.',
            price: '150 TL'
          },
          {
            id: 2,
            title: 'Klima Onarım',
            description: 'Arızalı klimalarınızı hızlı ve güvenilir şekilde onarıyoruz.',
            price: '200 TL'
          },
          {
            id: 3,
            title: 'Klima Montaj',
            description: 'Yeni klima montajı için profesyonel hizmet sunuyoruz.',
            price: '300 TL'
          },
          {
            id: 4,
            title: 'Klima Gaz Dolumu',
            description: 'Klimanızın soğutma performansını artırmak için gaz dolumu hizmeti.',
            price: '180 TL'
          }
        ]
        localStorage.setItem('services', JSON.stringify(defaultServices))
        setServices(defaultServices)
      } else {
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-xl text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Klima bakım, onarım, montaj ve gaz dolumu hizmetlerinde profesyonel çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = serviceIcons[service.title] || Settings
            
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg flex flex-col h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  {service.price && (
                    <div className="text-2xl font-bold text-blue-600">
                      {service.price}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="text-center flex flex-col justify-between h-full">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </CardDescription>
                  <Button 
                    onClick={scrollToContact}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors mt-auto"
                  >
                    Hizmet Al
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Neden Klima Ustam?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Uzman Ekip</h4>
                <p className="text-gray-600">15 yıllık tecrübeli teknisyenlerimiz</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Kaliteli Malzeme</h4>
                <p className="text-gray-600">Orijinal yedek parça garantisi</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Hammer className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Hızlı Servis</h4>
                <p className="text-gray-600">Aynı gün hizmet imkanı</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services

