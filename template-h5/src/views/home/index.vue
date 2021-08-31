<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了~" @load="onLoad">
    <van-cell v-for="item in list" :key="item._id">
      <template #value>
        <movie-card :movie="item"></movie-card>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
import { ref } from "vue";
import { readMovies } from "@/api/home";
import MovieCard from "@/components/movie-card/index.vue";

export default {
  name: "Home",
  components: {
    MovieCard,
  },
  setup() {
    const list = ref([]);

    const loading = ref(false);

    const finished = ref(false);

    const params = ref({ page: 1, limit: 10 });

    const onLoad = async () => {
      try {
        const { data } = await readMovies(params.value);
        list.value = [...list.value, ...data.docs];
        loading.value = false;
        params.value.page++;

        if (list.value.length >= data.totalDocs) {
          finished.value = true;
        }
      } catch (error) {
        loading.value = false;
      }
    };

    return {
      list,
      loading,
      finished,
      onLoad,
    };
  },
};
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 10px 12px;
}
</style>
