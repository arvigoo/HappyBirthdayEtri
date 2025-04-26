<template>
  <div class="console-card">
    <!-- Layar -->
    <div class="screen">
      <p>{{ message }}</p>
    </div>

    <!-- Directional Pad -->
    <div class="dpad">
      <button @click="changeToNext" aria-label="Next Message">▶️</button>
      <button @click="changeToPrev" aria-label="Previous Message">◀️</button>
    </div>

    <!-- Tombol Aksi -->
    <game-buttons @random-message="randomizeMessage" />
  </div>
</template>

<script>
import GameButtons from './GameButtons.vue'

export default {
  props: ['message'],
  components: { GameButtons },
  data() {
    return {
      messages: [
        'Selamat Ulang Tahun! Semoga bahagia selalu 🎉',
        'Semoga harimu penuh kebahagiaan dan cinta ❤️',
        'Jadilah bintang yang selalu bersinar terang ✨',
        'Hari ini adalah awal dari petualangan barumu!',
        'Semoga semua impianmu menjadi kenyataan!',
      ],
      currentIndex: 0,
    }
  },
  watch: {
    message(newVal) {
      const idx = this.messages.indexOf(newVal)
      if (idx !== -1) this.currentIndex = idx
    },
  },
  methods: {
    changeToNext() {
      this.currentIndex++
      if (this.currentIndex >= this.messages.length) {
        this.currentIndex = 0
      }
      this.$emit('update-message', this.messages[this.currentIndex])
    },

    changeToPrev() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.messages.length - 1
      }
      this.$emit('update-message', this.messages[this.currentIndex])
    },

    randomizeMessage() {
      const randomIdx = Math.floor(Math.random() * this.messages.length)
      this.$emit('update-message', this.messages[randomIdx])
    },
  },
}
</script>

<style scoped>
/* Bentuk card mirip handheld console */
.console-card {
  width: 320px;
  height: 520px;
  background: #f5f5f5;
  border-radius: 30px;
  position: relative;
  box-shadow:
    inset -6px -6px #ffffff,
    inset 6px 6px #c7c7c7,
    -10px -10px rgba(255, 255, 255, 0.8),
    10px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

/* Layar console */
.screen {
  margin-top: -20px;
  margin-bottom: auto;
  padding-top: 40px;
  width: 260px;
  height: 200px;
  background: #a8dadc;
  border-radius: 20%;
  text-align: center;
  font-weight: bold;
  color: #333;
  font-size: 18pt;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    inset -4px -4px rgba(255, 255, 255, 0.9),
    inset 4px 4px rgba(0, 0, 0, 0.15);
}

/* Directional pad container */
.dpad {
  position: absolute;
  bottom: 110px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
}

/* Tombol dpad style */
.dpad button {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: black;
  color: white;
  border: none;
  font-size: 24pt;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.dpad button:hover {
  background-color: #222;
}

/* Style tombol aksi merah */
.game-button {
  position: absolute;
  bottom: 40px;
  right: 45px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: red;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 22pt;
  cursor: pointer;
  box-shadow:
    inset -3px -3px rgba(255, 100, 100, 0.8),
    3px 3px rgba(150, 20, 20, 0.9);
  transition: all 0.25s ease-in-out;
}

.game-button:hover {
  background: #ff6666;
}

@media screen and (max-width: 400px) {
  .console-card {
    width: auto;
    height: auto;
    margin: 0.5rem;
  }
  .screen {
    width: auto;
    height: auto;
    padding: 0.75rem;
  }
}

/* Animasi tekan tombol */
.pressed {
  transform: scale(0.85);
  box-shadow: none !important;
}
</style>
