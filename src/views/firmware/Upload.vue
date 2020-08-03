<template>
  <div>
    <v-card color="grey lighten-5">
      <v-card-title class="headline indigo white--text mb-3">Upload Firmware</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="projeto"
          :items="itemsProjetos"
          :loading="isLoading"
          :search-input.sync="searchProjetos"
          color="black"
          hide-no-data
          hide-selected
          item-text="nome"
          item-value="id"
          label="Projeto"
          placeholder="Comece a digitar para pesquisar"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          v-model="placa"
          :items="itemsPlacas"
          :loading="isLoading"
          :search-input.sync="searchPlacas"
          color="black"
          hide-no-data
          hide-selected
          item-text="nome"
          item-value="id"
          label="Placa"
          placeholder="Comece a digitar para pesquisar"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-card-text>
        <v-select
          :items="tipoVersoes"
          v-model="tipoVersao"
          label="Tipo de versão"
          prepend-icon="mdi-note-outline"
          data-vv-name="tipoVersao"
          :error-messages="errors.collect('tipoVersao')"
          v-validate="'required'"
        ></v-select>
      </v-card-text>
      <v-card-text>
        <v-file-input
          label="Arquivo firmware"
          data-vv-name="file"
          :error-messages="errors.collect('file')"
          v-validate="'required'"
          @change="selectFile"
        ></v-file-input>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :disabled="errors.any()" @click="adicionarFirmware()">
          Upload
          <v-icon right>mdi-upload</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import router from "@/router";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  $_veeValidate: {
    validator: "new",
  },

  data: () => ({
    projeto: null,
    tipoVersao: null,
    currentFile: null,
    placa: null,
    descriptionLimit: 60,
    isLoading: false,
    searchProjetos: null,
    searchPlacas: null,
    tipoVersoes: [
      { value: "INICIAL", text: "Inicial" },
      { value: "CORRECAO_FALHAS", text: "Correção de falhas" },
      {
        value: "ALTERACOES_COMPATIVEIS",
        text: "Alterações compatíveis com versão anterior",
      },
      {
        value: "ALTERACOES_INCOMPATIVEIS",
        text: "Alterações incompatíveis com versão anterior",
      },
    ],

    dictionary: {
      custom: {
        projeto: {
          required: () => "O nome é obrigatório!",
        },
        file: {
          required: () => "O nome é obrigatório!",
        },
      },
    },
  }),

  created: function () {
    this.$validator.localize("pt", this.dictionary);
    this.getAllProjetos();
    this.getAllPlacas();
  },

  computed: {
    ...mapState("projetos", {
      projetos: (state) => state.all,
    }),
    ...mapState("placas", {
      placas: (state) => state.all,
    }),
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },

    itemsProjetos() {
      return this.projetos.map((entry) => {
        const nome =
          entry.nome.length > this.descriptionLimit
            ? entry.nome.slice(0, this.descriptionLimit) + "..."
            : entry.nome;

        return Object.assign({}, entry, { nome });
      });
    },

    itemsPlacas() {
      return this.placas.map((entry) => {
        const nome =
          entry.nome.length > this.descriptionLimit
            ? entry.nome.slice(0, this.descriptionLimit) + "..."
            : entry.nome;

        return Object.assign({}, entry, { nome });
      });
    },
  },
  methods: {
    ...mapActions("projetos", ["getAllProjetos"]),
    ...mapActions("placas", ["getAllPlacas"]),
    ...mapActions("firmware", ["addFirmware"]),

    selectFile(file) {
      this.currentFile = file;
    },

    adicionarFirmware() {
      const firmware = {
        projeto: this.projeto,
        placa: this.placa,
        tipoVersao: this.tipoVersao,
        currentFile: this.currentFile,
      };
      console.log(firmware);
      this.addFirmware(firmware);
      router.push("/");
    },
  },
  watch: {
    searchProjetos() {
      if (this.itemsProjetos.length > 0) return;
      if (this.isLoading) return;
      this.isLoading = true;
      this.getAllProjetos();
    },
    searchPlacas() {
      if (this.itemsPlacas.length > 0) return;
      if (this.isLoading) return;
      this.isLoading = true;
      this.getAllPlacas();
    },
  },
};
</script>