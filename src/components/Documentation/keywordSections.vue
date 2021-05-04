<template>
  <q-page padding>
    <div>
      <q-list
        dense
        bordered
        padding
        class="rounded-borders"
        style="background-color: white"
      >
        <q-item
          clickable
          v-ripple
          v-for="scrollPos in sections"
          :key="scrollPos"
          @click="scrollEvent(scrollPos)"
        >
          <q-item-section>
            {{ scrollPos }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  props: ["sections"],
  methods: {
    scrollEvent(scrollPos) {
      this.$emit("setScroll", scrollPos);
    }
  }
};
</script>

<style></style>
