import { firebaseRealTimeDB, firebaseAuth } from "boot/firebase";
import { uid, Notify } from "quasar";

export function getProjectLists({ commit }) {
  firebaseRealTimeDB.ref("/projects").once("value", snapshot => {
    const projectLists = snapshot.val();
    commit("setProjectLists", projectLists);
  });
}

export function getTestCase({ commit, state }, payload) {
  const testCaseNode = `/${
    state.projects[payload.project][payload.projectVariant]
  }/TestCases`;

  if (state.testCaseNode && state.testCaseNode === testCaseNode) {
    return;
  }
  if (state.testCaseNode && state.testCaseNode !== testCaseNode) {
    commit("clearTestCases");
    const loadedTestCases = firebaseRealTimeDB.ref(state.testCaseNode);
    loadedTestCases.off("child_added");
    loadedTestCases.off("child_changed");
    loadedTestCases.off("child_removed");
  }

  commit("setTestCaseNode", testCaseNode);
  commit("setProjectVariant", payload.projectVariant);
  const testCases = firebaseRealTimeDB.ref(testCaseNode);

  testCases.on("child_added", snapshot => {
    const test = snapshot.val();
    const payload = {
      id: snapshot.key,
      test: test
    };
    commit("addTestCase", payload);
  });

  testCases.on("child_changed", snapshot => {
    const test = snapshot.val();
    const payload = {
      id: snapshot.key,
      updates: test
    };
    commit("updateTestCases", payload);
  });

  testCases.on("child_removed", snapshot => {
    const testId = snapshot.key;
    commit("deleteTest", testId);
  });
}

export function setUserSelectedProject({ commit }, project) {
  commit("setUserSelectedProject", project);
}

export function setSelectedTest({ commit }, id) {
  commit("setSelectedTest", id);
}

export function userSelectedTests({ commit }, tests) {
  commit("userSelectedTests", tests);
}

export function selectTestBench({ commit, dispatch }, benchId) {
  commit("selectTestBench", benchId);
  dispatch("checkTestStatus", benchId);
}

export function sendCommand({ state }, payload) {
  const refDB = firebaseRealTimeDB.ref(`/bench/${payload.testBench}/${uid()}`);
  const user = firebaseAuth.currentUser.uid;

  refDB.set({
    command: payload.testCommand,
    user: user,
    status: "command",
    date: Date.now(),
    project: state.userSelectedProject,
    variant: state.projectVariant,
    test: state.tests,
    sheetId: state.testCaseNode
  });
}

export function checkTestStatus({ commit }, benchId) {
  const check = firebaseRealTimeDB
    .ref(`/bench/${benchId}`)
    .orderByChild("date")
    .limitToLast(1);

  check.on("child_added", snapshot => {
    commit("clearPreviousTest");
    const test = snapshot.val();
    const payload = {
      id: snapshot.key,
      test: test
    };
    commit("currentTest", payload);
  });

  check.on("child_changed", snapshot => {
    const test = snapshot.val();
    const payload = {
      id: snapshot.key,
      updates: test
    };
    commit("updateCurrentTest", payload);

    const updates = payload.updates;
    if (updates.command === "self-test" && updates.status === "finished") {
      Notify.create({ message: "Self test passed", type: "positive" });
    }

    if (updates.command === "start-test" && updates.status === "finished") {
      Notify.create({ message: "All tests finished", type: "positive" });
    }

    if (updates.command === "start-test" && updates.result && updates.status !== "finished") {
      const testResults = [];
      Object.keys(updates.result).forEach(key =>
        testResults.push({
          name: key,
          results: updates.result[key]
        })
      );

      testResults.sort(function(a, b) {
        var keyA = a.results.date,
          keyB = b.results.date;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      const recentTestId = testResults[testResults.length - 1].name
      const recentTestResult = testResults[testResults.length - 1].results.status;
      const type = recentTestResult === "Passed" ? "positive" : "negative";

      Notify.create({
        message: `Test ID ${recentTestId} : ${recentTestResult}`,
        type
      });
    }
  });
}
