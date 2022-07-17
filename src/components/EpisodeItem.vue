<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { EpisodeMap } from "@/interfaces/index";

export default defineComponent({
  name: "EpisodeItem",
  props: {
    episodeDetail: {} as PropType<EpisodeMap>,
  },
});
</script>

<template>
  <div>
    <h2>Episode description</h2>
    <div v-html="episodeDetail?.encodedDescription"></div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-weight: 400;
  margin: 40px auto;
}
</style>
