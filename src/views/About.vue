<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      hide-on-scroll
      class="mb-10"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container style="max-width: 600px;">
    <v-timeline dense clipped>
      <v-timeline-item
        fill-dot
        class="white--text mb-12"
        color="orange"
        large
      >
        <template v-slot:icon>
          <span>JL</span>
        </template>
        <v-text-field
          v-model="input"
          hide-details
          flat
          label="Leave a comment..."
          solo
          @keydown.enter="comment"
        >
          <template v-slot:append>
            <v-btn
              class="mx-0"
              depressed
              @click="comment"
            >
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>

      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="event in timeline"
          :key="event.id"
          class="mb-4"
          color="pink"
          small
        >
          <v-row justify="space-between">
            <v-col cols="7" v-text="event.text"></v-col>
            <v-col class="text-right" cols="5" v-text="event.time"></v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>

     

      <v-timeline-item
        class="mb-0"
        color="green"
        small
      >
       

        <v-row justify="space-between">
          <v-col cols="7">
            
            Projeto_v1.0.1.zip
            <br>
            <v-chip
      class="mt-4"
      color="green"
      text-color="white"
    >
      Versão Inicial
    </v-chip>
          </v-col>
          <v-col class="text-right" cols="5">19/09/1999 - 23:00</v-col>
        </v-row>
        <v-row justify="space-between" class="ml-1">
           <v-btn
          small color="primary"
        >
          <v-icon left>mdi-download</v-icon> Download
        </v-btn>

          <v-btn
          small color="ml-2 error"
        >
          <v-icon left>mdi-delete</v-icon> Remover
        </v-btn>
        </v-row>
      </v-timeline-item>

      <v-timeline-item
        class="mb-1"
        hide-dot
      >
       
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        color="grey"
        small
      >
        <v-row justify="space-between">
          <v-col cols="7">
            A $15.00 USD payment was processed on PayPal Express Checkout
          </v-col>
          <v-col class="text-right" cols="5">15:25 EDT</v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item
        color="grey"
        small
      >
        <v-row justify="space-between">
          <v-col cols="7">
            John Leider placed this order on Online Store (checkout #1937432132572).
          </v-col>
          <v-col class="text-right" cols="5">15:25 EDT</v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-container>

    <v-main>
    </v-main>

    <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-col>
  </v-footer>
  
  </v-app>
</template>

<script>

export default {
  name: 'App',


  data: () => ({
    //
  }),
};
</script>
