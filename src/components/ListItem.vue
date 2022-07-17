<script lang="ts">
import { defineComponent } from "vue";
import type { Episode } from "@/interfaces/index";

export default defineComponent({
  name: "ListItem",
  props: {
    episode: Array<Episode>,
  },
  setup(props, ctx) {
    const handleClickEpisode = (episodeId: string) => {
      ctx.emit("getEpisodeDetail", episodeId);
      ctx.emit("toggleMode", "episode");
    };

    return { handleClickEpisode };
  },
});
</script>

<template>
  <div>
    <div
      class="wrapper"
      :key="ep.id"
      v-for="ep in episode"
      @click="handleClickEpisode(ep.id)"
    >
      <div>
        <div class="image">
          <img :src="ep.image" />
        </div>
        <div class="content">
          <h2>{{ ep.name }}</h2>
          <p>{{ ep.pubDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 40px auto;
    transition: 0.75s;
    &:hover {
      cursor: pointer;
      background-color: rgba(93, 93, 93, 0.07);
      transition: 0.75s;
    }

    .image {
      border: 2px solid rgb(200, 200, 200);
      img {
        max-width: 100px;
        max-height: 100px;
        object-fit: center;
      }
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 20px;
    }
  }
}
</style>
