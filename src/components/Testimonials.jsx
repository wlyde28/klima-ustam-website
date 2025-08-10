import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const approvedTestimonials = data.filter(t => t.is_approved)
      if (approvedTestimonials.length === 0) {
        setTestimonials(fallbackTestimonials)
      } else {
        setTestimonials(approvedTestimonials.map(t => ({
          id: t.id,
          customer_name: t.name,
          customer_title: 'Müşteri',
          content: t.comment,
          rating: t.rating
        })))
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials(fallbackTestimonials)
    } finally {
      setLoading(false)
    }
  }

  const fallbackTestimonials = [
    {
      id: 1,
      customer_name: 'Ahmet Yılmaz',
      customer_title: 'Ev Sahibi',
      content: 'Klimamız arızalandığında hemen aradık. Aynı gün gelip sorunu çözdüler. Çok memnun kaldık, herkese tavsiye ederim.',
      rating: 5
    },
    {
      id: 2,
      customer_name: 'Fatma Demir',
      customer_title: 'İşletme Sahibi',
      content: 'Ofisimizde 5 adet klima montajı yaptırdık. İşçilik kalitesi ve temizlik konusunda çok titizler. Teşekkürler.',
      rating: 5
    },
    {
      id: 3,
      customer_name: 'Mehmet Kaya',
      customer_title: 'Ev Sahibi',
      content: 'Yıllardır klima bakımımızı yaptırıyoruz. Güvenilir ve uygun fiyatlı hizmet. Kesinlikle tavsiye ederim.',
      rating: 5
    },
    {
      id: 4,
      customer_name: 'Ayşe Özkan',
      customer_title: 'Ev Sahibi',
      content: 'Klima gaz dolumu için aradık. Çok hızlı ve profesyonel bir şekilde işlerini hallettiler. Fiyatları da uygun.',
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Yükleniyor...</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Müşteri Yorumları</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Müşterilerimizin memnuniyeti bizim için en önemli başarı göstergesidir.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-8"></div>
        </div>

        {testimonials.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {/* Main Testimonial Slider */}
            <div className="relative">
              <Card className="bg-white border-0 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                    
                    <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                      "{testimonials[currentIndex]?.content}"
                    </blockquote>
                    
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonials[currentIndex]?.rating || 5)}
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {testimonials[currentIndex]?.customer_name}
                      </h4>
                      {testimonials[currentIndex]?.customer_title && (
                        <p className="text-gray-600">
                          {testimonials[currentIndex].customer_title}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              {testimonials.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Additional Testimonials Grid */}
            {testimonials.length > 1 && (
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <Card key={testimonial.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        "{testimonial.content.length > 100 
                          ? testimonial.content.substring(0, 100) + '...' 
                          : testimonial.content}"
                      </p>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-900 text-sm">
                          {testimonial.customer_name}
                        </h5>
                        {testimonial.customer_title && (
                          <p className="text-gray-600 text-xs">
                            {testimonial.customer_title}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials

