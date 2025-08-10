import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Info, HardDrive, Cpu, MemoryStick, Network } from 'lucide-react'

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSystemInfo()
  }, [])

  const fetchSystemInfo = async () => {
    try {
      // This is a placeholder. In a real application, you would fetch this from your backend.
      // For now, we'll use dummy data.
      const dummyData = {
        os: 'Ubuntu 22.04 LTS',
        kernel: '5.15.0-100-generic',
        cpu: 'Intel(R) Xeon(R) CPU @ 2.00GHz (4 Cores)',
        memory: '8GB RAM (4GB Used)',
        disk: '256GB SSD (120GB Used)',
        network: 'Active (eth0: 192.168.1.100)',
        uptime: '5 days, 3 hours, 15 minutes',
        backend_status: 'Running',
        database_status: 'Connected (SQLite)',
        last_backup: '2025-08-08 23:00:00'
      }
      setSystemInfo(dummyData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
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
      <h1 className="text-3xl font-bold mb-6">Sistem Bilgileri</h1>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <p><span className="font-semibold">İşletim Sistemi:</span> {systemInfo.os}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <p><span className="font-semibold">Kernel:</span> {systemInfo.kernel}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-green-600" />
              <p><span className="font-semibold">CPU:</span> {systemInfo.cpu}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Memory className="w-5 h-5 text-purple-600" />
              <p><span className="font-semibold">Bellek:</span> {systemInfo.memory}</p>
            </div>
            <div className="flex items-center space-x-2">
              <HardDrive className="w-5 h-5 text-orange-600" />
              <p><span className="font-semibold">Disk:</span> {systemInfo.disk}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-red-600" />
              <p><span className="font-semibold">Ağ:</span> {systemInfo.network}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <p><span className="font-semibold">Çalışma Süresi:</span> {systemInfo.uptime}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <p><span className="font-semibold">Backend Durumu:</span> {systemInfo.backend_status}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <p><span className="font-semibold">Veritabanı Durumu:</span> {systemInfo.database_status}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <p><span className="font-semibold">Son Yedekleme:</span> {systemInfo.last_backup}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SystemInfo