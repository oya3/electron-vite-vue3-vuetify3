<template>
  <!-- リスト関連は以下が参考になる
       - Vuetify 3 Vue 3 Lists Example
         https://webvees.com/post/vuetify-3-vue-3-lists-example/ 
    -->
  <v-card class="mx-auto" width="300">
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-home" title="Home">
        <template v-slot:prepend>
          <v-icon :icon="mdiChartBar" />
        </template>
      </v-list-item>

      <v-list-group value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Admin">
            <template v-slot:prepend>
              <v-icon :icon="mdiChartBar" />
            </template>
          </v-list-item>
        </template>
        <v-list-item title="PlotlyBar" value="plotlybar" @click="$router.push({ path: '/plotly/bar' })">
          <template v-slot:prepend>
            <v-icon :icon="mdiChartBar" />
          </template>
        </v-list-item>
        <v-list-item title="PlotlyGantt" value="plotlygantt" @click="$router.push({ path: '/plotly/Gantt' })">
          <template v-slot:prepend>
            <v-icon :icon="mdiChartBar" />
          </template>
        </v-list-item>
      </v-list-group>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Users"></v-list-item>
        </template>
        <v-list-item title="PlotlyBar" value="plotlybar" @click="$router.push({ path: '/plotly/bar' })">
          <template v-slot:prepend>
            <v-icon :icon="mdiChartBar" />
          </template>
        </v-list-item>
        <v-list-item title="PlotlyGantt" value="plotlygantt" @click="$router.push({ path: '/plotly/Gantt' })">
          <template v-slot:prepend>
            <v-icon :icon="mdiChartBar" />
          </template>
        </v-list-item>
      </v-list-group>

    </v-list>
  </v-card>
</template>

<script setup>
import {
  mdiHomeAccount, mdiChartBar, mdiInformationOutline, mdiWeatherNight, mdiWeatherSunny,
  mdiVideo3dVariant, mdiAccount } from '@mdi/js'
import { ref, provide } from 'vue'
import { useTheme } from 'vuetify'
let open = ref(['Admin', 'Users']); // 最初からlist-group を開けておきたいグループ名を指定しておく
</script>
