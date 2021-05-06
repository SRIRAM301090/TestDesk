<template>
  <q-page>
    <!-- Title & Description -->
    <headings-display
      :heading="keywordHeadings[0]"
      :id="keywordHeadings[0]"
      :hr-line="false"
      size="h3"
    ></headings-display>
    <p>{{ keywordDescription }}</p>

    <!-- Keyword Syntax -->
    <headings-display
      :heading="keywordHeadings[1]"
      :id="keywordHeadings[1]"
      :hr-line="true"
      size="h4"
      class="q-mb-xs"
    ></headings-display>

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
import { uid } from "quasar";
import mixinScrollSections from "src/mixins/mixinScrollSections";

export default {
  name: "wait",
  mixins: [mixinScrollSections],
  components:{
    "headings-display": ()=> import("components/Shared/HeadingsDisplay.vue"),
    "keyword-info": ()=> import("components/Documentation/KeywordInfo.vue")
  },
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
};
</script>

<style></style>
