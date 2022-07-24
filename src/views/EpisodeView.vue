<script lang="ts">
import { defineComponent } from "vue";
import { useEpisodeStore } from "@/stores/episode";
import HeaderItem from "@/components/HeaderItem.vue";
import EpisodeItem from "@/components/EpisodeItem.vue";
import PlayerItem from "@/components/PlayerItem.vue";

export default defineComponent({
  components: {
    HeaderItem,
    EpisodeItem,
    PlayerItem,
  },
  props: {},
  emits: ["getEpisodeDetail", "toggleMode", "showPlayer", "nextEpisode"],
  setup() {
    const store = useEpisodeStore();

    return { store };
  },
});
</script>

<template>
  <div class="container">
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
      <EpisodeItem :episodeDetail="store.episodeDetail" />
    </div>
    <div v-if="store.isPlayerVisible">
      <PlayerItem
        @nextEpisode="store.getEpisodeDetail"
        :playerData="{
          id: store.episodeDetail.id,
          audio: store.episodeDetail.audio,
          name: store.episodeDetail.name,
          isPlayerVisible: store.isPlayerVisible,
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding-top: 2em;
  &__wrapper {
    padding: 0 2em;
  }
}
</style>
