<!--
<template>
  <div ref="graph"></div>
</template>
-->

<!-- <script setup> -->
/*
import { onMounted, inject, reactive, ref, watch } from "vue";
import Plotly from "plotly.js-dist-min";

const graph = ref(null);

const data = [
  {
    name: 'Plan',
    type: 'bar',
    x: ['2023-01-10', '2023-02-20', '2023-03-15'],
    y: ['Task 1', 'Task 2', 'Task 3'],
    orientation: 'h',
    // base: ['2023-01-01', '2023-02-01', '2023-03-01'],
    width: 0.4,
    marker: {
      color: 'rgba(50,171,96,0.6)',
      line: {
        color: 'rgba(50,171,96,1.0)',
        width: 1,
      },
    },
  },
  {
    name: 'Actual',
    type: 'bar',
    x: ['2023-01-15', '2023-02-25', '2023-03-20'],
    y: ['Task 1', 'Task 2', 'Task 3'],
    orientation: 'h',
    // base: ['2023-01-01', '2023-02-01', '2023-03-01'],
    width: 0.4,
    marker: {
      color: 'rgba(219,64,82,0.6)',
      line: {
        color: 'rgba(219,64,82,1.0)',
        width: 1,
      },
    },
  },
];

const layout = {
  title: 'Gantt Chart with Plan and Actual',
  xaxis: {
    title: 'Date',
    type: 'date',
    range: ['2022-12-01', '2023-12-01'],
    tickformat: '%Y/%m/%d',
  },
  yaxis: {
    title: 'Tasks',
    autorange: 'reversed',
  },
  barmode: 'group',
};
*/

/*
let {data, layout, config} = {
  'data': [
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-01-01',
        '2017-02-02'
      ],
      'y': [
        3,
        3
      ],
      'type': 'scatter',
      'uid': 'c249743a-db89-442f-aabb-fc6117be6660'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-02-15',
        '2017-03-15'
      ],
      'y': [
        3,
        3
      ],
      'type': 'scatter',
      'uid': 'cdd772d3-35ed-4080-aace-52abf5f5f73a'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-01-17',
        '2017-02-17'
      ],
      'y': [
        2,
        2
      ],
      'type': 'scatter',
      'uid': 'e6725fd1-c7b9-4cef-8779-b68dcbc0bbb9'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-01-17',
        '2017-02-17'
      ],
      'y': [
        2,
        2
      ],
      'type': 'scatter',
      'uid': 'fa5c840a-a2fe-4a09-928b-693034b034b1'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-03-10',
        '2017-03-20'
      ],
      'y': [
        1,
        1
      ],
      'type': 'scatter',
      'uid': '6591aa19-6fe0-47ea-afce-0bc882bd2cc5'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-04-01',
        '2017-04-20'
      ],
      'y': [
        1,
        1
      ],
      'type': 'scatter',
      'uid': 'e18ffc2b-72fb-4858-a0b6-7baae6a76870'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-05-18',
        '2017-06-18'
      ],
      'y': [
        1,
        1
      ],
      'type': 'scatter',
      'uid': 'ff9b45a3-de8d-44e7-b148-f4d3c95a33c1'
    },
    {
      'marker': {
        'color': 'white'
      },
      'name': '',
      'showlegend': false,
      'x': [
        '2017-01-14',
        '2017-03-14'
      ],
      'y': [
        0,
        0
      ],
      'type': 'scatter',
      'uid': '7f9edd3f-cb1d-4a5e-8083-270fb3a17a41'
    },
    {
      'hoverinfo': 'none',
      'marker': {
        'color': 'rgb(0, 255, 100)',
        'size': 1
      },
      'name': 'Complete',
      'showlegend': true,
      'x': [
        '2017-01-14',
        '2017-01-14'
      ],
      'y': [
        0,
        0
      ],
      'type': 'scatter',
      'uid': '2995afea-42d5-4f5c-a882-9a093a2ec189'
    },
    {
      'hoverinfo': 'none',
      'marker': {
        'color': 'rgb(255, 230, 41)',
        'size': 1
      },
      'name': 'Incomplete',
      'showlegend': true,
      'x': [
        '2017-01-14',
        '2017-01-14'
      ],
      'y': [
        1,
        1
      ],
      'type': 'scatter',
      'uid': 'ed7fac13-428a-4ecd-af0a-02984d8ab28a'
    },
    {
      'hoverinfo': 'none',
      'marker': {
        'color': 'rgb(220, 0, 0)',
        'size': 1
      },
      'name': 'Not Started',
      'showlegend': true,
      'x': [
        '2017-01-14',
        '2017-01-14'
      ],
      'y': [
        2,
        2
      ],
      'type': 'scatter',
      'uid': '37f8896d-3f6a-47da-9fa5-ce98035c1658'
    }
  ],
  'layout': {
    'height': 600,
    'hovermode': 'closest',
    'shapes': [
      {
        'fillcolor': 'rgb(0, 255, 100)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-01-01',
        'x1': '2017-02-02',
        'xref': 'x',
        'y0': 2.8,
        'y1': 3.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(255, 230, 41)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-02-15',
        'x1': '2017-03-15',
        'xref': 'x',
        'y0': 2.8,
        'y1': 3.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(220, 0, 0)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-01-17',
        'x1': '2017-02-17',
        'xref': 'x',
        'y0': 1.8,
        'y1': 2.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(0, 255, 100)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-01-17',
        'x1': '2017-02-17',
        'xref': 'x',
        'y0': 1.8,
        'y1': 2.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(220, 0, 0)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-03-10',
        'x1': '2017-03-20',
        'xref': 'x',
        'y0': 0.8,
        'y1': 1.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(220, 0, 0)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-04-01',
        'x1': '2017-04-20',
        'xref': 'x',
        'y0': 0.8,
        'y1': 1.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(220, 0, 0)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-05-18',
        'x1': '2017-06-18',
        'xref': 'x',
        'y0': 0.8,
        'y1': 1.2,
        'yref': 'y'
      },
      {
        'fillcolor': 'rgb(0, 255, 100)',
        'line': {
          'width': 0
        },
        'opacity': 1,
        'type': 'rect',
        'x0': '2017-01-14',
        'x1': '2017-03-14',
        'xref': 'x',
        'y0': -0.2,
        'y1': 0.2,
        'yref': 'y'
      }
    ],
    'showlegend': true,
    'title': {
      'text': 'Gantt Chart'
    },
    'width': 900,
    'xaxis': {
      'rangeselector': {
        'buttons': [
          {
            'count': 7,
            'label': '1w',
            'step': 'day',
            'stepmode': 'backward'
          },
          {
            'count': 1,
            'label': '1m',
            'step': 'month',
            'stepmode': 'backward'
          },
          {
            'count': 6,
            'label': '6m',
            'step': 'month',
            'stepmode': 'backward'
          },
          {
            'count': 1,
            'label': 'YTD',
            'step': 'year',
            'stepmode': 'todate'
          },
          {
            'count': 1,
            'label': '1y',
            'step': 'year',
            'stepmode': 'backward'
          },
          {
            'step': 'all'
          }
        ]
      },
      'showgrid': false,
      'type': 'date',
      'zeroline': false,
      'tickformat': '%Y/%m/%d',
    },
    'yaxis': {
      'autorange': false,
      'range': [
        -1,
        5
      ],
      'showgrid': false,
      'ticktext': [
        'Job-4',
        'Job-3',
        'Job-2',
        'Job-1'
      ],
      'tickvals': [
        0,
        1,
        2,
        3
      ],
      'zeroline': false
    }
  },
  'config': {
    'showLink': false,
    'linkText': 'Export to plot.ly',
    'plotlyServerURL': 'https://plot.ly'
  }
};
*/

<template>
  <div ref="graph"></div>
</template>

<script setup>
import { onMounted, inject, reactive, ref, watch } from "vue";
import Plotly from "plotly.js-dist-min";

const graph = ref(null);

/*
const data = [
  {
    x: ['2009-01-01', '2009-03-05', '2009-02-20'],
    x2: ['2009-02-28', '2009-04-15', '2009-05-30'],
    y: ['Alex', 'Alex', 'Max'],
    type: 'bar',
    orientation: 'h',
    marker: {
      color: ['#1f77b4', '#ff7f0e', '#2ca02c'],
    },
    text: ['Job A', 'Job B', 'Job C'],
    hoverinfo: 'y+text',
  },
];

const layout = {
  title: 'Timeline',
  barmode: 'stack',
  yaxis: {
    autorange: 'reversed',
  },
};
*/

/*
// -------------------------------------------------------------------------------
// bar で2個のタスクを並べてるが、終端が設定できない＋アイドル時間（空き時間）が設定できない
const data = [
  {
    type: 'bar',
    x: ['2009-01-01', '2009-01-01', '2009-03-05', '2009-06-20', '2009-10-20'],
    y: ['Job A', 'Job A', 'Job B', 'Job C', 'Job C'],
    base: ['2009-02-28', '2009-01-28', '2009-04-15', '2009-05-30', '2009-08-30'],
    orientation: 'h',
    marker: { color: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'] },
    text: ['Alex', 'Max', 'Alex', 'Alex', 'Max'],
    hoverinfo: 'text',
  }
];

const layout = {
  title: 'Gantt chart',
  barmode: 'group',
  xaxis: {
    title: 'Date',
    type: 'date',
    range: ['2009-01-01', '2010-12-01'],
    tickformat: '%Y/%m/%d',
  },
  yaxis: {
    autorange: 'reversed',
  }
};

onMounted(() => {
  if (!graph.value) return;
  // Plotly.newPlot(graph.value, data, layout);
  Plotly.newPlot(graph.value, data, layout);
});
*/

/*
// -------------------------------------------------------------------------------
// traceを2個、同名のnameして2個のタスクを並べてる。が、凡例にalexが2個並ぶ。。。
var data = [
  {
    x: ['2009-01-01', '2009-02-28'],
    y: ['Job A', 'Job A'],
    mode: 'lines',
    name: 'Alex',
    hoverinfo: 'name+x',
    line: {color: '#1f77b4', width: 20},
    // hoveron: 'fills'
  },
  {
    x: ['2009-03-05', '2009-04-15'],
    y: ['Job A', 'Job A'],
    mode: 'lines',
    name: 'Alex',
    hoverinfo: 'name+x',
    line: {color: '#1f77b4', width: 20},
    // hoveron: 'fills'
  },
  {
    x: ['2009-02-20', '2009-05-30'],
    y: ['Job C', 'Job C'],
    mode: 'lines',
    name: 'Max',
    hoverinfo: 'name+x',
    line: {color: '#ff7f0e', width: 20},
    // hoveron: 'fills'
  }
];

// レイアウトの設定
var layout = {
  title: 'Gantt Chart',
  yaxis: {
    title: 'Job',
    showgrid: false,
    zeroline: false,
    autorange: 'reversed',
  },
  xaxis: {
    title: 'Date',
    showgrid: false,
    zeroline: false
  },
  hovermode: 'closest'
};

onMounted(() => {
  if (!graph.value) return;
  // Plotly.newPlot(graph.value, data, layout);
  Plotly.newPlot(graph.value, data, layout);
});
*/

/*
// -------------------------------------------------------------------------------
// traceを2個、同名のnameして2個のタスクを並べてる。が、凡例にalexが2個並ぶ。。。
var data = [
  {
    x: ['2009-01-01', '2009-02-28'],
    y: ['Job A', 'Job A'],
    mode: 'lines+markers',
    name: 'Job A',
    hoverinfo: 'name+x',
    line: {color: '#1f77b4', width: 20},
  },
  {
    x: ['2009-03-05', '2009-04-15'],
    y: ['Job A', 'Job A'],
    mode: 'lines+markers',
    name: 'Job A',
    hoverinfo: 'name+x',
    line: {color: '#1f77b4', width: 20},
  },
  {
    x: ['2009-02-20', '2009-05-30'],
    y: ['Job C', 'Job C'],
    mode: 'lines+markers',
    name: 'Job C',
    hoverinfo: 'name+x',
    line: {color: '#ff7f0e', width: 20},
  }
];

// レイアウトの設定
var layout = {
  title: 'Gantt Chart',
  yaxis: {
    title: 'Job',
    showgrid: false,
    zeroline: false,
    autorange: 'reversed',
  },
  xaxis: {
    title: 'Date',
    showgrid: false,
    zeroline: false
  },
  hovermode: 'closest'
};

onMounted(() => {
  if (!graph.value) return;
  Plotly.newPlot(graph.value, data, layout);
});
*/

/*
// -------------------------------------------------------------------------------
// traceを2個、同名のnameして2個のタスクを並べてる。が、凡例にalexが2個並ぶ。。。
const trace1 = {
  x: ['2009-01-01', '2009-02-28'], // Alexの活動期間
  y: ['Alex', 'Alex'], // リソース名
  mode: 'lines',
  name: 'Alex',
  line: {color: 'blue', width: 20}
}

const trace2 = {
  x: ['2009-04-01', '2009-05-28'], // Alexの活動期間
  y: ['Alex', 'Alex'], // リソース名
  mode: 'lines',
  name: 'Alex',
  line: {color: 'blue', width: 20}
}

const trace3 = {
  x: ['2009-03-01', '2009-06-30'], // Maxの活動期間
  y: ['Max', 'Max'], // リソース名
  mode: 'lines',
  name: 'Max',
  line: {color: 'red', width: 20}
}

const data = [trace1, trace2, trace3]

const layout = {
  showlegend: true,
  xaxis: {
    showgrid: false,
    showline: true,
    linecolor: 'rgb(102, 102, 102)',
    titlefont: {font: {color: 'rgb(204, 204, 204)'}},
    tickfont: {font: {color: 'rgb(102, 102, 102)'}},
    autotick: false,
    dtick: 'M1',
    ticks: 'outside',
    tickcolor: 'rgb(102, 102, 102)'
  },
  yaxis: {
    autorange: 'reversed',
  },
  margin: {l: 140, r: 40, b: 50, t: 80},
  legend: {font: {size: 10}, yanchor: 'middle', xanchor: 'right'},
  width: 800,
  height: 600,
  paper_bgcolor: 'rgb(254, 247, 234)',
  plot_bgcolor: 'rgb(254, 247, 234)',
  hovermode: 'closest'
}

onMounted(() => {
  if (!graph.value) return;
  Plotly.newPlot(graph.value, data, layout);
});
*/

// -------------------------------------------------------------------------------
// null を用いて2個のタスクを表示している。
const trace1 = {
  x: ['2009-01-01', '2009-02-28', null, '2009-04-01', '2009-05-28'], // Alexの活動期間
  y: ['Alex', 'Alex', null, 'Alex', 'Alex'], // リソース名
  mode: 'lines',
  name: 'Alex',
  line: {color: 'blue', width: 20}
}

const trace3 = {
  x: ['2009-03-01', '2009-06-30'], // Maxの活動期間
  y: ['Max', 'Max'], // リソース名
  mode: 'lines',
  name: 'Max',
  line: {color: 'red', width: 20}
}

const data = [trace1, trace3]

const layout = {
  showlegend: true,
  xaxis: {
    showgrid: false,
    showline: true,
    linecolor: 'rgb(102, 102, 102)',
    titlefont: {font: {color: 'rgb(204, 204, 204)'}},
    tickfont: {font: {color: 'rgb(102, 102, 102)'}},
    autotick: false,
    dtick: 'M1',
    ticks: 'outside',
    tickcolor: 'rgb(102, 102, 102)'
  },
  yaxis: {
    autorange: 'reversed',
  },
  margin: {l: 140, r: 40, b: 50, t: 80},
  legend: {font: {size: 10}, yanchor: 'middle', xanchor: 'right'},
  width: 800,
  height: 600,
  paper_bgcolor: 'rgb(254, 247, 234)',
  plot_bgcolor: 'rgb(254, 247, 234)',
  hovermode: 'closest'
}

onMounted(() => {
  if (!graph.value) return;
  Plotly.newPlot(graph.value, data, layout);
});

</script>

