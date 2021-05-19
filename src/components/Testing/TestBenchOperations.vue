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
      :disable="disableTest"
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
      bench: ["CHE7-L26526", "CHE7-W10142"],
      command: ["self-test", "start-test"],
      ignorePrevious: false
    };
  },
  methods: {
    ...mapActions("test", ["sendCommand", "selectTestBench"]),
    submit() {
      this.ignorePrevious = true;
      this.sendCommand({
        testBench: this.testBench,
        testCommand: this.testCommand
      });
    }
  },
  computed: {
    ...mapGetters("test", ["currentTest", "disableTest"])
  },
  watch: {
    currentTest: {
      handler(val) {
        if (
          val.command === "self-test" &&
          val.status === "finished" &&
          this.ignorePrevious
        ) {
          this.$q.notify({ type: "positive", message: "Self test passed" });
        }
      },
      deep: true
    }
  }
};
</script>

<style></style>
