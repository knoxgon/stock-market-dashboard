import dayjs from 'dayjs';

export const options = (id, mkt, crc) => {
  return {
    chart: { 
      background: '#000000',
      foreColor: 'white',
      id: id,
      type: 'candlestick',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: []
        },
      }
    },
    title: {
      text: 'OHLC - ' + mkt + ' - ' + crc,
      align: 'left'
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function(val) {
          return dayjs(val).format('MMM DD HH:mm')
        }
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  }
}

export const optionsBar = (trgId, id) => {
  return {
    chart: {
      foreColor: 'yellow',
      background: '#191818',
      type: 'bar',
      id: id,
      brush: {
        enabled: true,
        target: trgId,
        autoScaleYaxis: false
      },
      selection: {
        enabled: true,
        fill: {
          color: '#caaefc',
          opacity: 0.4
        }
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true
        },
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  }
}

export const optionsLine = (dsid, catry, comp) => {
  return {
    chart: {
      id: dsid,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: []
        },
      }
    },
    colors: ['#77B6EA', '#545454'],
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Earnings Surprises - ' + comp,
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: catry,
      title: {
        text: 'Timeline'
      }
    },
    yaxis: {
      title: {
        text: 'Earning estimation'
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  }
}

export const optionsPie = (dsid, period, comp) => {
  return {
    chart: {
      type: 'pie',
      id: dsid
    },
    labels: ['Buy', 'Hold', 'Sell', 'Strong buy', 'Strong sell'],
    title: {
      text: 'Recommendation Trends - ' + period + ' - ' + comp,
      align: 'left'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    }
  }
}