import { firebaseAuth, authProvider } from "boot/firebase";
import { LocalStorage, Loading } from "quasar";

export function registerUser({}, payload) {
  Loading.show();
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function loginUser({}, payload) {
  Loading.show();
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function googleSignup() {
  Loading.show();
  firebaseAuth
    .signInWithPopup(authProvider)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function handleAuthSateChange({ commit }) {
  firebaseAuth.onAuthStateChanged(user => {
    Loading.hide();
    console.log(user);
    if (user) {
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);
      this.$router.push("/").catch(err => {});
    }
    else{
      commit("setLoggedIn", false);
      LocalStorage.set("loggedIn", false);
      this.$router.replace("/auth").catch(err => {});
    }
  });
}

export function logoutUser() {
  firebaseAuth.signOut();
}
