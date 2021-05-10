<template>
  <div class=" row">
    <div class="col-12 col-lg-6">
      <!-- <q-scroll-area class="q-scroll-area-tests"> -->
      <div id="treeScroll" class="scroll overflow-hidden">
        <q-scroll-area :style="treeHeightStyle">
          <div class="q-px-sm">
            <q-tree
              v-if="testCases"
              :nodes="testCases"
              node-key="label"
              :tick-strategy="tickStrategy"
              :ticked.sync="ticked"
              :expanded.sync="expanded"
              default-expand-all
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
        voluptatibus, sit facere nisi reiciendis molestias natus, ducimus veniam
        saepe quae distinctio? Nulla minus odit voluptate quaerat inventore odio
        iste quas?Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Consectetur laboriosam magni esse accusantium, dolorum eum adipisci
        dignissimos nostrum? Inventore neque totam tempore, ratione delectus eos
        officia modi aperiam repudiandae sit.
      </p>
    </div>
    <div class="col-12 col-sm-6">
      <q-option-group v-model="tickStrategy" :options="tickStrategies" />

      <div class="text-h6 q-mt-md">Ticked</div>
      <div>
        <div v-for="tick in ticked" :key="`ticked-${tick}`">
          {{ tick }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      treeHeightStyle: "",
      ticked: [],
      expanded: [],
      tickStrategy: "leaf-filtered",
      tickStrategies: [
        { value: "none", label: "None" },
        { value: "strict", label: "Strict" },
        { value: "leaf", label: "Leaf" },
        { value: "leaf-filtered", label: "Leaf Filtered" }
      ]
    };
  },
  computed: {
    ...mapGetters("test", ["testCases"])
  },
  mounted() {
    window.addEventListener("resize", this.setTreeHeight);
    this.setTreeHeight();
  },
  destroyed() {
    window.removeEventListener("resize", {});
  },
  methods: {
    setTreeHeight() {
      const treeTop = document.getElementById("treeScroll").offsetTop;
      const treeHeight = window.innerHeight - treeTop - 150;
      this.treeHeightStyle = "height: " + treeHeight + "px";
    }
  }
};
</script>
