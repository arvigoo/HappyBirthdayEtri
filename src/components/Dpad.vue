<template>
  <div class="dpad">
    <button @click="$emit('up')">↑</button>
    <div>
      <button @click="$emit('left')">←</button>
      <button @click="$emit('right')">→</button>
    </div>
    <button @click="$emit('down')">↓</button>
  </div>
</template>

<style scoped>
.dpad {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dpad div {
  display: flex;
}
.dpad button {
  margin: 5px;
  padding: 10px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
