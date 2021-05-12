<template>
  <div class="q-mt-md q-pa-sm row">
    <div id="treeScroll" class="scroll overflow-hidden col">
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

    <div class="col">
      <pre class="q-ma-none">{{ displayTest }}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      treeHeightStyle: "",
      ticked: [],
      selectedTest: null,
      test: ` Precondition:
              PC_1. Wait.Sec(Delay=2)
              TestProcedure:
              TP_1. Wait.mSec(Delay=1000)
              Reset:
              RST_1. Wait.Sec(Delay=2)`
    };
  },
  computed: {
    ...mapGetters("test", ["testCases", "showTestCase"]),
    displayTest() {
      if (this.showTestCase) {
        return this.showTestCase.TestProcedure;
      } else {
        return null;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.setTreeHeight);
    this.setTreeHeight();
  },
  destroyed() {
    window.removeEventListener("resize", {});
  },
  methods: {
    ...mapActions("test", ["setSelectedTest"]),
    setTreeHeight() {
      const treeTop = document.getElementById("treeScroll").offsetTop;
      const treeHeight = window.innerHeight - treeTop - 150;
      this.treeHeightStyle = "height: " + treeHeight + "px";
    }
  },
  updated() {
    this.$refs.nodes.expandAll();
    if (this.selectedTest) {
      console.log(this.selectedTest);
      this.setSelectedTest(this.selectedTest);
    }
  }
};
</script>
