import { useEffect, useRef, useState, useCallback } from 'react'

function MapChart({ mapData, seriesData, selectedProvince, onProvinceClick }) {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const [highchartsReady, setHighchartsReady] = useState(false)
  const zoomStateRef = useRef(null)
  const isUpdatingSelectionRef = useRef(false)

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

  // Create chart only when mapData, seriesData, or highchartsReady changes
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
        backgroundColor: '#FFF8F0',
        events: {
          redraw: function() {
            // Restore zoom state after redraw if we're updating selection
            if (isUpdatingSelectionRef.current && zoomStateRef.current && this.mapView) {
              requestAnimationFrame(() => {
                if (this.mapView && zoomStateRef.current) {
                  this.mapView.setView(zoomStateRef.current.center, zoomStateRef.current.zoom, false)
                  isUpdatingSelectionRef.current = false
                }
              })
            }
          }
        }
      },
      title: {
        text: 'Cưỡi Ngựa Vàng - Săn Ngàn Lộc',
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
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
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
          [0, '#FFE4B5'],  // Light gold (moccasin)
          [0.5, '#FFD700'], // Bright gold
          [1, '#DC143C']    // Crimson red
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
        borderColor: '#000000',  // Black borders for all provinces
        borderWidth: 1,
        states: {
          select: {
            color: '#FFD700',  // Gold for selected provinces (Tet theme)
            borderColor: '#000000',  // Black border for selected provinces
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

    // Restore zoom state if it exists
    if (zoomStateRef.current && chartInstanceRef.current.mapView) {
      chartInstanceRef.current.mapView.setView(
        zoomStateRef.current.center,
        zoomStateRef.current.zoom,
        false
      )
    }

    // Listen to mapView changes to track zoom state
    const chart = chartInstanceRef.current
    if (chart.mapView) {
      // Store zoom state whenever it changes (user zoom/pan)
      const updateZoomState = () => {
        if (!isUpdatingSelectionRef.current && chart.mapView && chart.mapView.center && chart.mapView.zoom !== undefined) {
          zoomStateRef.current = {
            center: [chart.mapView.center[0], chart.mapView.center[1]],
            zoom: chart.mapView.zoom
          }
        }
      }
      
      // Listen to afterSetExtremes event if available
      if (chart.mapView.on) {
        chart.mapView.on('afterSetExtremes', updateZoomState)
      }
      
      // Also check periodically (fallback)
      const zoomCheckInterval = setInterval(updateZoomState, 100)
      
      // Store interval for cleanup
      chart._zoomCheckInterval = zoomCheckInterval
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        // Save zoom state before destroying
        if (chartInstanceRef.current.mapView) {
          zoomStateRef.current = {
            center: chartInstanceRef.current.mapView.center,
            zoom: chartInstanceRef.current.mapView.zoom
          }
        }
        // Clear zoom check interval if it exists
        if (chartInstanceRef.current._zoomCheckInterval) {
          clearInterval(chartInstanceRef.current._zoomCheckInterval)
        }
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [mapData, seriesData, highchartsReady])

  // Update selected province visual state separately (without recreating chart)
  useEffect(() => {
    if (!chartInstanceRef.current) return

    const chart = chartInstanceRef.current
    const series = chart.series[0]
    
    if (!series) return

    // Store current zoom/pan state before updating selection
    if (chart.mapView && chart.mapView.center && chart.mapView.zoom !== undefined) {
      zoomStateRef.current = {
        center: [chart.mapView.center[0], chart.mapView.center[1]],
        zoom: chart.mapView.zoom
      }
    }

    // Mark that we're updating selection to prevent zoom state updates
    isUpdatingSelectionRef.current = true

    // Deselect all points first (without redraw)
    series.data.forEach(point => {
      if (point.selected) {
        point.select(false, false)
      }
    })

    // Select the clicked province if one is selected (without redraw)
    if (selectedProvince) {
      const selectedPoint = series.data.find(point => point.name === selectedProvince)
      if (selectedPoint) {
        selectedPoint.select(true, false)
      }
    }

    // Restore zoom/pan state after selection update
    // Use multiple attempts to ensure zoom is restored
    if (zoomStateRef.current && chart.mapView) {
      const restoreZoom = () => {
        if (chart.mapView && zoomStateRef.current) {
          chart.mapView.setView(zoomStateRef.current.center, zoomStateRef.current.zoom, false)
        }
      }
      
      // Try immediately
      restoreZoom()
      
      // Try after a short delay
      setTimeout(() => {
        restoreZoom()
        isUpdatingSelectionRef.current = false
      }, 10)
      
      // Try after redraw completes
      requestAnimationFrame(() => {
        restoreZoom()
        requestAnimationFrame(() => {
          restoreZoom()
          isUpdatingSelectionRef.current = false
        })
      })
    } else {
      isUpdatingSelectionRef.current = false
    }
  }, [selectedProvince])

  return <div ref={chartRef} style={{ height: '100vh', width: '100vw' }} />
}

export default MapChart
