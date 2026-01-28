import { useState, useMemo } from 'react'
import MapChart from './components/MapChart'
import ProvinceModal from './components/ProvinceModal'
import mapData from './data/vn-all-merged.json'
import './App.css'

function App() {
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedProvinceValue, setSelectedProvinceValue] = useState(null)
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

  const handleProvinceClick = (provinceName, provinceValue) => {
    // Just select the province, don't open modal yet
    setSelectedProvince(provinceName)
    setSelectedProvinceValue(provinceValue)
  }

  const handleViewDetails = () => {
    // Open modal when button is clicked
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProvince(null)
    setSelectedProvinceValue(null)
  }

  const handleDeselect = () => {
    setSelectedProvince(null)
    setSelectedProvinceValue(null)
  }

  return (
    <div className="app">
      <MapChart 
        mapData={mapData} 
        seriesData={mapSeriesData}
        selectedProvince={selectedProvince}
        onProvinceClick={handleProvinceClick}
      />
      {selectedProvince && (
        <div className="province-info-panel">
          <div className="province-info-content">
            <h3 className="province-info-name">{selectedProvince}</h3>
            {selectedProvinceValue !== null && (
              <p className="province-info-value">Value: {selectedProvinceValue}</p>
            )}
            <button className="view-details-btn" onClick={handleViewDetails}>
              View Details
            </button>
            <button className="close-info-btn" onClick={handleDeselect}>
              ×
            </button>
          </div>
        </div>
      )}
      <ProvinceModal 
        isOpen={isModalOpen}
        provinceName={selectedProvince}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
