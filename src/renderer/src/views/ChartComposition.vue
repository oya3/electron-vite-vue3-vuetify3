<template>
<br>
<div style="min-width: 800px; width: 100%; height: 100%;">
  <v-row style="width: 100%; height: 100%;">
    <v-col
      cols="2"
      >
      <div :class="{'dark': darkTheme}" style="min-width: 200px;">
        <BaseTree class="mtl-tree" v-model="heTreeData" treeLine :defaultOpen="false">
          <template #default="{ node, stat }">
            <input
              class="mtl-checkbox mtl-mr"
              type="checkbox"
              v-model="stat.checked"
              />
            <v-icon
              v-if="stat.children.length"
              @click="stat.open = !stat.open"
              >
              {{ stat.open ? mdiFolderOpen : mdiFolder }}
            </v-icon>
            <span class="mtl-ml">{{ node.text }}</span>
          </template>
        </BaseTree>
      </div>
    </v-col>
    <v-col
      cols="10"
      >
      <div style="width: 100%; max-height: 650px;">
        <div style="width: 100%; height: 100%;">
          <v-btn @click="resetChart">reset</v-btn>
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

<script setup>
import { mdiFolderOpen, mdiFolder } from '@mdi/js';
import { BaseTree } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement,
  PointElement, LineElement, ArcElement, CategoryScale,
  LinearScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { inject, ref, watch } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, ArcElement, CategoryScale, LinearScale, zoomPlugin);

const name = 'ChartComposition';
const chartCombinedBar = ref(null); // ref 用
const darkTheme = inject('darkTheme');

// @click.native="stat.open = !stat.open" の .native は vue3.x では非推奨
// Vue.jsのコンポーネントが「自身でイベントを発行する」とは、そのコンポーネントが特定のアクション（例えばクリック）に反応して、
// それを親コンポーネントに伝えることを意味します。
// たとえば、あるボタンコンポーネントがあり、そのボタンがクリックされたときに何かを実行したいとします。その場合、ボタンコンポーネントは
// クリックイベントを「自身で発行」します。これは、ボタンコンポーネントがthis.$emit('click')を実行することで行われます。
// そして、親コンポーネントはその発行されたイベントをリッスン（聞く）して、イベントが発生したときに何かを実行します。
// これは、親コンポーネントが@click="doSomething"のように記述することで行われます。
// したがって、コンポーネントが「自身でクリックイベントを発行しない」場合とは、そのコンポーネントがクリックされたときに
// this.$emit('click')を実行しない、つまり親コンポーネントにクリックされたことを伝えない場合を指します。
// このような場合でも、Vue.js 2.xの時代には.native修飾子を使うことで、コンポーネントのルート要素がクリックされたときに
// 親コンポーネントで何かを実行することができました。しかし、Vue.js 3.0以降では、この.native修飾子は非推奨となり、代わりに
// コンポーネントが自身のクリックイベントを発行するようになりました。

const resetChart = () => {
  chartCombinedBar.value.chart.resetZoom();
  console.log('reset');
};

watch(darkTheme, (newValue) => {
  console.log('darkTheme.value:', newValue);
}, { immediate: true }); // trueの場合、初期化時にも呼ばれる。falseの場合、変更後に呼ばれる

const heTreeData = ref([
  {
    text: 'Projects',
    children: [
      {
        text: 'Frontend',
        children: [
          {
            text: 'Vue',
            children: [
              {
                text: 'Nuxt',
              },
            ],
          },
          {
            text: 'React',
            children: [
              {
                text: 'Next',
              },
            ],
          },
          {
            text: 'Angular',
          },
        ],
      },
      {
        text: 'Backend',
      },
    ],
  },
]);

// CombinedLineBar
const chartDataCombinedLineBar = ref({
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
});

const chartOptionsCombinedLineBar = ref({
  responsive: true,
  scales: {
    x: {
      stacked: true, // 積み上げの指定
      grid: {
        color: 'rgba(128, 128, 128, 0.5)',
      },
    },
    y: {
      stacked: true, //  積み上げの指定
      grid: {
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
        enabled: true, // パンを有効にする
      },
      limits: {
        x: { min: 0, max: 200 },
        y: { min: 0, max: 200 },
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
});
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
