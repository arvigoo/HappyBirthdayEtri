<template>
  <button class="button-a" @click="$emit('click')">A</button>
</template>

<style scoped>
.button-a {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
