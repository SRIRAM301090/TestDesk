import { firebaseRealTimeDB } from "boot/firebase";

export function getProjectLists({ commit }) {
  firebaseRealTimeDB.ref("/projects").once("value", snapshot => {
    const projectLists = snapshot.val();
    commit("setProjectLists", projectLists);
  });
}

export function getTestCase({ commit, state }, payload) {
  const testCaseNode = state.projects[payload.project][payload.projectVariant];
  const testCases = firebaseRealTimeDB.ref(testCaseNode);

  testCases.once("value", value => {
    console.log(value.val());
  });
}

export function setUserSelectedProject({ commit }, project) {
  commit("setUserSelectedProject", project);
}
