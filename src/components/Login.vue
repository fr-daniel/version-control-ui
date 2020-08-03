<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Entrar</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-alert type="error" class="mt-3 ml-3 mr-3" v-if="error">{{error}}</v-alert>
              <v-form @submit.prevent="onSubmit">
                <v-card-text>
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">
                    <v-icon right>mdi-login</v-icon>Login
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app-login",
  props: ["invalidToken"],
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  created() {
    if (this.invalidToken) {
      this.error = "Seu tempo de conexão expirou. Faça o login novamente.";
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          console.log(this.$store);
          if (this.$store.getters["auth/isAuthenticated"]) {
            this.to
              ? this.$router.push({ path: this.to })
              : this.$router.push({ path: "/" });
          } else {
            this.error = "Usuário e/ou senha inválidos";
          }
        });
      this.loading = false;
    },
    removeError() {
      this.error = "";
    },
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
    }),
  },
};
</script>
