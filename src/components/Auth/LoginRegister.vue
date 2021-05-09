<template>
  <q-page>
    <div class="q-mb-md">
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ type | capitalize }} to access your Test Desk App.
      </q-banner>
    </div>
    <q-form @submit="onSubmit">
      <div>
        <q-input
          outlined
          lazy-rules
          v-model="email"
          label="Email"
          ref="email"
          :rules="[
            val => validateEmail(val) || 'Please enter a valid email address'
          ]"
        />
      </div>
      <div>
        <q-input
          outlined
          lazy-rules
          v-model="password"
          label="Password"
          type="password"
          ref="password"
          :rules="[val => val.length >= 6 || 'Please use maximum 6 characters']"
        />
      </div>
      <div class="row">
        <q-space />
        <q-btn :label="type" type="submit" color="primary" />
      </div>
    </q-form>
    <q-btn color="primary" icon="check" label="Sign In with Google" @click="googleSignup" />
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  filters: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  props: ["type"],
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser","googleSignup"]),
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.type === "login") {
          console.log("user login trigger");
          this.loginUser({
            email: this.email,
            password: this.password
          });
        } else {
          console.log("user register trigger");
          this.registerUser({
            email: this.email,
            password: this.password
          });
        }
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>

<style></style>
