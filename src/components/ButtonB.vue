<template>
  <button class="button-b" @click="$emit('click')">B</button>
</template>

<style scoped>
.button-b {
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
