<template>
  <q-page>
    <!-- Title & Description -->
    <keyword-title
      :heading="keywordHeadings[0]"
      size="h3"
      id="Introduction"
      :hr-line="false"
    ></keyword-title>
    <p>{{ keywordDescription }}.</p>

    <!-- Keyword Syntax -->
    <keyword-title
      :heading="keywordHeadings[1]"
      size="h4"
      class="q-mb-xs"
      id="Usage"
      :hr-line="true"
    ></keyword-title>

    <!-- Keyword Info -->
    <keyword-info
      v-for="keyword in keywordInfo"
      :key="keyword.id"
      :keyword="keyword"
    />
  </q-page>
</template>

<script>
import { scroll, uid } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: "Wait",
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
  components: {
    "keyword-title": () =>
      import("../../components/Documentation/keywordTitle.vue"),
    "keyword-info": () =>
      import("../../components/Documentation/keywordInfo.vue")
  },
  methods: {
    scrollToElement() {
      const el = document.getElementById("usage");
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    },
    gotoUsage() {
      const scrollElements = document.querySelectorAll(".scrollLink");
      console.log(scrollElements);
      console.log(scrollElements[0].id);
      console.log(scrollElements[1].id);
      // this.scrollToElement();
    }
  }
};
</script>

<style></style>
