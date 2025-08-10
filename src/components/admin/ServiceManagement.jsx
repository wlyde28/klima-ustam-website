import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react'

const ServiceManagement = () => {
  const [services, setServices] = useState([])
  const [editingService, setEditingService] = useState(null)
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    description: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('services') || '[]')
      if (data.length === 0) {
        const defaultServices = [
          { id: 1, title: 'Klima Bakım', description: 'Klimanızın uzun ömürlü olması ve verimli çalışması için düzenli bakım hizmeti sunuyoruz.', price: '150 TL', icon: 'wrench', image_url: '' },
          { id: 2, title: 'Klima Onarım', description: 'Arızalı klimalarınızı hızlı ve güvenilir şekilde onarıyoruz.', price: '200 TL', icon: 'tool', image_url: '' },
          { id: 3, title: 'Klima Montaj', description: 'Yeni klima montajı için profesyonel hizmet sunuyoruz.', price: '300 TL', icon: 'settings', image_url: '' },
          { id: 4, title: 'Klima Gaz Dolumu', description: 'Klimanızın soğutma performansını artırmak için gaz dolumu hizmeti.', price: '180 TL', icon: 'droplet', image_url: '' }
        ]
        localStorage.setItem('services', JSON.stringify(defaultServices))
        setServices(defaultServices)
      } else {
        setServices(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service) => {
    setEditingService({ ...service })
  }

  const handleCancelEdit = () => {
    setEditingService(null)
  }

  const handleUpdate = async () => {
    try {
      const currentServices = JSON.parse(localStorage.getItem('services') || '[]')
      const priceStr = String(editingService.price)
      const updatedService = {
        ...editingService,
        price: priceStr && !priceStr.includes('TL') ? priceStr + ' TL' : priceStr
      }
      const updatedServices = currentServices.map(service => 
        service.id === editingService.id ? updatedService : service
      )
      localStorage.setItem('services', JSON.stringify(updatedServices))
      setServices(updatedServices)
      setEditingService(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      try {
        const currentServices = JSON.parse(localStorage.getItem('services') || '[]')
        const updatedServices = currentServices.filter(service => service.id !== id)
        localStorage.setItem('services', JSON.stringify(updatedServices))
        setServices(updatedServices)
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleAddService = async () => {
    try {
      const currentServices = JSON.parse(localStorage.getItem('services') || '[]')
      const newId = Math.max(...currentServices.map(s => s.id), 0) + 1
      const priceStr = String(newService.price)
      const serviceToAdd = {
        ...newService,
        id: newId,
        title: newService.name,
        price: priceStr && !priceStr.includes('TL') ? priceStr + ' TL' : priceStr,
        icon: 'wrench'
      }
      const updatedServices = [...currentServices, serviceToAdd]
      localStorage.setItem('services', JSON.stringify(updatedServices))
      setServices(updatedServices)
      setNewService({
        name: '',
        price: '',
        description: '',
        image_url: ''
      })
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
      <h1 className="text-3xl font-bold mb-6">Hizmet Yönetimi</h1>

      {/* Add New Service */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5" />
            <span>Yeni Hizmet Ekle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newName">Hizmet Adı</Label>
              <Input
                id="newName"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Klima Bakım"
              />
            </div>
            <div>
              <Label htmlFor="newPrice">Fiyat (TL)</Label>
              <Input
                id="newPrice"
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                placeholder="150"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newDescription">Açıklama</Label>
              <Textarea
                id="newDescription"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Hizmet açıklaması"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newImageUrl">Görsel URL</Label>
              <Input
                id="newImageUrl"
                value={newService.image_url}
                onChange={(e) => setNewService({ ...newService, image_url: e.target.value })}
                placeholder="/assets/klima-bakim.jpg"
              />
            </div>
          </div>
          <Button onClick={handleAddService} className="mt-4">
            <PlusCircle className="w-4 h-4 mr-2" />
            Hizmet Ekle
          </Button>
        </CardContent>
      </Card>

      {/* Service List */}
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              {editingService && editingService.id === service.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editName">Hizmet Adı</Label>
                    <Input
                      id="editName"
                      value={editingService.name}
                      onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPrice">Fiyat (TL)</Label>
                    <Input
                      id="editPrice"
                      type="number"
                      value={editingService.price ? editingService.price.replace(' TL', '') : ''}
                      onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="editDescription">Açıklama</Label>
                    <Textarea
                      id="editDescription"
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="editImageUrl">Görsel URL</Label>
                    <Input
                      id="editImageUrl"
                      value={editingService.image_url}
                      onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 flex space-x-2 mt-4">
                    <Button onClick={handleUpdate}><Save className="w-4 h-4 mr-2" />Kaydet</Button>
                    <Button variant="outline" onClick={handleCancelEdit}><XCircle className="w-4 h-4 mr-2" />İptal</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <img src={service.image_url} alt={service.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <p className="text-blue-600 font-bold">{service.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(service)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ServiceManagement

