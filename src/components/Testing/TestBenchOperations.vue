<template>
  <div class="row q-mt-md" style="max-width: 450px">
    <q-select
      class="col"
      dense
      outlined
      v-model="testBench"
      :options="bench"
      label="Bench Id"
      @input="selectTestBench(testBench)"
    />
    <q-select
      dense
      outlined
      v-model="testCommand"
      label="Command"
      class="col q-ml-md"
      :options="command"
      :disable="!testBench"
    />
    <q-btn
      v-if="!disableTest"
      dense
      style="width: 70px"
      color="primary"
      outline
      no-caps
      label="Send"
      class="q-ml-md"
      @click="submit"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tab: "testresult",
      testBench: null,
      testCommand: null,
      bench: ["CHE7-L26526", "CHE7-W30262"],
      command: ["self-test", "start-test"]
    };
  },
  methods: {
    ...mapActions("test", ["sendCommand", "selectTestBench"]),
    submit() {
      if (this.testCommand === "start-test") {
        if (!this.tests.length) {
          this.$q.dialog({
            title: "Alert",
            message: "TestCase Id not selected for Test Execution."
          });
          return;
        }
      }
      this.sendCommand({
        testBench: this.testBench,
        testCommand: this.testCommand
      });
    }
  },
  computed: {
    ...mapGetters("test", ["disableTest", "tests"])
  }
};
</script>

<style></style>
