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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
            data: [10, 20,  5, 15, 10],
            backgroundColor: "red"
          },
          {
            label: "系列Ｂ",
            data: [ 5, 10, 10,  5,  8],
            backgroundColor: "blue"
          }
        ]
      },
      chartOptions: {
        responsive: false,
        title: {
          display: true,
          fontSize: 20,
          text: "積上げ棒グラフ"
        },
        legend: {
          position: 'bottom'
        },
        scales: {
          xAxes: [
            {
              stacked: true  // 積み上げの指定
            }
          ],
          yAxes: [
            {
              stacked: true  //  積み上げの指定
            }
          ]
        }
      }
    }
  }
}
</script>
