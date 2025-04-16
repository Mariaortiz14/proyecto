import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userName: '',
    token: ''
  }),
  actions: {
    login(userName, token) {
      this.isLoggedIn = true;
      this.userName = userName;
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.isLoggedIn = false;
      this.userName = '';
      this.token = '';
      localStorage.clear();
    }
  },
});
