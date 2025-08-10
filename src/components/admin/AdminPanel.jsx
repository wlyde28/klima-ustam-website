import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import ServiceManagement from './ServiceManagement'
import TestimonialManagement from './TestimonialManagement'
import ContactMessages from './ContactMessages'
import SettingsManagement from './SettingsManagement'
import SystemInfo from './SystemInfo'
import ReviewsManager from './ReviewsManager'
import SiteSettings from './SiteSettings'
import HeaderFooterSettings from './HeaderFooterSettings'
import ButtonSettings from './ButtonSettings'
import ImageGallery from './ImageGallery'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token === 'admin-logged-in') {
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    navigate('/admin')
  }

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

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
              <p className="text-gray-600">Klima Ustam Yönetim Sistemi</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <nav>
              <ul>
                <li className="mb-2">
                  <Link to="/admin" className="block p-2 rounded-md hover:bg-gray-100">Dashboard</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/services" className="block p-2 rounded-md hover:bg-gray-100">Hizmet Yönetimi</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/testimonials" className="block p-2 rounded-md hover:bg-gray-100">Müşteri Yorumları</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/reviews" className="block p-2 rounded-md hover:bg-gray-100">Yorum Yönetimi</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/messages" className="block p-2 rounded-md hover:bg-gray-100">İletişim Mesajları</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/settings" className="block p-2 rounded-md hover:bg-gray-100">Site Ayarları</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/site-settings" className="block p-2 rounded-md hover:bg-gray-100">Gelişmiş Ayarlar</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/header-footer" className="block p-2 rounded-md hover:bg-gray-100">Header & Footer Ayarları</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/button-settings" className="block p-2 rounded-md hover:bg-gray-100">Buton Ayarları</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/gallery" className="block p-2 rounded-md hover:bg-gray-100">Resim Galerisi</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/system-info" className="block p-2 rounded-md hover:bg-gray-100">Sistem Bilgileri</Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-3">
            <Routes>
              <Route path="/" element={<AdminDashboard onLogout={handleLogout} />} />
              <Route path="services" element={<ServiceManagement />} />
              <Route path="testimonials" element={<TestimonialManagement />} />
              <Route path="reviews" element={<ReviewsManager />} />
              <Route path="messages" element={<ContactMessages />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route path="site-settings" element={<SiteSettings />} />
              <Route path="header-footer" element={<HeaderFooterSettings />} />
              <Route path="button-settings" element={<ButtonSettings />} />
              <Route path="gallery" element={<ImageGallery />} />
              <Route path="system-info" element={<SystemInfo />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel


