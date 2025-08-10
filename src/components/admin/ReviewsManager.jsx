import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MessageSquare, User, Calendar, Clock, Eye, Edit, Trash2, Check, X, Filter, Search, Plus, ThumbsUp, ThumbsDown, Flag } from 'lucide-react'

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, rating_high, rating_low
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [notification, setNotification] = useState(null)

  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    service: '',
    status: 'approved'
  })

  useEffect(() => {
    fetchReviews()
    // İlk yüklemede örnek yorumları ekle
    addSampleReviews()
  }, [])

  const addSampleReviews = () => {
    const currentReviews = JSON.parse(localStorage.getItem('testimonials') || '[]')
    
    // Eğer zaten yorumlar varsa, örnek yorumları ekleme
    if (currentReviews.length > 0) return
    
    const sampleReviews = [
      {
        id: '1',
        name: 'Ahmet K.',
        email: 'ahmet.k@email.com',
        service: 'Klima Tamiri',
        rating: 5,
        comment: 'Klima Servis Hattı ekibi gerçekten profesyonel! Klimam soğutmuyordu ve sürekli kapanıyordu. Hızlı bir şekilde arızayı tespit edip onardılar. Şimdi ilk günkü gibi çalışıyor, teşekkür ederim!',
        is_approved: true,
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        name: 'Elif T.',
        email: 'elif.t@email.com',
        service: 'Klima Temizliği',
        rating: 5,
        comment: 'Klima su akıtıyordu ve kötü koku geliyordu. Servis ekibi geldi, detaylı bir temizlik ve bakım yaptı. Şu an klima çok daha verimli çalışıyor. Güler yüzlü ve kaliteli hizmet için teşekkürler!',
        is_approved: true,
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        name: 'Mehmet A.',
        email: 'mehmet.a@email.com',
        service: 'Klima Gaz Dolumu',
        rating: 5,
        comment: 'Çağırdığım gün hızlıca geldiler, klimanın gazı bitmiş ve fanı arızalıymış. Hem gaz dolumunu yaptılar hem de fanı onardılar. İşlerini titizlikle yapıyorlar, herkese tavsiye ederim!',
        is_approved: true,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        name: 'Zeynep B.',
        email: 'zeynep.b@email.com',
        service: 'Klima Bakımı',
        rating: 5,
        comment: 'Yıllık klima bakımını burada yaptırıyorum ve her seferinde çok memnun kalıyorum. Hem enerji tasarrufu sağlıyorum hem de klimam sorunsuz çalışıyor. Kaliteli hizmet için teşekkür ederim!',
        is_approved: true,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        name: 'Hüseyin D.',
        email: 'huseyin.d@email.com',
        service: 'Klima Tamiri',
        rating: 5,
        comment: 'Klima çok ses yapıyordu ve randımanlı çalışmıyordu. Teknik servis ekibi kısa sürede problemi çözdü. Şimdi sessiz ve güçlü bir şekilde çalışıyor. Güvenilir ve işini bilen bir ekip!',
        is_approved: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '6',
        name: 'Üryan Bey',
        email: 'uryan.bey@email.com',
        service: 'Klima Bakımı',
        rating: 5,
        comment: 'Son derece profesyonel ve işlerini titizlik ile yapan bir ekip klimam yeni gibi oldu hersey için teşekkür ederim ve herkese tavsiye ederim. Çok ilgili ve çok detaylı açıklamalar yapan iyi niyetli bir abimiz.',
        is_approved: true,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '7',
        name: 'Müşteri',
        email: 'musteri@email.com',
        service: 'Klima Bakımı',
        rating: 5,
        comment: 'Gayet işine itina gösteren ev içersinde su damlası bile olmadan klima bakımı ni yaptı teşekkür ediyorum. Çok titiz ve temiz çalışıyorlar.',
        is_approved: true,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
    
    localStorage.setItem('testimonials', JSON.stringify(sampleReviews))
  }

  const fetchReviews = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('testimonials') || '[]')
      setReviews(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveReview = async (id) => {
    try {
      const currentReviews = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const updatedReviews = currentReviews.map(review => 
        review.id === id ? { ...review, is_approved: true } : review
      )
      localStorage.setItem('testimonials', JSON.stringify(updatedReviews))
      await fetchReviews()
      showNotification('Yorum onaylandı', 'success')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRejectReview = async (id) => {
    try {
      const currentReviews = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const updatedReviews = currentReviews.map(review => 
        review.id === id ? { ...review, is_approved: false } : review
      )
      localStorage.setItem('testimonials', JSON.stringify(updatedReviews))
      await fetchReviews()
      showNotification('Yorum reddedildi', 'warning')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteReview = async (id) => {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return

    try {
      const currentReviews = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const updatedReviews = currentReviews.filter(review => review.id !== id)
      localStorage.setItem('testimonials', JSON.stringify(updatedReviews))
      await fetchReviews()
      showNotification('Yorum silindi', 'error')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddReview = async () => {
    try {
      // localStorage'a direkt ekleme
      const currentReviews = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const newId = Date.now().toString()
      const reviewToAdd = {
        id: newId,
        name: newReview.name,
        email: newReview.email,
        service: newReview.service,
        rating: newReview.rating,
        comment: newReview.comment,
        is_approved: newReview.status === 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const updatedReviews = [...currentReviews, reviewToAdd]
      localStorage.setItem('testimonials', JSON.stringify(updatedReviews))
      
      await fetchReviews()
      setShowAddModal(false)
      setNewReview({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        service: '',
        status: 'approved'
      })
      showNotification('Yeni yorum eklendi', 'success')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdateReview = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: updates.name,
          email: updates.email,
          service: updates.service,
          rating: updates.rating,
          comment: updates.comment,
          is_approved: updates.status === 'approved'
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      await fetchReviews()
      setEditingReview(null)
      showNotification('Yorum güncellendi', 'success')
    } catch (err) {
      setError(err.message)
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Onaylandı'
      case 'pending': return 'Beklemede'
      case 'rejected': return 'Reddedildi'
      default: return 'Bilinmiyor'
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || review.status === filter
    const matchesSearch = review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.service?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'rating_high':
        return b.rating - a.rating
      case 'rating_low':
        return a.rating - b.rating
      default:
        return 0
    }
  })

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0
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
            notification.type === 'warning' ? 'bg-yellow-500' :
            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Yorumlar
                </h1>
                <p className="text-gray-600">
                  Toplam {stats.total} yorum • Ortalama {stats.averageRating} ⭐
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yorum Ekle
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Onaylanan</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <Check className="w-8 h-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Beklemede</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Reddedilen</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
                <X className="w-8 h-8 text-red-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Toplam</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Yorum ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Beklemede</option>
                <option value="approved">Onaylanan</option>
                <option value="rejected">Reddedilen</option>
              </select>

              {/* Sort */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
                <option value="rating_high">Yüksek Puan</option>
                <option value="rating_low">Düşük Puan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {sortedReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">Yorum bulunamadı</p>
            <p className="text-gray-500">Arama kriterlerinize uygun yorum bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{review.name}</h3>
                        <p className="text-gray-600">{review.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">({review.rating}/5)</span>
                        </div>
                        {review.service && (
                          <p className="text-sm text-blue-600 mt-1">Hizmet: {review.service}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {getStatusText(review.status)}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes || 0} beğeni</span>
                      <ThumbsDown className="w-4 h-4 ml-4" />
                      <span>{review.dislikes || 0} beğenmeme</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {review.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleApproveReview(review.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Onayla
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectReview(review.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reddet
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingReview(review)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Yeni Yorum Ekle</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İsim</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={newReview.email}
                  onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet</label>
                <input
                  type="text"
                  value={newReview.service}
                  onChange={(e) => setNewReview({...newReview, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Puan</label>
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5].map(rating => (
                    <option key={rating} value={rating}>{rating} Yıldız</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yorum</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                <select 
                  value={newReview.status} 
                  onChange={(e) => setNewReview({...newReview, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="approved">Onaylandı</option>
                  <option value="pending">Beklemede</option>
                  <option value="rejected">Reddedildi</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                İptal
              </Button>
              <Button 
                onClick={handleAddReview}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ekle
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Yorumu Düzenle</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditingReview(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İsim</label>
                <input
                  type="text"
                  value={editingReview.name}
                  onChange={(e) => setEditingReview({...editingReview, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={editingReview.email}
                  onChange={(e) => setEditingReview({...editingReview, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet</label>
                <input
                  type="text"
                  value={editingReview.service || ''}
                  onChange={(e) => setEditingReview({...editingReview, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Puan</label>
                <select 
                  value={editingReview.rating} 
                  onChange={(e) => setEditingReview({...editingReview, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5].map(rating => (
                    <option key={rating} value={rating}>{rating} Yıldız</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yorum</label>
                <textarea
                  value={editingReview.comment}
                  onChange={(e) => setEditingReview({...editingReview, comment: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                <select 
                  value={editingReview.status} 
                  onChange={(e) => setEditingReview({...editingReview, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="approved">Onaylandı</option>
                  <option value="pending">Beklemede</option>
                  <option value="rejected">Reddedildi</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setEditingReview(null)}>
                İptal
              </Button>
              <Button 
                onClick={() => handleUpdateReview(editingReview.id, editingReview)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Güncelle
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewsManager