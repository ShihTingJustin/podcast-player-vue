<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import type { Podcast } from "@/interfaces/index";
import { getRssData } from "@/service/index";
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
  emits: ["getEpisodeDetail", "toggleMode"],
  data() {
    return {
      mode: "channel",
      isPlaying: false,
      episodeDetail: {
        name: "",
        image: "",
      },
    };
  },
  methods: {
    toggleMode(mode: string) {
      this.mode = mode;
    },
    getEpisodeDetail(episodeId: string) {
      this.episodeDetail = this.data.podcastData.episodeMap[episodeId];
    },
  },
  setup() {
    const data: { podcastData: Podcast } = reactive({
      podcastData: {
        channelName: "",
        channelImage: "",
        episode: [],
        episodeMap: {},
      },
    });

    onMounted(async () => {
      const res = await getRssData();
      if (res) data.podcastData = res;
    });

    return { data };
  },
});
</script>

<template>
  <main>
    <HeaderItem
      :headerData="{
        mode,
        name:
          mode === 'channel'
            ? data.podcastData.channelName
            : episodeDetail.name,
        image:
          mode === 'channel'
            ? data.podcastData.channelImage
            : episodeDetail.image,
      }"
    />
    <div v-if="mode === 'channel'">
      <ListItem
        :episode="data.podcastData.episode"
        @toggleMode="toggleMode"
        @getEpisodeDetail="getEpisodeDetail"
      />
    </div>
    <div v-if="mode === 'episode'">
      <EpisodeItem />
      <div v-if="isPlaying">
        <PlayerItem />
      </div>
    </div>
  </main>
</template>
