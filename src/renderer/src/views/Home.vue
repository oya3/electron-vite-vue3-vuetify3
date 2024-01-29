<template>
  <div class="home">
    <v-btn @click="openFile">Button</v-btn>
    <v-chip>Chip</v-chip>
  </div>
  <div>
     <Tree :config="config" :nodes="nodes"></Tree>
  </div>
</template>


<script setup>
import 'vue3-treeview/dist/style.css';
import Tree from 'vue3-treeview';
import { ref, reactive } from 'vue';

const config = ref({
    roots: ["id1", "id2"], // 第一階層のkey
    checkboxes: true, // チェックボックスあり
    checkMode: 0, // 親階層をチェックした際に子階層もチェックする
    padding: 22,
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
</script>

