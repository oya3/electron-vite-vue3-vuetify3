<template>
  <v-icon :icon="mdiFolder" />folder
  <v-icon :icon="mdiFolderOpen" />open

  <div class="about">
    <h1>This is an about page</h1>
    <Versions />
  </div>
</template>

<script>
// import Versions from '../components/Versions.vue'
import Versions from '@renderer/components/Versions.vue'
import { mdiFolderOpen, mdiFolder } from '@mdi/js'

export default {
  components: {
    Versions
  },
  data() {
    return {
      mdiFolder,
      mdiFolderOpen
    }
  }
}
</script>
