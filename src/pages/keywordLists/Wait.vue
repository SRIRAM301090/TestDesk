<template>
  <q-page>
    <!-- Title & Description -->
    <keyword-title
      :heading="keywordHeadings[0]"
      :id="keywordHeadings[0]"
      :hr-line="false"
      size="h3"
    ></keyword-title>
    <p>{{ keywordDescription }}</p>

    <!-- Keyword Syntax -->
    <keyword-title
      :heading="keywordHeadings[1]"
      :id="keywordHeadings[1]"
      :hr-line="true"
      size="h4"
      class="q-mb-xs"
    ></keyword-title>

    <!-- Keyword Info -->
    <keyword-info
      v-for="keyword in keywordInfo"
      :key="keyword.id"
      :keyword="keyword"
      :id="keyword.cmd"
    />
  </q-page>
</template>

<script>
import { scroll, uid } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: "wait",
  data() {
    return {
      keywordHeadings: ["Wait", "Usage"],
      keywordDescription: `Used to suspend execution of a test for a particular time. The delay can
      be specified in seconds and milliseconds. It is supported for all
      projects.`,
      keywordInfo: [
        {
          id: uid(),
          cmd: "Wait.mSec",
          description: `Pauses the program for the amount of time (in milliseconds) specified
          as parameter.`,
          syntax: "Wait.mSec(Delay)",
          parameters: [
            {
              id: uid(),
              name: `Delay: the number of milliseconds to pause. Allowed data types:
          unsigned long.`
            }
          ],
          exampleHeading: "Wait for 2000 millisecond",
          exampleCode: "PC_1. Wait.mSec(Delay=2000)"
        },
        {
          id: uid(),
          cmd: "Wait.Sec",
          description: `Pauses the program for the amount of time (in seconds) specified
          as parameter.
          `,
          syntax: "Wait.Sec(Delay)",
          parameters: [
            {
              id: uid(),
              name: `Delay: the number of seconds to pause. Allowed data types:
          unsigned long.`
            }
          ],
          exampleHeading: "Wait for 2 second",
          exampleCode: "PC_1. Wait.Sec(Delay=2)"
        }
      ]
    };
  },
  props: ["setScroll"],
  emits: ["scrollSection"],
  components: {
    "keyword-title": () =>
      import("../../components/Documentation/keywordTitle.vue"),
    "keyword-info": () =>
      import("../../components/Documentation/keywordInfo.vue")
  },
  methods: {
    scrollToElement(id) {
      const el = document.getElementById(id);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    }
  },
  watch: {
    setScroll(val) {
      if (val) this.scrollToElement(val);
    }
  },
  mounted() {
    setTimeout(() => {
      const elList = document.querySelectorAll(".scrollLink");
      const scrollSections = Array.from(elList).map(el => el.id);
      this.$emit("getScrollSections", scrollSections);
    }, 250);
  }
};
</script>

<style></style>
