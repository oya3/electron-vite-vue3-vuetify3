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

    <!-- dark theme switch -->
    <template v-slot:append>
      <v-switch
        v-model="darkTheme"
        @update:model-value="changeTheme"
        :prepend-icon="darkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        hide-details
        inset
        class="mr-auto"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
  >
    <v-list nav>
      <v-list-item title="Home" value="home" @click="$router.push({ path: '/' })">
        <template v-slot:prepend>
          <v-icon :icon="mdiHomeAccount" />
        </template>
      </v-list-item>
      <v-list-item title="Chart" value="chart" @click="$router.push({ path: '/chart' })">
        <template v-slot:prepend>
          <v-icon :icon="mdiChartBar" />
        </template>
      </v-list-item>
      <v-list-item title="About" value="about" @click="$router.push({ path: '/about' })">
        <template v-slot:prepend>
          <v-icon :icon="mdiInformationOutline" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <!-- <v-container> -->
    <div style="width: 100%; height: 100%;">
      <router-view />
    <!-- </v-container> -->
    </div>
  </v-main>
</v-app>
</template>

<script setup>
import { mdiHomeAccount, mdiChartBar, mdiInformationOutline, mdiAccount } from '@mdi/js'
import { ref } from 'vue'
import { useTheme } from 'vuetify'

let drawer = ref(null)
const darkTheme = ref(false)
const theme = useTheme()

const changeTheme = () => {
  theme.global.name.value = darkTheme.value ? 'dark' : 'light'
}
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
