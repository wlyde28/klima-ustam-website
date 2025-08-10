import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Trash2, CheckCircle, XCircle } from 'lucide-react'

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('testimonials') || '[]')
      if (data.length === 0) {
        const defaultTestimonials = [
          { id: 1, name: 'Ahmet Yılmaz', comment: 'Çok memnun kaldım, hızlı ve kaliteli hizmet.', rating: 5, is_approved: true, created_at: new Date().toISOString() },
          { id: 2, name: 'Fatma Kaya', comment: 'Klimam artık çok daha iyi çalışıyor, teşekkürler.', rating: 5, is_approved: true, created_at: new Date().toISOString() },
          { id: 3, name: 'Mehmet Demir', comment: 'Profesyonel ekip, zamanında geldi.', rating: 4, is_approved: false, created_at: new Date().toISOString() }
        ]
        localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials))
        setTestimonials(defaultTestimonials)
      } else {
        setTestimonials(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleApproval = async (id, currentStatus) => {
    try {
      const currentTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const updatedTestimonials = currentTestimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, is_approved: !currentStatus } : testimonial
      )
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials))
      setTestimonials(updatedTestimonials)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      try {
        const currentTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
        const updatedTestimonials = currentTestimonials.filter(testimonial => testimonial.id !== id)
        localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials))
        setTestimonials(updatedTestimonials)
      } catch (err) {
        setError(err.message)
      }
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
      <h1 className="text-3xl font-bold mb-6">Müşteri Yorumları Yönetimi</h1>

      {testimonials.length === 0 ? (
        <p className="text-center text-gray-600">Henüz yorum bulunmamaktadır.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {testimonial.image_url && (
                    <img src={testimonial.image_url} alt={testimonial.author} className="w-16 h-16 object-cover rounded-full" />
                  )}
                  <div className="flex-grow">
                    <p className="text-lg font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 italic mb-2">"{testimonial.comment}"</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`approve-${testimonial.id}`}
                          checked={testimonial.is_approved}
                          onCheckedChange={() => handleToggleApproval(testimonial.id, testimonial.is_approved)}
                        />
                        <Label htmlFor={`approve-${testimonial.id}`}>
                          {testimonial.is_approved ? 'Onaylı' : 'Onay Bekliyor'}
                        </Label>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestimonialManagement


