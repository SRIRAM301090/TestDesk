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

export function sendCommand({ commit }, payload) {
  const refDB = firebaseRealTimeDB.ref(`/bench/${payload.testBench}/${uid()}`);
  const user = firebaseAuth.currentUser.uid;

  console.log(payload);
  refDB.set({ command: payload.testCommand, user: user, status: "command" });

  const check = firebaseRealTimeDB.ref(`/bench/${payload.testBench}`);
  check.on("child_added", snapshot => {
    console.log(snapshot.val());
  });

  check.on("child_changed", snapshot => {
    console.log(snapshot.val());
    const data = snapshot.val();
    if (data["status"] === "finished") {
      console.log("finished");
      check.off("child_added");
      check.off("child_changed");
    }
  });
}
