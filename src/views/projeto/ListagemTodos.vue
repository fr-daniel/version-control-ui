<template>
  <div>
    <v-card color="grey lighten-5">
      <v-card-title class="headline indigo white--text">Projetos</v-card-title>

      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="projetos" :search="search" jus>
          <template v-slot:item.actions="{ item }">
            <v-btn class="mx-2" fab dark small color="error">
              <v-icon small @click="deletarProjeto(item)">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark v-bind="attrs" v-on="on">
              Adicionar Projeto
              <v-icon right>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Adicionar Projeto</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Nome do Projeto*" v-model="projeto.nome" required min-></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indica campo obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
              <v-btn color="blue darken-1" text @click="addProjetoEFechaModal()">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("projetos");

export default {
  data: () => ({
    model: null,
    search: null,
    projeto: {
      nome: "",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Nome", value: "nome", sortable: false },
      { text: "Ações", value: "actions", sortable: false },
    ],
    dialog: false,
  }),

  created: function () {
    this.initialize();
  },

  computed: {
    ...mapState({
      projetos: (state) => state.all,
    }),
    fields() {
      return null;
    },
    items() {
      return [];
    },
  },

  methods: {
    ...mapActions(["getAllProjetos", "deletarProjeto", "adicionarProjeto"]),

    initialize() {
      this.getAllProjetos();
    },

    addProjetoEFechaModal() {
      this.adicionarProjeto(this.projeto);
      this.dialog = false;
    },
  },
};
</script>