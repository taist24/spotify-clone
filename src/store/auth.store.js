import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    state: null,
    authentication: {
      access_token: null,
      refresh_token: null,
      token_type: null,
      expires_in: null,
    },
  }),
  actions: {
    logOut() {
      this.$reset();
    },
  },
});
