<template>
  <div class="scrollLink">
    <q-card flat bordered class="my-card  q-mb-lg">
      <!-- Keyword Command -->
      <q-card-section>
        <div class="text-h5 text-primary">{{ keyword.cmd }}</div>
      </q-card-section>

      <!-- Keyword Description -->
      <q-card-section class="q-pt-none">
        <div class="text-orange text-h6 text-weight-medium">Description</div>
        <p>
          {{ keyword.description }}
        </p>
      </q-card-section>

      <!-- Keyword Syntax -->
      <q-card-section class="q-pt-none">
        <div class="text-orange text-h6 text-weight-medium">Syntax</div>
        <p>{{ keyword.syntax }}</p>
      </q-card-section>

      <!-- Keyword Parameters -->
      <q-card-section class="q-pt-none">
        <div class="text-orange text-h6 text-weight-medium">Parameter</div>
        <p v-for="parameter in keyword.parameters" :key="parameter.id">
          {{ parameter.name }}
        </p>
      </q-card-section>

      <!-- Keyword Example -->
      <q-card-section class="q-pt-none">
        <div class="text-orange text-h6 text-weight-medium">Example</div>
        <p class="q-mb-xs">{{ keyword.exampleHeading }}</p>
        <div>
          <pre
            class="q-mt-none bg-green-1 q-mx-sm">{{ keyword.exampleCode }}<q-btn @click="copy(keyword.exampleCode)" size="sm" flat icon="content_copy" /></pre>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { copyToClipboard } from "quasar";
export default {
  props: ["keyword"],
  methods: {
    copy(text) {
      copyToClipboard(text);
    }
  }
};
</script>
