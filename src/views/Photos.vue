<!-- src/views/Photos.vue -->
<template>
  <div class="photos-page">
    <h1>Kumpulan Foto 🎞️</h1>
    <div class="gallery">
      <img v-for="(url, index) in photos" :key="index" :src="url" :alt="'Photo ' + (index + 1)" />
    </div>
    <router-link to="/" class="back-btn">⬅️ Kembali</router-link>
  </div>
</template>

<script setup>
const photos = [
  'https://placekitten.com/300/200',
  'https://placekitten.com/301/201',
  'https://placekitten.com/302/202',
  'https://placekitten.com/303/203',
  'https://placekitten.com/304/204',
]
</script>

<style scoped>
.photos-page {
  padding: 2rem;
  text-align: center;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.gallery img {
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.back-btn {
  display: inline-block;
  margin-top: 2rem;
  text-decoration: none;
  padding: 10px 20px;
  background-color: #888;
  color: white;
  border-radius: 8px;
}
.back-btn:hover {
  background-color: #666;
}
</style>
