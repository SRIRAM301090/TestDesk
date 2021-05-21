import { fireStore } from "boot/firebase";

export function collectReports({ commit }) {
  const reports = [];
  fireStore
    .collection("reports")
    .orderBy("time", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        data.docId = doc.id;
        reports.push({
          data
        });
      });
    })
    .then(() => {
      commit("setReportsData", reports);
    });
}
