<template>
  <div class="rounded overflow-hidden shadow-lg flex flex-col">
    <router-link :to="`/post/${post.id}`"
      ><div class="relative">
        <img
          class="w-full"
          src="https://images.pexels.com/photos/5607365/pexels-photo-5607365.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Sunset in the mountains"
        />
        <div
          class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
        ></div></div
    ></router-link>
    <div class="px-6 py-4 mb-auto">
      <router-link
        :to="`/post/${post.id}`"
        class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
        >{{ post.title }}</router-link
      >
      <p class="text-gray-500 text-sm">
        {{ post.body }}
      </p>
    </div>
    <div
      class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100"
    >
      <span
        href="#"
        class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
      >
        <svg
          height="13px"
          width="13px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
			c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
			c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
              />
            </g>
          </g>
        </svg>
        <span class="ml-1"
          >Published by:
          <router-link :to="`/user/${post.userId}`">
            {{ getUserName }}
          </router-link></span
        ></span
      >

      <span
        href="#"
        class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
      >
        <svg class="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          ></path>
        </svg>
        <span class="ml-1">{{ userCommentsCount }} Comments</span></span
      >
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useUsersStore, useCommentsStore } from "@/stores";
export default {
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const usersStore = useUsersStore();
    const commentsStore = useCommentsStore();

    const users = computed(() => usersStore.users);
    const comments = computed(() => commentsStore.comments);

    const userCommentsCount = computed(() => {
      const comms = comments.value?.filter(
        (c) => c.postId === props.post?.userId
      );
      return comms?.length;
    });

    const getUserName = computed(() => {
      const user = users.value?.find((u) => u.id === props.post?.userId);
      return user?.name;
    });

    commentsStore.getComments();
    return {
      getUserName,
      userCommentsCount,
    };
  },
};
</script>
