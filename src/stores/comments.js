import { defineStore } from 'pinia';
import { api } from '@/api';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [],
  }),
  getters: {},
  actions: {
    async getComments() {
      const { data } = await api.get('/comments');
      this.comments = data;
    },
  },
});
