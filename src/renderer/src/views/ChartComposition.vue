<template>
  <br>
  <div style="min-width: 800px; width: 100%; height: 100%;">  <!-- <v-container class="bg-surface-variant"> -->
      <v-row style="width: 100%; height: 100%;">
        <v-col
          cols="2"
          >
          <div :class="{'dark': darkTheme}" style="min-width: 200px;">
            <Tree :config="tree_config" :nodes="tree_nodes"></Tree>
          </div>
        </v-col>
        <v-col
          cols="10"
          >
          <div style="width: 100%; max-height: 650px;"> 
            <div style="width: 100%; height: 100%;">
              <v-btn @click="reset_chart">reset</v-btn>
              <Line
                ref="chartCombinedBar"
                :options="chartOptionsCombinedLineBar"
                :data="chartDataCombinedLineBar"
                />
            </div>
          </div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import Tree from 'vue3-treeview';
import { Bar, Line, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement, LineElement, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';
import { inject } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, ArcElement, CategoryScale, LinearScale, zoomPlugin)

export default {
  name: 'ChartComposition',
  components: {
    Tree,
    Bar,
    Line,
    Pie
  },
  methods: {
    reset_chart(){
      this.$refs.chartBar.chart.resetZoom()
      this.$refs.chartLine.chart.resetZoom()
      this.$refs.chartCombinedBar.chart.resetZoom()
      console.log("resest");
    },
  },
  inject: ['darkTheme'],
  watch: {
    darkTheme: {
      immediate: true,
      handler(newValue) {
        console.log('darkTheme.value:', newValue);
      }
    }
  },
  data() {
    return {
      tree_config: {
        roots: ["id1", "id2"], // 第一階層のkey
        checkboxes: true, // チェックボックスあり
        checkMode: 0, // 親階層をチェックした際に子階層もチェックする
        padding: 22,
        /*
          openedIcon: {
          type: "shape",
          d: mdiFolderOpen,
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          },
          closedIcon: {
          type: "shape",
          d: mdiFolder,
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          },
        */
      },
      tree_nodes: {
        id1: {
          text: "階層1",
          children: ["id11", "id12"],
          state: {
            opened: true, // デフォルトで開く
          }
        },
        id11: {
          text: "階層1-1",
          children: [],
        },
        id12: {
          text: "階層1-2",
          children: [],
        },
        id2: {
          text: "階層2",
          children: ["id21"],
        },
        id21: {
          text: "階層2-1",
          children: ["id211"],
        },
        id211: {
          text: "階層2-1-1",
          children: [],
        },
      },
      chartOptionsCombinedLineBar: {
        responsive: true,
        scales: {
          x: {
            stacked: true,  // 積み上げの指定
            grid: {
              color: 'rgba(128, 128, 128, 0.5)',  // light, dark テーマ両方でグリッド線が見える色に変更
            },
          },
          y: {
            stacked: true,  //  積み上げの指定
            grid: {
              color: 'rgba(128, 128, 128, 0.5)',  // light, dark テーマ両方でグリッド線が見える色に変更
            },
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

      // // combined_Line
      // chartDataCombinedLine: {
      //   labels:  ["00時", "01時", "02時", "03時", "04時",
      //             "05時", "06時", "07時", "08時", "09時",
      //             "10時", "11時", "12時", "13時", "14時",
      //             "15時", "16時", "17時", "18時", "19時"],
      //   datasets: [
      //     {
      //       label: "Bar1",
      //       data: [10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50],
      //       backgroundColor: "red",
      //       stack: 'combined',
      //       type: 'bar'
      //     },
      //     {
      //       label: "Bar1",
      //       data: [10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50, 10, 20,  5, 15, 50],
      //       backgroundColor: "green",
      //       stack: 'combined',
      //       type: 'bar'
      //     },
      //     {
      //       label: "Line1",
      //       data: [ 5, 10, 10,  5,  8, 10, 20,  5, 15, 50,  5, 10, 10,  5,  8, 10, 20,  5, 15, 50],
      //       backgroundColor: "blue",
      //       stack: 'combined'
      //     },
      //   ]
      // },
      // chartOptionsCombinedLine: {
      //   plugins: {
      //     title: {
      //       display: true,
      //       text: 'Chart.js Stacked Line/Bar Chart'
      //     }
      //   },
      //   scales: {
      //     y: {
      //       stacked: true
      //     }
      //   }
      // },
    }
  }
}
</script>

<style>
.dark .tree .node-text {
  color: #fff;
}
.dark .tree svg path {
  fill: #fff !important;
}
.dark .tree .node-wrapper:focus {
  background-color: #888;
}
.dark .tree .node-wrapper:hover {
  background-color: #888;
}
</style>
