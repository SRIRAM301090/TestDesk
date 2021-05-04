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
import { uid } from "quasar";
import mixinKeywordDocs from "src/mixins/mixin-Keyword-docs";

export default {
  name: "snap",
  mixins: [mixinKeywordDocs],
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
