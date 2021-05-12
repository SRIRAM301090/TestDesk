import Vue from "vue";
import state from "../store-scroll/state";

export function setLoggedIn(state, value) {
  state.loggedIn = value;
}

export function setProjectLists(state, value) {
  state.projects = value;
}

export function setUserSelectedProject(state, project) {
  state.userSelectedProject = project;
}

export function addTestCase(state, payload) {
  Vue.set(state.testCases, payload.id, payload.test);
}

export function deleteTest(state, testId) {
  Vue.delete(state.testCases, testId);
}

export function updateTestCases(state, payload) {
  Object.assign(state.testCases[payload.id], payload.updates);
}

export function setTestCaseNode(state, node) {
  state.testCaseNode = node;
}

export function dbRef(state, value) {
  state.dbRef = value;
}

export function clearTestCases(state) {
  state.testCases = {};
}
