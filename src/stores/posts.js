import { defineStore } from 'pinia';
import { api } from '@/api';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    comments: []
  }),
  getters: {
    // posts: state => state.posts,
  },
  actions: {
    async getPosts() {
      const { data } = await api.get('/posts');
      this.posts = data;
    },
    async getComments() {
      const { data } = await api.get('/comments');
      this.comments = data;
    },
  },
});
