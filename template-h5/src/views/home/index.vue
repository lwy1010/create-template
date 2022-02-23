<script setup lang="ts">
import { ref } from "vue";
import * as postApi from "@/api/posts";
import { Post } from "@/types/posts";
import { throttle } from "lodash-es";

const list = ref<Post[]>([]);
const loading = ref(false);
const finished = ref(false);
const pagination = ref({ page: 1, limit: 15 });

const onLoad = throttle(async () => {
  try {
    const { data } = await postApi.queryPosts(pagination.value);
    list.value = [...list.value, ...data.docs];
    loading.value = false;
    pagination.value.page++;

    if (list.value.length >= data.totalDocs) {
      finished.value = true;
    }
  } catch (error) {
    loading.value = false;
  }
}, 500);
</script>

<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了~" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id">
      <template #value>
        <div>{{ item.title }}</div>
      </template>
    </van-cell>
  </van-list>
</template>
