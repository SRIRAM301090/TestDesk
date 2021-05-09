export function projects(state) {
  if (state.projects) {
    const projects = Object.keys(state.projects);
    return projects;
  }
}

export function projectVariants(state, getters) {
  if (getters.projects && state.userSelectedProject) {
    const projectVariants = Object.keys(state.projects[state.userSelectedProject]);
    return projectVariants;
  }
}
