<template>
  <div ref="graph"></div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import Plotly from "plotly.js-dist-min";

const graph = ref(null); // ref<HTMLDivElement>();
const data = reactive([
  {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
]);

onMounted(() => {
  if (!graph.value) return;
  Plotly.newPlot(graph.value, data);
});

setInterval(() => {
  data[0].y[3] += 1;
  for (let i = 0; i < data[0].y.length; i++) {
    data[0].y[i] = Math.random();
  }
}, 2000);

watch(data, () => {
  if (!graph.value) return;
  Plotly.redraw(graph.value);
});

</script>
