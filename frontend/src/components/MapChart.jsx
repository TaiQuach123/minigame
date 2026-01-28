import { useEffect, useRef, useState } from 'react'

function MapChart({ mapData, seriesData, selectedProvince, onProvinceClick }) {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const [highchartsReady, setHighchartsReady] = useState(false)

  // Wait for Highcharts to be loaded from CDN
  useEffect(() => {
    const checkHighcharts = () => {
      if (window.Highcharts && window.Highcharts.mapChart) {
        setHighchartsReady(true)
      } else {
        setTimeout(checkHighcharts, 100)
      }
    }
    checkHighcharts()
  }, [])

  useEffect(() => {
    if (!chartRef.current || !mapData || !highchartsReady) return

    const Highcharts = window.Highcharts

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    // Create the map chart
    chartInstanceRef.current = Highcharts.mapChart(chartRef.current, {
      chart: {
        map: mapData,
        backgroundColor: '#f0f2f5'
      },
      title: {
        text: 'Vietnam 2025: 34 Administrative Units',
        style: {
          fontSize: '24px',
          fontFamily: 'Inter'
        }
      },
      subtitle: {
        text: 'Click on a province to select it',
        style: {
          fontFamily: 'Inter'
        }
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#EFEFFF'],
          [0.5, '#4444FF'],
          [1, '#000022']
        ]
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                // 'this' refers to the clicked point
                onProvinceClick(this.name, this.value)
              }
            }
          }
        }
      },
      series: [{
        data: seriesData,
        joinBy: 'hc-key',
        name: 'Random data',
        states: {
          select: {
            color: '#a4edba',  // Use select state for clicked provinces
            borderColor: '#333',
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{point.name}'
        }
      }, {
        type: 'mappoint',
        name: 'Icons',
        enableMouseTracking: false,
        data: [{
          name: 'Ho Chi Minh City',
          lat: 10.754,
          lon: 106.695
        }],
        dataLabels: {
          enabled: true,
          format: '🏫',
          style: {
            fontSize: '32px',
            fontWeight: 'normal',
            textOutline: 'none',
            color: 'black'
          },
          allowOverlap: true,
          zIndex: 100
        },
        marker: {
          enabled: false,
          radius: 0
        }
      }]
    })

    // Update selected province visual state
    if (chartInstanceRef.current && selectedProvince) {
      const chart = chartInstanceRef.current
      const series = chart.series[0]
      if (series) {
        // Deselect all points first
        series.data.forEach(point => {
          if (point.selected) {
            point.select(false, false)
          }
        })
        // Select the clicked province
        const selectedPoint = series.data.find(point => point.name === selectedProvince)
        if (selectedPoint) {
          selectedPoint.select(true, false)
        }
      }
    } else if (chartInstanceRef.current && !selectedProvince) {
      // Deselect all when no province is selected
      const chart = chartInstanceRef.current
      const series = chart.series[0]
      if (series) {
        series.data.forEach(point => {
          if (point.selected) {
            point.select(false, false)
          }
        })
      }
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [mapData, seriesData, onProvinceClick, highchartsReady, selectedProvince])

  return <div ref={chartRef} style={{ height: '100vh', width: '100vw' }} />
}

export default MapChart
