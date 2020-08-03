<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app left>
          <v-list dense>
            <v-list-item class="mb-1">
              <v-list-item-content>
                <v-list-item-title class="title">Version Control</v-list-item-title>
                <v-list-item-subtitle>Firmware</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item link to="/">
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/projetos">
              <v-list-item-action>
                <v-icon>mdi-clipboard-multiple-outline</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Projetos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/placas">
              <v-list-item-action>
                <v-icon>mdi-checkerboard</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Placas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/upload">
              <v-list-item-action>
                <v-icon>mdi-file-upload</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Upload Firmware</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block color="secondary" link to="/logout">
                <v-icon>mdi-logout</v-icon>Sair
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
          <v-spacer></v-spacer>

          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-main align="center" justify="center">
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-main>

        <v-footer color="indigo" app>
          <v-spacer></v-spacer>

          <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>