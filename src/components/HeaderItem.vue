<script setup lang="ts">
// defineProps<{
//   msg: string;
// }>();
</script>

<template>
  <div class="wrapper">
    <div class="left">
      <div>channel image</div>
      <div>channel or episode name</div>
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
  }
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
