<template>
  <v-card flat>
    <v-card elevation="12" height="100%">
      <v-navigation-drawer floating permanent>
        <v-list dense rounded>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-card>
  </v-card>
</template>


<script>
// import {mapGetters} from 'vuex'

export default {
  name: "app-toolbar",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-database-search" },
        { title: "About", icon: "mdi-database-search" },
      ],
    };
  },
  // computed: {
  //     ...mapGetters({
  //         'isCoordenador': "auth/isCoordenador",
  //         'isCandidato': "auth/isCandidato"
  //     }),
  // },

  methods: {
    logout() {
      this.$router.push("/logout");
    },
    dados() {
      this.$router.push("/dados-pessoais");
    },
  },
};
</script>



