import { firebaseRealTimeDB, firebaseAuth } from "boot/firebase";
import { uid } from "quasar";

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
  });
}
