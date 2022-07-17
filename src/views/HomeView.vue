<script lang="ts">
import { onMounted, reactive } from "vue";
import type { Podcast } from "@/interfaces/index";
import { getRssData } from "@/service/index";
import HeaderItem from "@/components/HeaderItem.vue";
import ListItem from "@/components/ListItem.vue";
import EpisodeItem from "@/components/EpisodeItem.vue";
import PlayerItem from "@/components/PlayerItem.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderItem,
    ListItem,
    EpisodeItem,
    PlayerItem,
  },
  data() {
    return {
      mode: "channel",
      episodeDetail: {
        name: "",
        image: "",
      },
    };
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
        name: data.podcastData.channelName,
        image: data.podcastData.channelImage,
      }"
    />
    <div v-if="mode === 'channel'">
      <ListItem />
    </div>
    <div v-if="mode === 'episode'">
      <EpisodeItem />
      <PlayerItem />
    </div>
  </main>
</template>
