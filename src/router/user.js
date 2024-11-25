import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userName: '',
  }),
  actions: {
    login(userName) {
      this.isLoggedIn = true;
      this.userName = userName;
    },
    logout() {
      this.isLoggedIn = false;
      this.userName = '';
    },
  },
});
