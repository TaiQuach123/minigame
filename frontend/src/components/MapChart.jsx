import { useEffect, useRef, useState } from 'react'

function MapChart({ mapData, seriesData, onProvinceClick }) {
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
        text: 'Click on a province to view details',
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
                onProvinceClick(this.name)
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
          hover: {
            color: '#a4edba'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            fontWeight: 'normal',
            textOutline: 'none',
            color: 'contrast'
          }
        },
        tooltip: {
          pointFormat: '{point.name}'
        }
      }]
    })

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [mapData, seriesData, onProvinceClick, highchartsReady])

  return <div ref={chartRef} style={{ height: '100vh', width: '100vw' }} />
}

export default MapChart
