import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, Settings, Wrench, LogOut, Eye, EyeOff, Image, Bell, BarChart3, Upload, Palette, Phone, MessageCircle, Star, TrendingUp, Calendar, Clock } from 'lucide-react'

const AdminDashboard = ({ onLogout }) => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalTestimonials: 0,
    totalMessages: 0,
    unreadMessages: 0,
    approvedTestimonials: 0,
    pendingTestimonials: 0,
    todayMessages: 0,
    weeklyMessages: 0
  })
  const [notifications, setNotifications] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // LocalStorage'dan verileri al
      const services = JSON.parse(localStorage.getItem('services') || '[]')
      const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
      
      // Eğer veriler yoksa varsayılan verileri oluştur
      if (services.length === 0) {
        const defaultServices = [
          { id: 1, title: 'Klima Bakım', description: 'Klimanızın uzun ömürlü olması ve verimli çalışması için düzenli bakım hizmeti sunuyoruz.', price: '150 TL', icon: 'wrench' },
          { id: 2, title: 'Klima Onarım', description: 'Arızalı klimalarınızı hızlı ve güvenilir şekilde onarıyoruz.', price: '200 TL', icon: 'tool' },
          { id: 3, title: 'Klima Montaj', description: 'Yeni klima montajı için profesyonel hizmet sunuyoruz.', price: '300 TL', icon: 'settings' },
          { id: 4, title: 'Klima Gaz Dolumu', description: 'Klimanızın soğutma performansını artırmak için gaz dolumu hizmeti.', price: '180 TL', icon: 'droplet' }
        ]
        localStorage.setItem('services', JSON.stringify(defaultServices))
        services.push(...defaultServices)
      }
      
      if (testimonials.length === 0) {
        const defaultTestimonials = [
          { id: 1, name: 'Ahmet Yılmaz', comment: 'Çok memnun kaldım, hızlı ve kaliteli hizmet.', rating: 5, is_approved: true, created_at: new Date().toISOString() },
          { id: 2, name: 'Fatma Kaya', comment: 'Klimam artık çok daha iyi çalışıyor, teşekkürler.', rating: 5, is_approved: true, created_at: new Date().toISOString() },
          { id: 3, name: 'Mehmet Demir', comment: 'Profesyonel ekip, zamanında geldi.', rating: 4, is_approved: false, created_at: new Date().toISOString() }
        ]
        localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials))
        testimonials.push(...defaultTestimonials)
      }
      
      if (messages.length === 0) {
        const defaultMessages = [
          { id: 1, name: 'Ali Veli', email: 'ali@example.com', phone: '0532 123 4567', message: 'Klima bakımı için randevu almak istiyorum.', is_read: false, created_at: new Date().toISOString() },
          { id: 2, name: 'Ayşe Öz', email: 'ayse@example.com', phone: '0533 987 6543', message: 'Klimam soğutmuyor, ne zaman gelebilirsiniz?', is_read: true, created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
        ]
        localStorage.setItem('contactMessages', JSON.stringify(defaultMessages))
        messages.push(...defaultMessages)
      }
      
      // Bugünün tarihi
      const today = new Date().toISOString().split('T')[0]
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      
      setStats({
        totalServices: services.length || 0,
        totalTestimonials: testimonials.length || 0,
        totalMessages: messages.length || 0,
        unreadMessages: messages.filter(m => !m.is_read).length || 0,
        approvedTestimonials: testimonials.filter(t => t.is_approved).length || 0,
        pendingTestimonials: testimonials.filter(t => !t.is_approved).length || 0,
        todayMessages: messages.filter(m => m.created_at?.startsWith(today)).length || 0,
        weeklyMessages: messages.filter(m => m.created_at >= weekAgo).length || 0
      })
      
      // Bildirimler oluştur
      const newNotifications = []
      if (messages.filter(m => !m.is_read).length > 0) {
        newNotifications.push({
          id: 1,
          type: 'message',
          title: 'Yeni Mesajlar',
          description: `${messages.filter(m => !m.is_read).length} okunmamış mesaj var`,
          time: 'Şimdi',
          urgent: true
        })
      }
      if (testimonials.filter(t => !t.is_approved).length > 0) {
        newNotifications.push({
          id: 2,
          type: 'testimonial',
          title: 'Onay Bekleyen Yorumlar',
          description: `${testimonials.filter(t => !t.is_approved).length} yorum onay bekliyor`,
          time: '5 dk önce',
          urgent: false
        })
      }
      setNotifications(newNotifications)
      
      // Son aktiviteler
      const activities = [
        { id: 1, action: 'Yeni mesaj alındı', user: 'Müşteri', time: '2 dk önce', type: 'message' },
        { id: 2, action: 'Yorum onaylandı', user: 'Admin', time: '15 dk önce', type: 'approval' },
        { id: 3, action: 'Hizmet güncellendi', user: 'Admin', time: '1 saat önce', type: 'update' },
        { id: 4, action: 'Site ayarları değiştirildi', user: 'Admin', time: '3 saat önce', type: 'settings' }
      ]
      setRecentActivity(activities)
      
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    onLogout(false)
  }

  const quickActions = [
    {
      title: 'Mesajları Yönet',
      description: 'Müşteri mesajlarını görüntüle ve yanıtla',
      icon: MessageCircle,
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-600',
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} yeni` : null,
      urgent: stats.unreadMessages > 0,
      action: () => window.location.href = '/admin/messages'
    },
    {
      title: 'Yorumları Yönet',
      description: 'Müşteri yorumlarını onaylayın veya düzenleyin',
      icon: Star,
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-600',
      badge: stats.pendingTestimonials > 0 ? `${stats.pendingTestimonials} beklemede` : null,
      urgent: stats.pendingTestimonials > 0,
      action: () => window.location.href = '/admin/reviews'
    },
    {
      title: 'Resim Galerisi',
      description: 'Site resimlerini yükleyin ve yönetin',
      icon: Image,
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-600',
      badge: null,
      urgent: false,
      action: () => window.location.href = '/admin/gallery'
    },
    {
      title: 'Hizmetleri Yönet',
      description: 'Sunduğunuz hizmetleri düzenleyin',
      icon: Wrench,
      color: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-600',
      badge: `${stats.totalServices} hizmet`,
      urgent: false,
      action: () => window.location.href = '/admin/services'
    },
    {
      title: 'Site Ayarları',
      description: 'Genel site ayarlarını yapılandırın',
      icon: Settings,
      color: 'bg-gray-50 hover:bg-gray-100',
      textColor: 'text-gray-600',
      badge: null,
      urgent: false,
      action: () => window.location.href = '/admin/settings'
    },
    {
      title: 'İstatistikler',
      description: 'Site performansını ve analitikleri görüntüleyin',
      icon: BarChart3,
      color: 'bg-indigo-50 hover:bg-indigo-100',
      textColor: 'text-indigo-600',
      badge: null,
      urgent: false,
      action: () => window.location.href = '/admin/analytics'
    }
  ]

  const statCards = [
    {
      title: 'Toplam Hizmet',
      value: stats.totalServices,
      icon: Wrench,
      color: 'bg-blue-500',
      trend: '+2 bu ay'
    },
    {
      title: 'Onaylı Yorumlar',
      value: stats.approvedTestimonials,
      icon: Star,
      color: 'bg-green-500',
      trend: `${stats.pendingTestimonials} onay bekliyor`
    },
    {
      title: 'Bugünkü Mesajlar',
      value: stats.todayMessages,
      icon: Calendar,
      color: 'bg-purple-500',
      trend: `${stats.weeklyMessages} bu hafta`
    },
    {
      title: 'Okunmamış Mesaj',
      value: stats.unreadMessages,
      icon: Bell,
      color: stats.unreadMessages > 0 ? 'bg-red-500' : 'bg-gray-400',
      trend: stats.unreadMessages > 0 ? 'Acil!' : 'Tümü okundu'
    },
    {
      title: 'Haftalık Trend',
      value: stats.weeklyMessages,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      trend: '+15% artış'
    },
    {
      title: 'Toplam Yorum',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: 'bg-orange-500',
      trend: '4.8/5 ortalama'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 flex items-center space-x-2">
                  <span>Site yönetim paneline hoş geldiniz</span>
                  {notifications.length > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full animate-pulse">
                      {notifications.length} bildirim
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin Kullanıcısı</p>
                <p className="text-xs text-gray-500">Son giriş: Bugün</p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                        {stat.trend}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color} shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${stat.color.replace('bg-', 'bg-').replace('-500', '-400')}`}
                      style={{ width: `${Math.min((stat.value / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Notifications and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Notifications */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <span>Bildirimler</span>
                {notifications.length > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                      notification.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Yeni bildirim yok</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Son Aktiviteler</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'message' ? 'bg-green-500' :
                      activity.type === 'approval' ? 'bg-blue-500' :
                      activity.type === 'update' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${action.color}`} onClick={action.action}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-5 h-5 ${action.textColor}`} />
                      <span className={action.textColor}>{action.title}</span>
                    </div>
                    {action.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        action.urgent ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {action.badge}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {action.description}
                  </p>
                  <Button className={`w-full ${action.textColor.replace('text-', 'bg-').replace('-600', '-600')} hover:${action.textColor.replace('text-', 'bg-').replace('-600', '-700')} text-white`}>
                    {action.title.includes('Yönet') ? action.title : `${action.title} Aç`}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard

