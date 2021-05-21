export function reports(state) {
  if (state.reports) {
    return state.reports;
  }
}

export function reportTable(state, getters) {
  if (getters.reports) {
    const reports = getters.reports;
    const finalReports = reports.map((el) => el.data);
    return finalReports;
  }
}
