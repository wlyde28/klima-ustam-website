import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Image, Upload, Trash2, Edit, Eye, Download, Search, Filter, Grid, List, Plus, X, Wrench, AlertTriangle, Settings } from 'lucide-react'

const ImageGallery = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid, list
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadFiles, setUploadFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('montaj')
  const [filteredImages, setFilteredImages] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState('montaj')

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'hero', name: 'Ana Sayfa' },
    { id: 'services', name: 'Hizmetler' },
    { id: 'gallery', name: 'Galeri' },
    { id: 'team', name: 'Ekip' },
    { id: 'testimonials', name: 'Yorumlar' },
    { id: 'other', name: 'Diğer' }
  ]

  const tabs = [
    { id: 'montaj', label: 'Montaj', icon: Wrench, color: 'blue' },
    { id: 'ariza', label: 'Arıza', icon: AlertTriangle, color: 'red' },
    { id: 'bakim', label: 'Bakım', icon: Settings, color: 'green' }
  ]

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    // Aktif sekmeye göre resimleri filtrele (sadece gallery kategorisindeki resimler için)
    if (selectedCategory === 'gallery') {
      const filtered = images.filter(img => img.category === 'gallery' && img.subcategory === activeTab)
      setFilteredImages(filtered)
    } else {
      setFilteredImages([])
    }
  }, [images, activeTab, selectedCategory])

  const fetchImages = () => {
    try {
      setLoading(true)
      const savedImages = localStorage.getItem('gallery_images')
      if (savedImages) {
        setImages(JSON.parse(savedImages))
      } else {
        // Default images
        const defaultImages = [
          {
            id: 1,
            name: 'klima-bakım-1.jpg',
            url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Klima+Bakım',
            category: 'services',
            size: '245 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima bakım hizmeti'
          },
          {
            id: 2,
            name: 'ekip-foto-1.jpg',
            url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Ekip+Fotoğrafı',
            category: 'team',
            size: '180 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Ekip fotoğrafı'
          },
          {
            id: 3,
            name: 'hero-bg.jpg',
            url: 'https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Ana+Sayfa',
            category: 'hero',
            size: '520 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Ana sayfa arkaplan'
          },
          // Montaj kategorisi
          {
            id: 4,
            name: 'montaj-1.jpg',
            url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Klima+Montaj+1',
            category: 'gallery',
            subcategory: 'montaj',
            size: '280 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima montaj çalışması 1'
          },
          {
            id: 5,
            name: 'montaj-2.jpg',
            url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Klima+Montaj+2',
            category: 'gallery',
            subcategory: 'montaj',
            size: '320 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima montaj çalışması 2'
          },
          // Arıza kategorisi
          {
            id: 6,
            name: 'ariza-1.jpg',
            url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Ariza+Tamir+1',
            category: 'gallery',
            subcategory: 'ariza',
            size: '290 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima arıza tamiri 1'
          },
          {
            id: 7,
            name: 'ariza-2.jpg',
            url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Ariza+Tamir+2',
            category: 'gallery',
            subcategory: 'ariza',
            size: '310 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima arıza tamiri 2'
          },
          // Bakım kategorisi
          {
            id: 8,
            name: 'bakim-1.jpg',
            url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Klima+Bakim+1',
            category: 'gallery',
            subcategory: 'bakim',
            size: '275 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima bakım çalışması 1'
          },
          {
            id: 9,
            name: 'bakim-2.jpg',
            url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Klima+Bakim+2',
            category: 'gallery',
            subcategory: 'bakim',
            size: '295 KB',
            format: 'JPG',
            uploadDate: new Date().toISOString().split('T')[0],
            alt: 'Klima bakım çalışması 2'
          }
        ]
        setImages(defaultImages)
        localStorage.setItem('gallery_images', JSON.stringify(defaultImages))
      }
      setLoading(false)
    } catch (err) {
      setError('Resimler yüklenirken hata oluştu')
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setUploadFiles([...uploadFiles, ...files])
  }

  const handleUpload = () => {
    if (uploadFiles.length === 0) return

    try {
      setUploadProgress(0)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setUploadProgress(100)
        
        // Add new images to localStorage
        const currentImages = JSON.parse(localStorage.getItem('gallery_images') || '[]')
        const newImages = uploadFiles.map((file, index) => {
          const imageData = {
            id: Date.now() + index,
            name: file.name,
            url: URL.createObjectURL(file),
            category: selectedCategory,
            size: `${Math.round(file.size / 1024)} KB`,
            format: file.type.split('/')[1].toUpperCase(),
            uploadDate: new Date().toISOString().split('T')[0],
            alt: file.name
          }
          
          // Add subcategory if gallery category is selected
          if (selectedCategory === 'gallery') {
            imageData.subcategory = selectedSubcategory
          }
          
          return imageData
        })
        
        const updatedImages = [...currentImages, ...newImages]
        localStorage.setItem('gallery_images', JSON.stringify(updatedImages))
        setImages(updatedImages)
        
        setTimeout(() => {
          setUploadProgress(0)
          setUploadFiles([])
          setShowUploadModal(false)
        }, 1000)
      }, 2000)

    } catch (err) {
      setError('Yükleme sırasında hata oluştu')
      setUploadProgress(0)
    }
  }

  const handleDeleteImage = (id) => {
    if (!confirm('Bu resmi silmek istediğinizden emin misiniz?')) return

    try {
      const currentImages = JSON.parse(localStorage.getItem('gallery_images') || '[]')
      const updatedImages = currentImages.filter(img => img.id !== id)
      localStorage.setItem('gallery_images', JSON.stringify(updatedImages))
      setImages(updatedImages)
    } catch (err) {
      setError('Silme işlemi sırasında hata oluştu')
    }
  }

  const handleUpdateImage = async (id, updates) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      await fetchImages()
    } catch (err) {
      setError(err.message)
    }
  }

  // Filter images based on search, category, and subcategory
  const getFilteredImages = () => {
    let filtered = images.filter(image => {
      const matchesSearch = image.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           image.alt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // If gallery category is selected, further filter by subcategory
    if (selectedCategory === 'gallery') {
      filtered = filteredImages.length > 0 ? filteredImages : filtered.filter(img => img.subcategory === activeTab)
    }

    return filtered
  }

  const displayImages = getFilteredImages()

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Hata: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-xl">
                <Image className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Resim Galerisi
                </h1>
                <p className="text-gray-600">
                  Toplam {images.length} resim • {displayImages.length} gösteriliyor
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Resim Yükle
            </Button>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Resim ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Gallery Tabs - Only show when gallery category is selected */}
            {selectedCategory === 'gallery' && (
              <div className="flex items-center space-x-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? `bg-${tab.color}-600 text-white shadow-md`
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Images Grid/List */}
        {displayImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">Resim bulunamadı</p>
            <p className="text-gray-500">Arama kriterlerinize uygun resim bulunmamaktadır.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 
            'space-y-4'
          }>
            {displayImages.map((image) => (
              <Card key={image.id} className="hover:shadow-xl transition-all duration-300 group">
                {viewMode === 'grid' ? (
                  <div className="relative">
                    <img 
                      src={image.url} 
                      alt={image.alt || image.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onClick={() => setSelectedImage(image)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <Button size="sm" variant="secondary" onClick={() => setSelectedImage(image)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(image.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{image.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{image.category}</p>
                      <p className="text-xs text-gray-500">{image.size} • {image.format}</p>
                    </CardContent>
                  </div>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={image.url} 
                        alt={image.alt || image.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{image.name}</h3>
                        <p className="text-sm text-gray-600">{image.category}</p>
                        <p className="text-xs text-gray-500">{image.size} • {image.format}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedImage(image)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteImage(image.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Resim Yükle</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUploadModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Subcategory selection for gallery */}
              {selectedCategory === 'gallery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Kategori</label>
                  <select 
                    value={selectedSubcategory} 
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {tabs.map(tab => (
                      <option key={tab.id} value={tab.id}>{tab.label}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosyalar</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">{uploadFiles.length} dosya seçildi:</p>
                  {uploadFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setUploadFiles(uploadFiles.filter((_, i) => i !== index))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {uploadProgress > 0 && (
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{uploadProgress}% tamamlandı</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                İptal
              </Button>
              <Button 
                onClick={handleUpload}
                disabled={uploadFiles.length === 0 || uploadProgress > 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Yükle
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-full p-4">
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt || selectedImage.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery