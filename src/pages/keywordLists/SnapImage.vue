<template>
  <q-page>
    <!-- Title & Description -->
    <heading-display
      :heading="keywordHeadings[0]"
      :id="keywordHeadings[0]"
      :hr-line="false"
      size="h3"
    ></heading-display>
    <p>{{ keywordDescription }}</p>

    <!-- Keyword Syntax -->
    <heading-display
      :heading="keywordHeadings[1]"
      :id="keywordHeadings[1]"
      :hr-line="true"
      size="h4"
      class="q-mb-xs"
    ></heading-display>

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
  name: "snap",
  mixins: [mixinScrollSections],
  components: {
    "heading-display": () =>
      import("components/Shared/HeadingsDisplay.vue"),
    "keyword-info": () => import("components/Documentation/KeywordInfo.vue")
  },
  data() {
    return {
      keywordHeadings: ["Snap", "Usage"],
      keywordDescription: `Used to capture the image from the camera. The image can be a full image or ROI specific. 
      It is supported for all projects.`,
      keywordInfo: [
        {
          id: uid(),
          cmd: "Snap.full",
          description: `Capture the full image`,
          syntax: "Snap.full(Cam)",
          parameters: [
            {
              id: uid(),
              name: `Cam: Specify the Camera name from NI MAX`
            }
          ],
          exampleHeading: "Snap Image from the ECU",
          exampleCode: "PC_1. Snap.full(Cam=ECU)"
        },
        {
          id: uid(),
          cmd: "Snap.ROI",
          description: `Capture the ROI specific image.`,
          syntax: "Snap.ROI(Cam, ROI)",
          parameters: [
            {
              id: uid(),
              name: `Cam: Specify the Camera name from NI MAX`
            },
            {
              id: uid(),
              name: `ROI: Specify the ROI`
            }
          ],
          exampleHeading: "Snap Image with ROI",
          exampleCode: "PC_1. Snap.ROI(Cam=ECU, ROI='100:100:200:200')"
        }
      ]
    };
  }
};
</script>

<style></style>
