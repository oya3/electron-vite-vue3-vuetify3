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
  <!--
  <div>
    <BaseTree class="mtl-tree" v-model="heTreeData" treeLine>
      <template #default="{ node, stat }">
        <OpenIcon
          v-if="stat.children.length"
          :open="stat.open"
          class="mtl-mr"
          @click.native="stat.open = !stat.open"
          />
        <input
          class="mtl-checkbox mtl-mr"
          type="checkbox"
          v-model="stat.checked"
          />
        <span class="mtl-ml">{{ node.text }}</span>
      </template>
    </BaseTree>
  </div>
  -->
  <div>
    <BaseTree class="mtl-tree" v-model="heTreeData" treeLine>
      <template #default="{ node, stat }">
        <OpenIcon
          v-if="stat.children.length"
          :open="stat.open"
          class="mtl-mr"
          @click.native="stat.open = !stat.open"
          />
        <input
          class="mtl-checkbox mtl-mr"
          type="checkbox"
          v-model="node.myCheck"
          />
        <span class="mtl-ml">{{ node.text }}</span>
      </template>
    </BaseTree>
  </div>
</template>

<script>
// import Versions from '../components/Versions.vue'
import Versions from '@renderer/components/Versions.vue'
import { mdiFolderOpen, mdiFolder } from '@mdi/js'
import Vue3TreeVue from 'vue3-tree-vue'
import 'vue3-tree-vue/dist/style.css';

import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

export default {
  components: {
    Versions,
    Vue3TreeVue,
    BaseTree, Draggable, OpenIcon
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
      heTreeData: [
        {
          text: 'Projects',
          myCheck: false,
          children: [
            {
              text: 'Frontend',
              myCheck: false,
              children: [
                {
                  text: 'Vue',
                  myCheck: false,
                  children: [
                    {
                      text: 'Nuxt',
                      myCheck: false,
                    },
                  ],
                },
                {
                  text: 'React',
                  myCheck: false,
                  children: [
                    {
                      text: 'Next',
                      myCheck: false,
                    },
                  ],
                },
                {
                  text: 'Angular',
                  myCheck: false,
                },
              ],
            },
            {
              text: 'Backend',
              myCheck: false,
            },
          ],
        },
        {
          text: 'Photos',
          myCheck: false,
        },
        {
          text: 'Videos',
          myCheck: false,
        },
      ],
    }
  }
}
</script>
