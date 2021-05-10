import { firebaseRealTimeDB } from "boot/firebase";

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

    // child removed
    testCases.on("child_removed", snapshot => {
      const testId = snapshot.key;
      commit("deleteTest", testId);
    });
}

export function setUserSelectedProject({ commit }, project) {
  commit("setUserSelectedProject", project);
}
