import Vue from "vue";

export function setLoggedIn(state, value) {
  state.loggedIn = value;
}

export function setProjectLists(state, value) {
  state.projects = value;
}

export function setUserSelectedProject(state, project) {
  state.userSelectedProject = project;
}

export function setProjectVariant(state, variant) {
  state.projectVariant = variant;
}

export function setSelectedTest(state, id) {
  state.selectedTest = id;
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

export function clearTestCases(state) {
  state.testCases = {};
}

export function userSelectedTests(state, tests) {
  state.tests = tests;
}

export function currentTest(state, payload) {
  Vue.set(state.currentTest, payload.id, payload.test);
}

export function updateCurrentTest(state, payload) {
  Object.assign(state.currentTest[payload.id], payload.updates);
}

export function selectTestBench(state, benchId) {
  state.testBench = benchId;
}

export function clearPreviousTest(state) {
  state.currentTest = {};
}
