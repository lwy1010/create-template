<template>
  <div class="card">
    <van-image :src="movie.poster">
      <template #loading>
        <van-loading type="spinner" size="20"></van-loading>
      </template>
    </van-image>
    <div class="desc">
      <div class="title">{{ movie.name }}</div>
      <div class="rate">评分: {{ movie.rate || "暂无" }}</div>
      <div class="duration">时长: {{ movie.duration }}</div>
      <div class="casts">主演: {{ casts }}</div>
      <div class="summary">简介: {{ movie.summary }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Movie } from "@/types/movie";

export default defineComponent({
  name: "MovieCard",
  props: {
    movie: Object as PropType<Movie>,
  },
  setup(props) {
    const casts = computed(() => {
      if (!props?.movie?.casts?.length) return "未知";
      return props.movie.casts.map((cast) => cast.name).join(", ");
    });

    return {
      casts,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  .van-image {
    width: 90px;
    height: 140px;
    padding-right: 12px;
  }
  .desc {
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    font-size: $font-size-md;
    color: $gray-7;
    .title {
      font-size: $font-size-lg;
      font-weight: bold;
    }
    .rate {
      color: #ffb400;
    }
    .casts {
      @include ellipsis;
    }
    .summary {
      @include multi-ellipsis(3);
    }
  }
}
</style>
