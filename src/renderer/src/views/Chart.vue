<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions2"
    :data="chartData2"
  />
  <div>  <!-- <v-container class="bg-surface-variant"> -->
    <v-row style="width: 100%; height: 100%;">
      <v-col
        cols="6"
      >
        <Bar
          :options="chartOptions"
          :data="chartData"
          />
      </v-col>
      <v-col
        cols="6"
      >
        <Bar
          :options="chartOptions"
          :data="chartData"
          />
      </v-col>
    </v-row>
  </div>   <!-- </v-container> -->
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
      chartData2: {
        labels:  ["00年", "05年", "10年", "15年", "20年", "00年", "05年", "10年", "15年", "20年", "00年", "05年", "10年", "15年", "20年", "00年", "05年", "10年", "15年", "20年"],
        datasets: [
          {
            label: "系列Ａ",
            data: [10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50],
            backgroundColor: "red"
          },
          {
            label: "系列Ｂ",
            data: [ 5, 10, 10,  5,  8, 10, 20,  5, 15, 50,  5, 10, 10,  5,  8, 10, 20,  5, 15, 50],
            backgroundColor: "blue"
          },
          {
            label: "系列C",
            data: [ 15, 20, 20,  15,  18, 10, 20,  5, 15, 50,  15, 20, 20,  15,  18, 10, 20,  5, 15, 50],
            backgroundColor: "green"
          }
        ]
      },
      chartOptions2: {
        responsive: true,
        scales: {
          x: {
            stacked: true,  // 積み上げの指定
          },
          y: {
            stacked: true,  //  積み上げの指定
          }
        },
        plugins: {
          title: {
            display: true,
            fontSize: 20,
            text: "積上げ棒グラフ"
          },
          zoom: {
            pan: {
              // pan options and/or events
              enabled: true, // パンを有効にする
              // mode: 'xy', // 'x'| 'y'|'xy' 'xy' 許可されるパン方向
              // scaleMode: 'xy',
            },
            limits: {
              // axis limits
              x: {min: 0, max: 200},
              y: {min: 0, max: 200},
              // x: {min: 0},
              // y: {min: 0},
            },
            zoom: {
              wheel: {
                enabled: true,
                modifierKey: 'ctrl',
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            }
          }
        }
      },
      chartData: {
        labels:  ["00年", "05年", "10年", "15年", "20年", "00年", "05年", "10年", "15年", "20年", "00年", "05年", "10年", "15年", "20年", "00年", "05年", "10年", "15年", "20年"],
        datasets: [
          {
            label: "系列Ａ",
            data: [10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50],
            backgroundColor: "red"
          },
          {
            label: "系列Ｂ",
            data: [ 5, 10, 10,  5,  8, 10, 20,  5, 15, 50,  5, 10, 10,  5,  8, 10, 20,  5, 15, 50],
            backgroundColor: "blue"
          },
          {
            label: "系列C",
            data: [ 15, 20, 20,  15,  18, 10, 20,  5, 15, 50,  15, 20, 20,  15,  18, 10, 20,  5, 15, 50],
            backgroundColor: "green"
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            stacked: true,  // 積み上げの指定
          },
          y: {
            stacked: true,  //  積み上げの指定
          }
        },
        plugins: {
          title: {
            display: true,
            fontSize: 20,
            text: "積上げ棒グラフ"
          },
          zoom: {
            pan: {
              // pan options and/or events
              enabled: true, // パンを有効にする
              // mode: 'xy', // 'x'| 'y'|'xy' 'xy' 許可されるパン方向
              // scaleMode: 'xy',
            },
            limits: {
              // axis limits
              x: {min: 0, max: 200},
              y: {min: 0, max: 200},
            },
            zoom: {
              wheel: {
                enabled: true,
                // speed: 0.0001,  // ズームの速度を調整
                modifierKey: 'ctrl',
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
