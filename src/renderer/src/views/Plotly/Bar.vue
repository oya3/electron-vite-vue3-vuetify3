<template>
  <div>{{clickBarName}}</div>
  <div id="graph"></div>
</template>

<script setup>
import { onMounted, inject, reactive, ref, watch } from "vue";
import Plotly from "plotly.js-dist-min";
const darkTheme = inject('darkTheme');
const vuetify = inject('vuetify');
const clickBarName = ref('');

// データの準備
const data = reactive([{
  x: ['ネズミ', 'リス', '犬', '猫', 'サル', 'マングース'],
  y: [20, 14, 23, 20, 14, 23],
  type: 'bar',
  marker: {
    color: ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)'], // 棒ごとの色を変更
  },
}]);

// レイアウトの設定
const layout = reactive({
  title: '動物の数',
  font: {
    family: 'Raleway, sans-serif',
  },
  showlegend: false,
  xaxis: {
    tickangle: -45,
  },
  yaxis: {
    zeroline: false,
    gridwidth: 2,
  },
  bargap: 0.05,
  plot_bgcolor: 'rgb(233, 233, 233)', // 背景色を変更
  paper_bgcolor: 'rgb(100, 233, 233)', // 背景色を変更
});

// コンフィグの設定
const config = {
  responsive: true, // レスポンシブにする
  displaylogo: false, // Plotlyのロゴを削除
  modeBarButtonsToRemove: [ // 削除するツールボタン
    // 'zoom2d',
    // 'pan2d',
    // 'select2d',
    // 'lasso2d',
    // 'zoomIn2d',
    // 'zoomOut2d',
    // 'autoScale2d',
    // 'resetScale2d',
    // 'hoverClosestCartesian',
    // 'hoverCompareCartesian',
    // 'toggleSpikelines',
    // 'toImage',
  ],

};

onMounted(() => {
  Plotly.newPlot( 'graph', data, layout, config);
  const graphDiv = document.getElementById('graph');
  graphDiv.on('plotly_click', function(data) {
    const xValue = data.points[0].x;
    clickBarName.value = xValue;
    console.log(xValue + 'がクリックされました');
  });
});

watch(darkTheme, (newValue) => {
  if (true) { // renderer が生成されてないと背景色を設定できない
    if (darkTheme.value) {
      layout.plot_bgcolor = 'rgb(123, 123, 123)'
      layout.paper_bgcolor = 'rgb(110, 123, 123)'
    } else {
      layout.plot_bgcolor = 'rgb(233, 233, 233)'
      layout.paper_bgcolor = 'rgb(100, 233, 233)'
    }
    Plotly.redraw( 'graph', data, layout, config);
    // Plotly.redraw(graph.value);
  }
  console.log('darkTheme.value:', newValue);
}, { immediate: false }); // trueの場合、初期化時にも呼ばれる。falseの場合、変更後に呼ばれる

</script>
