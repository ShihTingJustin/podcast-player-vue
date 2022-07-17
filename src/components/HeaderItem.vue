<script lang="ts">
export default {
  name: "HeaderItem",
  props: {
    headerData: {},
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="left">
      <div class="image">
        <img :src="headerData.image" />
      </div>
      <div>{{ headerData.name }}</div>
    </div>
    <button>play button</button>
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
  }
}
</style>
