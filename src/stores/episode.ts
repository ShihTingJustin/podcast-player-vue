import { defineStore } from "pinia";
import { getRssData } from "@/service/index";
import type { Podcast } from "@/interfaces/index";

interface EpisodeStore {
  mode: string;
  isPlayerVisible: boolean;
  episodeData: Podcast;
  episodeDetail: {
    id: string;
    audio: string;
    name: string;
  };
}

export const useEpisodeStore = defineStore({
  id: "episode",
  state: (): EpisodeStore => ({
    mode: "channel",
    isPlayerVisible: false,
    episodeData: {
      channelName: "",
      channelImage: "",
      episode: [],
      episodeMap: {},
      lastEpisodeId: "",
    },
    episodeDetail: {
      id: "",
      audio: "",
      name: "",
    },
  }),
  getters: {},
  actions: {
    async getEpisodeDataAction() {
      try {
        const data = await getRssData();
        if (data) this.episodeData = data;
      } catch (err) {
        console.log(err);
      }
    },
    showPlayer() {
      this.isPlayerVisible = true;
    },
    toggleMode(mode: string) {
      this.mode = mode;
    },
    getEpisodeDetail(episodeId: string) {
      this.episodeDetail = this.episodeData.episodeMap[episodeId];
    },
  },
});
