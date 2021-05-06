<template>
  <q-page padding>
    <div class="constrain">
      <!-- Title & Description -->
      <headings-display
        :heading="keywordHeadings[0]"
        :id="keywordHeadings[0]"
        :hr-line="false"
        size="h3"
      ></headings-display>
      <p>{{ keywordDescription }}</p>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  data() {
    return {
      name:"PageKeyword",
      keywordHeadings: ["Keyword Driven Testing", "Usage"],
      keywordDescription: `A software testing methodology suitable for both manual and automated testing. This method separates the documentation of test cases – including both the data and functionality to use – from the prescription of the way the test cases are executed. As a result, it separates the test creation process into two distinct stages: a design and development stage, and an execution stage. The design substage covers the requirement analysis and assessment and the data analysis, definition, and population.`,
      keywordsList: [
        {
          id: uid(),
          imgSrc: require("src/assets/camera.svg"),
          type: "Image",
          page:"snap",
          lists: ["Snap.full", "Snap.ROI"]
        },
        {
          id: uid(),
          imgSrc: require("src/assets/timer.svg"),
          type: "Delay",
          page:"wait",
          lists: ["Wait.Sec", "Wait.mSec",]
        },
        {
          id: uid(),
          imgSrc: require("src/assets/timer.svg"),
          type: "Image",
          lists: ["Snap.full", "Snap.ROI", "Snap.full", "Snap.ROI"]
        },
        {
          id: uid(),
          imgSrc: require("src/assets/camera64.png"),
          type: "Image",
          lists: ["Snap.full", "Snap.ROI"]
        }
      ]
    };
  },
  components: {
    "headings-display": () =>
      import("components/Shared/HeadingsDisplay.vue")
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
