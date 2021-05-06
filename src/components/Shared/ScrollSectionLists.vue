<template>
  <div>
    <q-list
      v-if="scrollSections.length"
      dense
      bordered
      padding
      class="rounded-borders"
      style="background-color: white"
    >
      <q-item
        clickable
        v-ripple
        v-for="scrollPos in scrollSections"
        :key="scrollPos"
        @click="scrollEvent(scrollPos)"
      >
        <q-item-section>
          {{ scrollPos }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("scroll", ["scrollSections"])
  },
  methods: {
    ...mapActions("scroll", ["setCurrentScrollPosition"]),
    scrollEvent(scrollPos) {
      this.setCurrentScrollPosition(scrollPos);
    }
  }
};
</script>

<style></style>
