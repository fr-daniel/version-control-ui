<template>
  <div>
    <v-card color="grey lighten-5">
      <v-card-title class="headline indigo white--text">Pesquisar Firmware</v-card-title>
    </v-card>

    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <v-card-text>
              <v-autocomplete
                v-model="projeto"
                :items="itemsProjetos"
                :loading="isLoading"
                :search-input.sync="searchProjeto"
                color="black"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Projeto"
                placeholder="Comece a digitar para pesquisar"
                prepend-icon="mdi-database-search"
                return-object
                @change="pesquisar()"
              ></v-autocomplete>
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <v-card-text>
              <v-autocomplete
                v-model="placa"
                :items="itemsPlacas"
                :loading="isLoading"
                :search-input.sync="searchPlaca"
                color="black"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Placa"
                placeholder="Comece a digitar para pesquisar"
                prepend-icon="mdi-database-search"
                return-object
                @change="pesquisar()"
              ></v-autocomplete>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table :headers="headers" :items="getByProjetoEPlaca">
        <template v-slot:item.calories="{ item }">
          <v-chip dark>{{ item.calories }}</v-chip>
        </template>
        <template v-slot:item.projeto="{ item }">{{ item.projeto.nome }}</template>
        <template v-slot:item.placa="{ item }">{{ item.placa.nome }}</template>
        <template v-slot:item.createdOn="{ item }">{{ item.createdOn | dataHora }}</template>
        <template v-slot:item.acoes="{item}">
          <v-btn class="mx-2" fab dark small color="success" @click="downloadFirmware(item)">
            <v-icon small>mdi-download</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark small color="error">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    descriptionLimit: 60,
    isLoading: false,
    projeto: null,
    placa: null,
    searchProjeto: null,
    searchPlaca: null,

    headers: [
      {
        text: "Arquivo",
        align: "start",
        sortable: false,
        value: "pathName",
      },
      {
        text: "Extensao",
        align: "start",
        sortable: false,
        value: "extension",
      },
      { text: "Projeto", value: "projeto", sortable: false },
      { text: "Placa", value: "placa.nome", sortable: false },
      { text: "Data upload", value: "createdOn" },
      { text: "Ações", value: "acoes", sortable: false },
    ],
  }),

  mounted: function () {
    this.initialize();
  },

  computed: {
    ...mapState("projetos", {
      projetos: (state) => state.all,
    }),
    ...mapState("placas", {
      placas: (state) => state.all,
    }),
    ...mapGetters("firmware", ["getByProjetoEPlaca"]),

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
    ...mapActions("firmware", [
      "getAllFirmwares",
      "getAllFirmwaresPorProjetoOuPlaca",
      "downloadFirmware",
    ]),

    initialize() {
      this.getAllProjetos();
      this.getAllPlacas();
      this.getAllFirmwares();
    },

    pesquisar() {
      this.firmwares = this.getAllFirmwaresPorProjetoOuPlaca({
        projeto: this.projeto,
        placa: this.placa,
      });
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

  filters: {
    dataHora: function (dataHora) {
      moment.locale("pt-BR");
      return dataHora ? moment(dataHora).format("L") : "";
    },
  },
};
</script>