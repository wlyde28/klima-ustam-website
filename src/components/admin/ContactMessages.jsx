import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, EyeOff, Bell, Phone, MessageCircle, Calendar, Clock, User, Trash2, Reply, Archive } from 'lucide-react'

const ContactMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all, unread, read
  const [sortBy, setSortBy] = useState('newest') // newest, oldest
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('contactMessages') || '[]')
      if (data.length === 0) {
        const defaultMessages = [
          { id: 1, name: 'Ali Veli', email: 'ali@example.com', phone: '0532 123 4567', message: 'Klima bakımı için randevu almak istiyorum.', is_read: false, created_at: new Date().toISOString() },
          { id: 2, name: 'Ayşe Öz', email: 'ayse@example.com', phone: '0533 987 6543', message: 'Klimam soğutmuyor, ne zaman gelebilirsiniz?', is_read: true, created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
        ]
        localStorage.setItem('contactMessages', JSON.stringify(defaultMessages))
        setMessages(defaultMessages)
      } else {
        setMessages(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      const currentMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
      const updatedMessages = currentMessages.map(message => 
        message.id === id ? { ...message, is_read: true } : message
      )
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages))
      setMessages(updatedMessages)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteMessage = async (id) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return
    
    try {
      const currentMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
      const updatedMessages = currentMessages.filter(message => message.id !== id)
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages))
      setMessages(updatedMessages)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCallCustomer = (phone) => {
    window.open(`tel:${phone}`, '_self')
  }

  const handleWhatsApp = (phone, name) => {
    const message = `Merhaba ${name}, mesajınız için teşekkürler. Size nasıl yardımcı olabilirim?`
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.is_read
    if (filter === 'read') return message.is_read
    return true
  }).sort((a, b) => {
    const dateA = new Date(a.created_at || 0)
    const dateB = new Date(b.created_at || 0)
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB
  })

  const unreadCount = messages.filter(m => !m.is_read).length

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Hata: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Mesaj okundu olarak işaretlendi!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  İletişim Mesajları
                </h1>
                <p className="text-gray-600 flex items-center space-x-2">
                  <span>Toplam {messages.length} mesaj</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full animate-pulse">
                      {unreadCount} okunmamış
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Filter and Sort Controls */}
            <div className="flex items-center space-x-4">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Mesajlar</option>
                <option value="unread">Okunmamış</option>
                <option value="read">Okunmuş</option>
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">Mesaj bulunamadı</p>
            <p className="text-gray-500">Seçilen filtreye uygun mesaj bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredMessages.map((message) => (
              <Card key={message.id} className={`hover:shadow-xl transition-all duration-300 ${
                !message.is_read ? 'border-l-4 border-blue-500 bg-blue-50' : 'bg-white'
              }`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        !message.is_read ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <User className={`w-6 h-6 ${
                          !message.is_read ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{message.name}</h3>
                          {!message.is_read && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full animate-pulse flex items-center space-x-1">
                              <Bell className="w-3 h-3" />
                              <span>YENİ</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{message.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{message.email}</span>
                          </div>
                          {message.created_at && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(message.created_at).toLocaleDateString('tr-TR')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-800 leading-relaxed">{message.message}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Button 
                        onClick={() => handleCallCustomer(message.phone)}
                        size="sm"
                        variant="outline"
                        className="flex items-center space-x-1 hover:bg-green-50 hover:border-green-300"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Ara</span>
                      </Button>
                      
                      <Button 
                        onClick={() => handleWhatsApp(message.phone, message.name)}
                        size="sm"
                        variant="outline"
                        className="flex items-center space-x-1 hover:bg-green-50 hover:border-green-300"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!message.is_read ? (
                        <Button 
                          onClick={() => handleMarkAsRead(message.id)} 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Okundu İşaretle
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Okundu
                        </Button>
                      )}
                      
                      <Button 
                        onClick={() => handleDeleteMessage(message.id)}
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 hover:border-red-300 text-red-600"
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
    </div>
  )
}

export default ContactMessages


