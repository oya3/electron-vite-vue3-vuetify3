<template>
<v-app>
  <v-app-bar color="primary">

    <v-app-bar-nav-icon 
      variant="text"
      @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

    <v-app-bar-title>
      Application
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
  >
    <!-- <v-list nav> -->
    <!--   <v-list-item prepend-icon="mdiAccount" title="Home" value="home"></v-list-item> -->
    <!--   <v-list-item prepend-icon="mdiAccount" title="About" value="about"></v-list-item> -->
    <!-- </v-list> -->
    <v-list nav>
      <v-list-item title="Home" value="home">
        <template v-slot:prepend>
          <v-icon :icon="mdiAccount" />
        </template>
      </v-list-item>
      <v-list-item title="About" value="about">
        <template v-slot:prepend>
          <v-icon :icon="mdiAccount" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-container>
      <v-icon :icon="mdiAccount" />Main Contents
    </v-container>
  </v-main>
</v-app>
</template>

<script setup>
import { mdiAccount } from '@mdi/js'
import { ref } from 'vue'
let drawer = ref(null)
</script>

<!-- <script> -->
<!-- import { mdiAccount } from '@mdi/js' -->
<!-- export default { -->
<!--   data: () => ({ -->
<!--     mdiAccount, -->
<!--     drawer: null, -->
<!--   }), -->
<!-- } -->
<!-- </script> -->
