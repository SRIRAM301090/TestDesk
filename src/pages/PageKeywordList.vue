<template>
  <q-page padding>
    <div class="constrain">
      <!-- Title & Description -->
      <headings-display
        heading="Keyword Driven Testing"
        id="Keyword Driven Testing"
        :hr-line="false"
        size="h3"
      ></headings-display>
      <p>{{ keywordDescription }}</p>

      <!-- Keyword Reference -->
      <headings-display
        heading="Keyword Reference"
        id="Keyword Reference"
        size="h4"
        class="q-mt-xl"
        :hr-line="false"
      ></headings-display>

      <div class="q-mt-xl" v-for="keyword in keywordsList" :key="keyword.id">
        <headings-display
          :heading="keyword.type"
          :id="keyword.type"
          size="h5"
          class="q-mt-md"
          :hr-line="true"
        ></headings-display>

        <ul v-for="list in keyword.lists" :key="list">
          <li>
            <q-btn
              no-caps
              no-wrap
              flat
              rounded
              color="primary"
              :to="`/keywords/${keyword.page}?redirect=${list}`"
              :label="list"
            />
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  data() {
    return {
      name: "PageKeyword",
      keywordDescription: `A software testing methodology suitable for both manual and automated testing. This method separates the documentation of test cases – including both the data and functionality to use.`,
      keywordsList: [
        {
          id: uid(),
          type: "Image",
          page: "snap",
          lists: ["Snap.full", "Snap.ROI"]
        },
        {
          id: uid(),
          type: "Delay",
          page: "wait",
          lists: ["Wait.mSec", "Wait.Sec"]
        }
      ]
    };
  },
  components: {
    "headings-display": () => import("components/Shared/HeadingsDisplay.vue")
  },
  mixins: [mixinScrollSections]
};
</script>

<style lang="sass" scoped>
@media (min-width: $breakpoint-md-min)
  .row
    .col-md-6
      width: 45%
@media (min-width: $breakpoint-lg-min)
  .row
    .col-lg-3
      width: 30%
</style>
