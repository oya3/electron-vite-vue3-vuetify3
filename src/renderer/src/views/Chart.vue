<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels:  ["00年", "05年", "10年", "15年", "20年"],
        datasets: [
          {
            label: "系列Ａ",
            data: [10, 20,  5, 15, 50],
            backgroundColor: "red"
          },
          {
            label: "系列Ｂ",
            data: [ 5, 10, 10,  5,  8],
            backgroundColor: "blue"
          },
          {
            label: "系列C",
            data: [ 15, 20, 20,  15,  18],
            backgroundColor: "green"
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
              stacked: true  // 積み上げの指定
          },
          y: {
            stacked: true  //  積み上げの指定
          }
        },
        plugins: {
          title: {
            display: true,
            fontSize: 20,
            text: "積上げ棒グラフ"
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            }
          }
        }
      }
    }
  }
}
</script>
