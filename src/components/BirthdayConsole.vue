<template>
  <div class="console-card">
    <screen>
      <template v-if="mode === 'message'">
        {{ messages[currentMessageIndex] }}
      </template>
      <template v-else-if="mode === 'gallery'">
        <img :src="images[currentImageIndex]" alt="Gallery Image" />
      </template>
      <template v-else-if="mode === 'video'">
        <video
          :src="videos[currentVideoIndex]"
          controls
          autoplay
          muted
          playsinline
          style="max-width: 100%; border-radius: 8px"
        ></video>
      </template>
    </screen>

    <!-- DPad -->
    <dpad @up="prevItem" @down="nextItem" />

    <!-- Buttons -->
    <button-a @click="sendGreeting">Send</button-a>
    <button-b @click="toggleMode">{{ currentModeLabel }}</button-b>
  </div>
</template>

<script>
import DPad from './DPad.vue'
import ButtonA from './ButtonA.vue'
import ButtonB from './ButtonB.vue'

export default {
  components: { DPad, ButtonA, ButtonB },
  data() {
    return {
      modes: ['message', 'gallery', 'video'],
      modeIndex: 0,
      currentMessageIndex: 0,
      currentImageIndex: 0,
      currentVideoIndex: 0,

      messages: [
        'Selamat ulang tahun! Semoga bahagia selalu!',
        'Semoga semua impianmu tercapai!',
        'Semoga hari ini penuh kebahagiaan!',
      ],

      images: ['/images/anime_sunset_1.jpg', '/images/anime_sunset_2.jpg'],

      videos: ['/videos/birthday_animation_1.mp4', '/videos/birthday_animation_2.mp4'],
    }
  },
  computed: {
    mode() {
      return this.modes[this.modeIndex]
    },
    currentModeLabel() {
      return this.mode.charAt(0).toUpperCase() + this.mode.slice(1)
    },
  },
  methods: {
    toggleMode() {
      this.modeIndex = (this.modeIndex + 1) % this.modes.length
    },
    nextItem() {
      if (this.mode === 'message') {
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length
      } else if (this.mode === 'gallery') {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
      } else if (this.mode === 'video') {
        this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length
      }
    },
    prevItem() {
      if (this.mode === 'message') {
        this.currentMessageIndex =
          (this.currentMessageIndex - 1 + this.messages.length) % this.messages.length
      } else if (this.mode === 'gallery') {
        this.currentImageIndex =
          (this.currentImageIndex - 1 + this.images.length) % this.images.length
      } else if (this.mode === 'video') {
        this.currentVideoIndex =
          (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length
      }
    },
    sendGreeting() {
      alert('Ucapan terkirim! 🎉')
    },
  },
}
</script>

<style scoped>
.console-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.console-card img,
.console-card video {
  max-width: 100%;
  border-radius: 8px;
}
</style>
