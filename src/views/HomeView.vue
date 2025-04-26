<template>
  <div
    class="w-full h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-red-600 flex items-center justify-center relative overflow-hidden"
  >
    <!-- Clouds / Background -->
    <div class="absolute top-0 left-0 w-full h-full bg-cloud-pattern opacity-30"></div>

    <!-- Birthday Card -->
    <BirthdayCard />
  </div>
</template>

<script>
import BirthdayCard from '@/components/BirthdayCard.vue'

export default {
  components: {
    BirthdayCard,
  },
}
</script>

<style scoped>
.bg-cloud-pattern {
  background: url('/assets/clouds.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
