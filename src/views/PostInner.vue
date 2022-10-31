<template>
  <div class="post">
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 text-left">
      <p class="font-medium text-3xl mb-20">
        {{ post.title }}
      </p>
      <p class="font-medium text-xl mb-2">
        {{ post.body }}
      </p>
      <router-link
        :to="`/user/${user.id}`"
        class="font-medium text-l mb-2 mt-4"
      >
        Name: {{ user.name }} <br />
        Email: {{ user.email }} <br />
      </router-link>
      <div class="mt-10">Comments:</div>
      <div
        class="my-2 text-sm"
        v-for="comment in userComments"
        :key="comment.id"
      >
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePostsStore, useUsersStore, useCommentsStore } from "@/stores";
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
    const commentsStore = useCommentsStore();

    const posts = computed(() => postsStore.posts);
    const users = computed(() => usersStore.users);

    const post = computed(() =>
      posts.value?.find((post) => post.id == route.params.id)
    );
    const user = computed(() =>
      users.value?.find((user) => user.id === post.value?.userId)
    );
    const userComments = computed(() =>
      commentsStore.comments?.filter((c) => c.postId === post.value?.id)
    );

    !posts.value?.length && postsStore.getPosts();
    !users.value?.length && usersStore.getUsers();
    !commentsStore.comments?.length && commentsStore.getComments();

    return {
      post,
      user,
      userComments,
    };
  },
};
</script>
