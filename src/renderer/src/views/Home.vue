<template>
  <div class="home">
    <v-icon :icon="mdiAccount" />Main Contents
    <v-btn @click="openFile">Button</v-btn>
    <v-chip>Chip</v-chip>
  </div>
  <div :class="{'dark': darkTheme}">
    <div>{{message}}</div>
     <Tree :config="config" :nodes="nodes"></Tree>
  </div>
  
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2">
          One of three columns
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { mdiAccount, mdiFolderOpen, mdiFolder } from '@mdi/js'
import 'vue3-treeview/dist/style.css';
import Tree from 'vue3-treeview';
import { ref, reactive, inject, watchEffect } from 'vue';

const config = ref({
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
});

const nodes = reactive({
    id1: {
        text: "text1",
        children: ["id11", "id12"],
        state: {
            opened: true, // デフォルトで開く
        }
    },
    id11: {
        text: "text1-1",
        children: [],
    },
    id12: {
        text: "text1-2",
        children: [],
    },
    id2: {
        text: "text2",
        children: ["id21"],
    },
    id21: {
        text: "text2-1",
        children: ["id211"],
    },
    id211: {
        text: "text2-1-1",
        children: [],
    },
});

const openFile = async () => {
  const filePath = await window.api.openFile()
  console.log(filePath)
};

const darkTheme = inject('darkTheme')
const message = ref(false)

watchEffect(() => {
  // nowThemeの値が変更されたときに何かを実行する
  message.value = darkTheme.value
  console.log('darkTheme.value:', darkTheme.value)
})
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
