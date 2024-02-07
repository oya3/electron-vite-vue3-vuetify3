<template>
  <v-icon :icon="mdiFolder" />folder
  <v-icon :icon="mdiFolderOpen" />open

  <div class="about">
    <h1>This is an about page</h1>
    <Versions />
  </div>

  <div>
    <Vue3TreeVue
      :items="vue3TreeVueItems"
      :isCheckable="true"
      :hideGuideLines="false">
      <template v-slot:item-prepend-icon="treeViewItem" >
        <v-icon v-if="treeViewItem.children">
          {{ treeViewItem.expanded ? mdiFolderOpen : mdiFolder }}
        </v-icon>
        <!-- <v-icon>{{ mdiFolder }}</v-icon> -->
      </template>
    </Vue3TreeVue>
  </div>
</template>

<script>
// import Versions from '../components/Versions.vue'
import Versions from '@renderer/components/Versions.vue'
import { mdiFolderOpen, mdiFolder } from '@mdi/js'
import Vue3TreeVue from 'vue3-tree-vue'
import 'vue3-tree-vue/dist/style.css';

export default {
  components: {
    Versions,
    Vue3TreeVue
  },
  data() {
    return {
      mdiFolder,
      mdiFolderOpen,
      vue3TreeVueItems: [
        {
          id: 1,
          name: 'Node 1',
          children: [
            {
              id: 2,
              name: 'Node 1.1',
              children: [
                {
                  id: 3,
                  name: 'Node 1.1.1'
                }
              ]
            },
            {
              id: 10,
              name: 'Node 10.1',
              children: [
                {
                  id: 11,
                  name: 'Node 10.1.1'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: 'Node 2',
          children: [
            {
              id: 5,
              name: 'Node 2.1'
            }
          ]
        }
      ],
    }
  }
}
</script>
