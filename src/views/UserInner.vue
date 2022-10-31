<template>
  <div class="user">
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 text-left">
      <div class="flex flex-col">
        <div class="flex-1">
          <div class="bg-white shadow mr-8">
            <div class="px-6 py-6 pb-0 border-t-4 border-green">
              <div class="text-center text-xl mb-2">
                {{ user.name }} ( {{ user.username }} )
              </div>
              <div class="text-center text-grey-dark mb-6">
                <span class="text-grey-light px-1">&bullet;</span>
                {{ user.email }}
              </div>
              <div class="text-center mb-6 flex flex-wrap justify-center">
                <span
                  class="border-2 border-grey-light px-4 py-2 rounded-full text-sm text-grey-darker mr-1 mb-1"
                  >{{ user.website }}</span
                >
                <span
                  class="border-2 border-grey-light px-4 py-2 rounded-full text-sm text-grey-darker mr-1 mb-1"
                  >{{ user.phone }}</span
                >
              </div>
              <div class="border-1 border-grey-light mb-4 mx-8"></div>

              <div class="border border-grey-light mb-2 mx-8"></div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-2xl mt-20 mb-9">Posts by: {{ user.name }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <PostCard v-for="post in userPosts" :key="post.id" :post="post" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePostsStore, useUsersStore } from "@/stores";
import PostCard from "@/components/PostCard.vue";

export default {
  name: "PostInner",
  components: {
    PostCard,
  },
  setup(props) {
    const route = useRoute();

    const postsStore = usePostsStore();
    const usersStore = useUsersStore();

    const posts = computed(() => postsStore.posts);
    const users = computed(() => usersStore.users);

    const user = computed(() =>
      users.value?.find((user) => user.id == route.params.id)
    );
    const userPosts = computed(() =>
      posts.value.filter((p) => p.userId === user.value.id)
    );

    !posts.value?.length && postsStore.getPosts();
    !users.value?.length && usersStore.getUsers();

    return {
      user,
      userPosts,
    };
  },
};
</script>
