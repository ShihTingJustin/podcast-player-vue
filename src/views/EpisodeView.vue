<script setup lang="ts">
import HeaderItem from "@/components/HeaderItem.vue";
import EpisodeItem from "@/components/EpisodeItem.vue";
import PlayerItem from "@/components/PlayerItem.vue";
</script>

<template>
  <div class="about">
    <HeaderItem />
    <EpisodeItem />
    <PlayerItem />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
