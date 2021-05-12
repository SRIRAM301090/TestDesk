<template>
  <div class="q-mt-md">
    <div id="treeScroll" class="scroll overflow-hidden">
      <q-scroll-area :style="treeHeightStyle">
        <div class="q-px-sm">
          <q-tree
            ref="nodes"
            :nodes="testCases"
            node-key="label"
            tick-strategy="leaf-filtered"
            :ticked.sync="ticked"
            :selected.sync="selectedTest"
          />
        </div>
      </q-scroll-area>
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
      selectedTest: null
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
  },
  updated() {
    this.$refs.nodes.expandAll();
  }
};
</script>
