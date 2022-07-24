<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useEpisodeStore } from "@/stores/episode";
import HeaderItem from "@/components/HeaderItem.vue";
import ListItem from "@/components/ListItem.vue";

export default defineComponent({
  components: {
    HeaderItem,
    ListItem,
  },
  props: {},
  emits: ["getEpisodeDetail", "toggleMode", "showPlayer", "nextEpisode"],
  setup() {
    const store = useEpisodeStore();

    onMounted(async () => {
      store.getEpisodeDataAction();
    });

    return { store };
  },
});
</script>

<template>
  <main class="container">
    <div class="container__wrapper">
      <HeaderItem
        @showPlayer="store.showPlayer"
        :headerData="{
          mode: store.mode,
          name: store.episodeData.channelName,
          image: store.episodeData.channelImage,
        }"
      />
    </div>
    <div class="container__wrapper">
      <ListItem
        :episode="store.episodeData.episode"
        @toggleMode="store.toggleMode"
        @getEpisodeDetail="store.getEpisodeDetail"
      />
    </div>
  </main>
</template>
<style scoped lang="scss">
.container {
  padding-top: 2em;
  &__wrapper {
    padding: 0 2em;
  }
}
</style>
