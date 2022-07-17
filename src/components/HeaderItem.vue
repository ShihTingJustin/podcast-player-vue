<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "HeaderItem",
  props: {
    headerData: {} as PropType<{
      name: string;
      image: string;
      mode: string;
    }>,
  },
  setup(props, ctx) {
    const handleShowPlayer = () => ctx.emit("showPlayer");

    return { handleShowPlayer };
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="left">
      <div class="image">
        <img :src="headerData?.image" />
      </div>
      <h2>{{ headerData?.name }}</h2>
    </div>
    <div class="button-wrapper" v-if="headerData?.mode === 'episode'">
      <button type="button" @click="handleShowPlayer">Play</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    div:first-child {
      margin-right: 20px;
    }

    .image {
      border: 2px solid rgb(200, 200, 200);
      img {
        max-width: 200px;
        max-height: 200px;
        object-fit: center;
      }
    }

    h2 {
      display: flex;
      align-items: flex-end;
      margin-bottom: 10px;
    }
  }

  .button-wrapper {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    button {
      font-size: 18px;
      padding: 4px 10px;
      background-color: #fff;
      color: rgba(114, 114, 114, 0.6);
      border: 2px solid rgb(200, 200, 200);
      &:hover {
        cursor: pointer;
      }
      &:active {
        background-color: rgba(114, 114, 114, 0.1);
      }
    }
  }
}
</style>
