import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import PublicGallery from './components/PublicGallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import './App.css'

function App() {
  useEffect(() => {
    // Site ayarlarından favicon'u yükle ve uygula
    const updateFavicon = () => {
      const siteSettings = JSON.parse(localStorage.getItem('siteSettings') || '{}')
      if (siteSettings.siteFavicon) {
        // Mevcut favicon linkini bul veya oluştur
        let faviconLink = document.querySelector('link[rel="icon"]')
        if (!faviconLink) {
          faviconLink = document.createElement('link')
          faviconLink.rel = 'icon'
          faviconLink.type = 'image/x-icon'
          document.head.appendChild(faviconLink)
        }
        faviconLink.href = siteSettings.siteFavicon
      }
    }

    // Sayfa yüklendiğinde favicon'u güncelle
    updateFavicon()

    // localStorage değişikliklerini dinle
    const handleStorageChange = (e) => {
      if (e.key === 'siteSettings') {
        updateFavicon()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <PublicGallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
