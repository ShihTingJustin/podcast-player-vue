<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import type { PropType } from "vue";
import PlayIcon from "@/assets/play.png";
import PauseIcon from "@/assets/pause.png";

export default defineComponent({
  name: "PlayerItem",
  props: {
    playerData: {} as PropType<{
      id: string;
      audio: string;
      name: string;
      isPlayerVisible: boolean;
      lastEpisodeId: string;
    }>,
  },
  setup(props, ctx) {
    const audioRef = ref<HTMLAudioElement>();
    const state = reactive({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      seekBarPosition: 0,
      isLastEpisode: props.playerData?.id === props.playerData?.lastEpisodeId,
    });

    const play = () => {
      const playPromise = audioRef?.value?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            state.isPlaying = true;
            state.duration = audioRef?.value?.duration;
          })
          .catch((err) => {
            state.isPlaying = false;
            console.log(err);
          });
      }
    };

    const pause = () => {
      audioRef?.value?.pause();
      state.isPlaying = false;
    };

    const togglePlayer = () => {
      if (state.isPlaying) pause();
      else play();
    };

    const handleSeekBarChange = (e) => {
      const updateTime = e.target.value;
      state.currentTime = updateTime;
      state.seekBarPosition = updateTime;
    };

    const handleNextEpisode = (episodeId: string) => {
      if (!state.isLastEpisode)
        ctx.emit("nextEpisode", `${Number(episodeId + 1)}`);
    };

    const handleTimeUpdate = () => {
      state.seekBarPosition = audioRef.value?.currentTime;

      if (audioRef.value?.ended) {
        pause();
        state.isPlaying = false;
        state.currentTime = 0;

        handleNextEpisode(props.playerData?.id);
      }
    };

    const handleCanPlay = (e: Event) => {
      if (e && !state.isLastEpisode) play();
    };

    onMounted(() => {
      if (props.playerData?.isPlayerVisible) {
        play();
      }
    });

    return {
      audioRef,
      state,
      PlayIcon,
      PauseIcon,
      play,
      togglePlayer,
      handleSeekBarChange,
      handleTimeUpdate,
      handleCanPlay,
    };
  },
});
</script>

<template>
  <div>
    <div class="player">
      <div class="player__progress-container">
        <input
          type="range"
          class="slider"
          min="0"
          :max="state.duration"
          @input="handleSeekBarChange"
          v-model="state.seekBarPosition"
        />
      </div>
      <div class="player__button-container">
        <div
          class="player__button-container__play-button"
          @click="togglePlayer"
        >
          <img :src="state.isPlaying ? PauseIcon : PlayIcon" />
        </div>
        <h3>Now Playing {{ playerData?.name }}</h3>
      </div>

      <audio
        ref="audioRef"
        :src="playerData?.audio"
        :currentTime="state.currentTime"
        @timeupdate="handleTimeUpdate"
        @canplay="handleCanPlay"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.player {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__progress-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__button-container {
    display: flex;
    align-items: center;
    margin: 10px auto auto 40px;
    &__play-button {
      background: #f0f0f0;
      border-radius: 100px;
      display: flex;
      align-items: center;
      padding: 10px;
      border: 4px solid rgb(33, 33, 33);
    }
    &__play-button img {
      width: 20px;
      height: 20px;
      border-radius: 100px;
    }
    h3 {
      margin-left: 20px;
    }
  }
}
</style>
