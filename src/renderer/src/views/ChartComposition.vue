<template>
<br>
<div style="min-width: 800px; width: 100%; height: 100%;">
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
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement, LineElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { inject } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, ArcElement, CategoryScale, LinearScale, zoomPlugin);

export default {
  name: 'ChartComposition',
  components: {
    Tree,
    Line,
  },
  methods: {
    reset_chart() {
      this.$refs.chartCombinedBar.chart.resetZoom();
      console.log('resest');
    },
  },
  inject: ['darkTheme'],
  watch: {
    darkTheme: {
      immediate: true,
      handler(newValue) {
        console.log('darkTheme.value:', newValue);
      },
    },
  },
  data() {
    return {
      tree_config: {
        roots: ['id1', 'id2'], // 第一階層のkey
        checkboxes: true, // チェックボックスあり
        checkMode: 0, // 親階層をチェックした際に子階層もチェックする
        padding: 22,
      },
      tree_nodes: {
        id1: {
          text: '階層1',
          children: ['id11', 'id12'],
          state: {
            opened: true, // デフォルトで開く
          }
        },
        id11: {
          text: '階層1-1',
          children: [],
        },
        id12: {
          text: '階層1-2',
          children: [],
        },
        id2: {
          text: '階層2',
          children: ['id21'],
        },
        id21: {
          text: '階層2-1',
          children: ['id211'],
        },
        id211: {
          text: '階層2-1-1',
          children: [],
        },
      },
      // CombinedLineBar
      chartDataCombinedLineBar: {
        labels: [
          '2000年', '2001年', '2002年', '2003年', '2004年',
          '2005年', '2006年', '2007年', '2008年', '2009年',
          '2010年', '2011年', '2012年', '2013年', '2014年',
          '2015年', '2016年', '2017年', '2018年', '2019年',
        ],
        datasets: [
          {
            label: '系列Ａ',
            data: [
              10, 20, 5, 15, 50,
              10, 20, 5, 15, 50,
              10, 20, 5, 15, 50,
              10, 20, 5, 15, 50,
            ],
            // backgroundColor 背景色 rgba(0, 0, 0, 0.1)
            // borderColor ボーダの色 rgba(0, 0, 0, 0.1)
            // 文字の色 #666
            backgroundColor: 'rgba(18,63,166,0.8)',
            stack: 'combined',
            type: 'bar',
          },
          {
            label: '系列Ｂ',
            data: [
              5, 10, 10, 5, 8,
              10, 20, 5, 15, 50,
              5, 10, 10, 5, 8,
              10, 20, 5, 15, 50,
            ],
            backgroundColor: 'rgba(26,170,222,0.8)',
            stack: 'combined',
            type: 'bar',
          },
          {
            label: '系列C',
            data: [
              15, 20, 20, 15, 18,
              10, 20, 5, 15, 50,
              15, 20, 20, 15, 18,
              10, 20, 5, 15, 50,
            ],
            backgroundColor: 'rgba(120,60,243,0.8)',
            stack: 'combined',
            type: 'bar',
          },
          {
            label: '期待値',
            data: [
              110, 112, 110, 114, 110,
              112, 110, 114, 110, 30,
              110, 113, 110, 112, 114,
              110, 111, 110, 114, 10,
            ],
            backgroundColor: 'rgba(200,200,200,0.8)',
            borderColor: 'rgba(120, 120, 120, 0.8)',
            stack: 'combined',
          },
        ],
      },
      chartOptionsCombinedLineBar: {
        responsive: true,
        scales: {
          x: {
            stacked: true, // 積み上げの指定
            grid: {
              // light, dark テーマ両方でグリッド線が見える色に変更
              color: 'rgba(128, 128, 128, 0.5)',
            },
          },
          y: {
            stacked: true, //  積み上げの指定
            grid: {
              // light, dark テーマ両方でグリッド線が見える色に変更
              color: 'rgba(128, 128, 128, 0.5)',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            fontSize: 20,
            text: '積上げ棒グラフ',
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
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      },
    }; // return
  }, // date()
}; // export default
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