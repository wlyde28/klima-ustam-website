import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Image as ImageIcon, Wrench, AlertTriangle, Settings } from 'lucide-react'

const PublicGallery = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('montaj')
  const [filteredImages, setFilteredImages] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    // Aktif sekmeye göre resimleri filtrele
    const filtered = images.filter(img => img.subcategory === activeTab)
    setFilteredImages(filtered)
  }, [images, activeTab])

  const tabs = [
    { id: 'montaj', label: 'Montaj', icon: Wrench, color: 'blue' },
    { id: 'ariza', label: 'Arıza', icon: AlertTriangle, color: 'red' },
    { id: 'bakim', label: 'Bakım', icon: Settings, color: 'green' }
  ]

  const fetchImages = () => {
    try {
      setLoading(true)
      const savedImages = localStorage.getItem('gallery_images')
      if (savedImages) {
        const allImages = JSON.parse(savedImages)
        // Sadece 'gallery' kategorisindeki resimleri göster
        const galleryImages = allImages.filter(img => img.category === 'gallery')
        setImages(galleryImages)
      } else {
        // Varsayılan galeri resimleri - kategorilere göre
        const defaultImages = [
          // Montaj kategorisi
          {
            id: 1,
            name: 'montaj-1.jpg',
            url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Klima+Montaj+1',
            category: 'gallery',
            subcategory: 'montaj',
            alt: 'Klima montaj çalışması 1'
          },
          {
            id: 2,
            name: 'montaj-2.jpg',
            url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Klima+Montaj+2',
            category: 'gallery',
            subcategory: 'montaj',
            alt: 'Klima montaj çalışması 2'
          },
          {
            id: 3,
            name: 'montaj-3.jpg',
            url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Klima+Montaj+3',
            category: 'gallery',
            subcategory: 'montaj',
            alt: 'Klima montaj çalışması 3'
          },
          // Arıza kategorisi
          {
            id: 4,
            name: 'ariza-1.jpg',
            url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Ariza+Tamir+1',
            category: 'gallery',
            subcategory: 'ariza',
            alt: 'Klima arıza tamiri 1'
          },
          {
            id: 5,
            name: 'ariza-2.jpg',
            url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Ariza+Tamir+2',
            category: 'gallery',
            subcategory: 'ariza',
            alt: 'Klima arıza tamiri 2'
          },
          {
            id: 6,
            name: 'ariza-3.jpg',
            url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Ariza+Tamir+3',
            category: 'gallery',
            subcategory: 'ariza',
            alt: 'Klima arıza tamiri 3'
          },
          // Bakım kategorisi
          {
            id: 7,
            name: 'bakim-1.jpg',
            url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Klima+Bakim+1',
            category: 'gallery',
            subcategory: 'bakim',
            alt: 'Klima bakım çalışması 1'
          },
          {
            id: 8,
            name: 'bakim-2.jpg',
            url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Klima+Bakim+2',
            category: 'gallery',
            subcategory: 'bakim',
            alt: 'Klima bakım çalışması 2'
          },
          {
            id: 9,
            name: 'bakim-3.jpg',
            url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Klima+Bakim+3',
            category: 'gallery',
            subcategory: 'bakim',
            alt: 'Klima bakım çalışması 3'
          }
        ]
        setImages(defaultImages)
        // Varsayılan resimleri localStorage'a kaydet
        localStorage.setItem('gallery_images', JSON.stringify(defaultImages))
      }
    } catch (error) {
      console.error('Galeri resimleri yüklenirken hata:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const openImageModal = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Galeri yükleniyor...</p>
          </div>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return null // Resim yoksa galeriyi gösterme
  }

  if (filteredImages.length === 0 && !loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Resim Galerisi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Çalışmalarımızdan ve hizmetlerimizden kareler
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? `bg-${tab.color}-600 text-white shadow-md`
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* No Images Message */}
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Bu kategoride henüz resim bulunmuyor
            </h3>
            <p className="text-gray-500">
              {tabs.find(tab => tab.id === activeTab)?.label} kategorisine ait resimler yakında eklenecek.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Resim Galerisi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Çalışmalarımızdan ve hizmetlerimizden kareler
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? `bg-${tab.color}-600 text-white shadow-md`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              onClick={() => openImageModal(image)}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt || image.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/6B7280/FFFFFF?text=Resim+Yuklenemedi'
                    }}
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-3">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeImageModal}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.alt || selectedImage.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={closeImageModal}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PublicGallery