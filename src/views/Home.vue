<template>
  <div>
    <v-card color="grey lighten-5">
      <v-card-title class="headline indigo white--text">Firmwares - Projeto 1</v-card-title>
      <v-card>
        <v-card-text>
          <v-timeline dense clipped>
            <v-timeline-item class="mb-0" color="green" small>
              <v-row justify="justify-start">
                <v-col cols="12">
                  Projeto_v1_0_1.zip
                  <br />
                  <v-chip class="mt-4" color="green" text-color="white">Versão Inicial</v-chip>
                  <br />
                  <br />19/09/1999 - 23:00
                </v-col>
              </v-row>
              <v-row class="justify-end ml-1 mr-1">
                <v-btn small color="primary">
                  <v-icon left>mdi-download</v-icon>Download
                </v-btn>

                <v-btn small color="ml-2 error">
                  <v-icon left>mdi-delete</v-icon>Remover
                </v-btn>
              </v-row>
              <v-divider class="mt-5"></v-divider>
            </v-timeline-item>

            <v-timeline-item class="mb-0" color="blue" small>
              <v-row justify="justify-start">
                <v-col cols="12">
                  Projeto_v1_1_1.zip
                  <br />
                  <v-chip class="mt-4" color="blue" text-color="white">Versão Correção</v-chip>
                  <br />
                  <br />19/09/1999 - 23:00
                </v-col>
              </v-row>
              <v-row class="justify-end ml-1 mr-1">
                <v-btn small color="primary">
                  <v-icon left>mdi-download</v-icon>Download
                </v-btn>

                <v-btn small color="ml-2 error">
                  <v-icon left>mdi-delete</v-icon>Remover
                </v-btn>
              </v-row>
              <v-divider class="mt-5"></v-divider>
            </v-timeline-item>

            <v-timeline-item class="mb-0" color="orange" small>
              <v-row justify="justify-start">
                <v-col cols="12">
                  Projeto_v_1_1.zip
                  <br />
                  <v-chip class="mt-4" color="orange" text-color="white">Versão Adição</v-chip>
                  <br />
                  <br />19/09/1999 - 23:00
                </v-col>
              </v-row>
              <v-row class="justify-end ml-1 mr-1">
                <v-btn small color="primary">
                  <v-icon left>mdi-download</v-icon>Download
                </v-btn>

                <v-btn small color="ml-2 error">
                  <v-icon left>mdi-delete</v-icon>Remover
                </v-btn>
              </v-row>
              <v-divider class="mt-5"></v-divider>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    tipoVersoes: [
      { value: "Inicia", text: "INICIAL" },
      { value: "Correção de Bug", text: "BUG" },
    ],
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then((res) => res.json())
        .then((res) => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>