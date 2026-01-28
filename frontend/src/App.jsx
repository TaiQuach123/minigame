import { useState, useMemo } from 'react'
import MapChart from './components/MapChart'
import ProvinceModal from './components/ProvinceModal'
import mapData from './data/vn-all-merged.json'
import './App.css'

function App() {
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Create dummy data for the map
  const mapSeriesData = useMemo(() => {
    return mapData.features.map(f => {
      const key = f.properties['hc-key']
      return {
        'hc-key': key,
        value: Math.floor(Math.random() * 100)
      }
    })
  }, [])

  const handleProvinceClick = (provinceName) => {
    setSelectedProvince(provinceName)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProvince(null)
  }

  return (
    <div className="app">
      <MapChart 
        mapData={mapData} 
        seriesData={mapSeriesData}
        onProvinceClick={handleProvinceClick}
      />
      <ProvinceModal 
        isOpen={isModalOpen}
        provinceName={selectedProvince}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
