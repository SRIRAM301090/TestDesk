import { firebaseAuth, authProvider } from "boot/firebase";

export function registerUser({}, payload) {
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function loginUser({}, payload) {
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function googleSignup() {
  firebaseAuth
    .signInWithPopup(authProvider)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function handleAuthSateChange() {
  firebaseAuth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
      this.$router.push("/").catch(err => {});
    }
  });
}
