<template>
<br>
<div style="min-width: 800px; width: 100%; height: 100%;">
  <v-btn @click="resetChart">reset</v-btn>
  <Bar
    ref="chartCombinedBar"
    :options="options"
    :data="data"
    />
</div>
</template>

<script setup>
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement,
  PointElement, LineElement, ArcElement, CategoryScale,
  LinearScale, TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { inject, ref, reactive, watch } from 'vue';
import 'chartjs-adapter-date-fns';

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, ArcElement, CategoryScale, LinearScale, TimeScale, zoomPlugin);

const chartCombinedBar = ref(null); // ref 用
const darkTheme = inject('darkTheme');

const resetChart = () => {
  chartCombinedBar.value.chart.resetZoom();
  console.log('reset');
};

watch(darkTheme, (newValue) => {
  console.log('darkTheme.value:', newValue);
}, { immediate: true }); // trueの場合、初期化時にも呼ばれる。falseの場合、変更後に呼ばれる

const data = reactive({
  labels: ["Project 1", "Project 2"],
  datasets: [
    {
      label: 'Task 1',
      data: [
        null,
        [new Date('2021-09-11T00:00:00'), new Date('2021-09-13T00:00:00')],
      ],
      backgroundColor: "red",
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: 'Task 2',
      data: [
        [new Date('2021-09-12T00:00:00'), new Date('2021-09-14T00:00:00')],
        [new Date('2021-09-14T00:00:00'), new Date('2021-09-15T00:00:00')],
      ],
      backgroundColor: "blue",
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: 'Task 3',
      data: [
        null,
        [new Date('2021-09-16T00:00:00'), new Date('2021-09-18T00:00:00')],
      ],
      backgroundColor: "orange",
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
});

const options = reactive({
  responsive: true,
  indexAxis: 'y',
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Floating Horizontal Bar Chart',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          var label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.raw.length) {
            label += new Date(context.raw[0]).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) + ' ~ ' + new Date(context.raw[1]).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
          } else {
            label += context.raw !== null ? new Date(context.raw).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) : '';
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      stacked: true,
      grid: {
        // light, dark テーマ両方でグリッド線が見える色に変更
        color: 'rgba(128, 128, 128, 0.5)',
      },
    },
    x: {
      type: 'time',
      grid: {
        // light, dark テーマ両方でグリッド線が見える色に変更
        color: 'rgba(128, 128, 128, 0.5)',
      },
      time: {
        // Luxon format string
        // tooltipFormat: 'yyyy/MM/dd HH:mm:ss',
        tooltipFormat: 'yyyy/MM/dd',
        displayFormats: {
          day: 'yyyy/MM/dd'
        },
        unit: 'day',
        timeZone: 'Asia/Tokyo', // タイムゾーンを設定
      },
      min: new Date('2021-09-11T00:00:00'),
      max: new Date('2021-09-18T00:00:00'),
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
