import { defineStore } from 'pinia';
import { api } from '@/api';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {
    async getUsers() {
      const { data } = await api.get('/users');
      this.users = data;
    },
  },
});
