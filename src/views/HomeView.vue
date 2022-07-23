<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useEpisodeStore } from "@/stores/episode";
import HeaderItem from "@/components/HeaderItem.vue";
import ListItem from "@/components/ListItem.vue";
import EpisodeItem from "@/components/EpisodeItem.vue";
import PlayerItem from "@/components/PlayerItem.vue";

export default defineComponent({
  components: {
    HeaderItem,
    ListItem,
    EpisodeItem,
    PlayerItem,
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
    <div class="container__wrapper" v-if="store.mode === 'channel'">
      <ListItem
        :episode="store.episodeData.episode"
        @toggleMode="store.toggleMode"
        @getEpisodeDetail="store.getEpisodeDetail"
      />
    </div>
    <div v-if="store.mode === 'episode'">
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
