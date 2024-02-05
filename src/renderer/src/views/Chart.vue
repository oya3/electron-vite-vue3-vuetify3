<template>
  <br>
  <div style="width: 100%; height: 100%;">  <!-- <v-container class="bg-surface-variant"> -->
      <v-row style="width: 100%; height: 100%;">
        <v-col
          cols="2"
          >
          <div :class="{'dark': darkTheme}">
            <Tree :config="tree_config" :nodes="tree_nodes"></Tree>
          </div>
        </v-col>
        <v-col
          cols="10"
          >
          <div style="width: 100%; height: 550px;"> 
            <v-row style="width: 100%; height: 100%;">
              <Bar
                :options="chartOptions2"
                :data="chartData2"
                />
            </v-row>
          </div>
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
        </v-col>
      </v-row>
  </div>
</template>

<script>
import Tree from 'vue3-treeview';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';
import { inject } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin)

export default {
  name: 'BarChart',
  components: {
    Tree,
    Bar
  },
  methods: {
    reset_chart01(){
      this.$refs.chart01.chart.resetZoom()
      console.log("resest");
    },
  },
  inject: ['darkTheme'],
  watch: {
    darkTheme: {
      immediate: true,
      handler(newValue) {
        // if(this.renderer){  // renderer が生成されてないと背景色を設定できない
        //   this.setClearColor();
        // }
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
      chartData2: {
        labels:  [
          "2000年", "2001年", "2002年", "2003年", "2004年",
          "2005年", "2006年", "2007年", "2008年", "2009年",
          "2010年", "2011年", "2012年", "2013年", "2014年",
          "2015年", "2016年", "2017年", "2018年", "2019年"
        ],
        datasets: [
          {
            label: "系列Ａ",
            data: [
              10, 20,  5, 15, 50,
              10, 20,  5, 15, 50,
              10, 20,  5, 15, 50,
              10, 20,  5, 15, 50
            ],
            // borderColor: '#36A2EB',
            // backgroundColor: "red"
            backgroundColor: "rgba(18,63,166,0.8)",
          },
          {
            label: "系列Ｂ",
            data: [
              5, 10, 10,  5,  8,
              10, 20,  5, 15, 50,
              5, 10, 10,  5,  8,
              10, 20,  5, 15, 50
            ],
            backgroundColor: "rgba(26,170,222,0.8)",
          },
          {
            label: "系列C",
            data: [
              15, 20, 20, 15, 18,
              10, 20,  5, 15, 50,
              15, 20, 20, 15, 18,
              10, 20,  5, 15, 50
            ],
            backgroundColor: "rgba(120,60,243,0.8)",
          }
        ]
      },
      chartOptions2: {
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
      chartData: {
        labels:  ["00時", "01時", "02時", "03時", "04時",
                  "05時", "06時", "07時", "08時", "09時",
                  "10時", "11時", "12時", "13時", "14時",
                  "15時", "16時", "17時", "18時", "19時"],
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
