<template>
  <div class="container">
    <!-- Langit senja animasi -->
    <div class="sky">
      <div class="stars"></div>
      <div class="clouds"></div>
    </div>

    <img
      src="/anime-corner1.png"
      class="anime-corner anime-corner-top-left"
      alt="Anime Decoration"
    />
    <img
      src="/anime-corner2.png"
      class="anime-corner anime-corner-top-right"
      alt="Anime Decoration"
    />
    <img
      src="/anime-corner3.png"
      class="anime-corner anime-corner-bottom-left"
      alt="Anime Decoration"
    />
    <img
      src="/anime-corner4.png"
      class="anime-corner anime-corner-bottom-right"
      alt="Anime Decoration"
    />

    <!-- Konsol Retro -->
    <div class="console">
      <!-- LED Indicator -->
      <div class="led-indicators">
        <div class="led" :class="{ blinking: isSoundOn }"></div>
        <div class="led blinking"></div>
        <div class="led"></div>
      </div>

      <!-- Layar CRT -->
      <div class="screen">
        <div class="crt-effect">
          <div class="scanline"></div>
          <h1 class="title pixel-text">HAPPY BIRTHDAY ETRIKU SAYANGKU CINTAKU CANTIKKU DUNIAKU</h1>

          <!-- Karakter Anime -->
          <img
            src="/anime-character.png"
            class="anime-character"
            alt="Anime Character"
            v-show="!isPhotoMode"
          />

          <!-- Pesan atau Gallery -->
          <transition name="fade-mode" mode="out-in">
            <div v-if="!isPhotoMode" key="message" class="message-box pixel-text">
              <transition name="fade" mode="out-in">
                <p :key="currentMessage" class="message">
                  {{ messages[currentMessage] }}
                </p>
              </transition>
            </div>

            <div v-else key="gallery" class="photo-gallery">
              <div
                v-for="(photo, index) in photos"
                :key="index"
                class="photo-item"
                :style="`--caption-color: ${photo.color}`"
              >
                <img :src="photo.url" alt="Birthday photo" class="pixel-art" />
                <div class="photo-caption pixel-text">
                  {{ photo.caption }}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Kontrol Gamepad -->
      <div class="controls">
        <div class="d-pad">
          <button class="d-btn up" @click="changeMessage('prev')"></button>
          <button class="d-btn down" @click="changeMessage('next')"></button>
          <button class="d-btn left"></button>
          <button class="d-btn right"></button>
          <div class="d-center"></div>
        </div>

        <div class="action-btns">
          <button class="action-btn a-btn" @click="showConfetti">A</button>
          <!-- <button class="action-btn b-btn" @click="toggleSound">B</button> -->
          <button
            class="action-btn c-btn"
            @click="togglePhotoMode"
            :class="{ 'active-mode': isPhotoMode }"
          >
            B
          </button>
        </div>
      </div>
      <button class="sound-toggle" @click="toggleSound" :data-sound="isSoundOn">
        {{ isSoundOn ? '🔊' : '🔇' }}
      </button>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler'
import confetti from 'canvas-confetti'
import anime from 'animejs/lib/anime.es.js' // <-- Gunakan path ini

export default {
  data() {
    return {
      currentMessage: 0,
      isSoundOn: false,
      isPhotoMode: false,
      messages: [
        'Selamat Ulang Tahun! Semoga bahagia selalu 🎉',
        'Semoga hari Etri penuh kebahagiaan dan cinta ❤️',
        'Jadilah bintang yang selalu bersinar terang ✨',
        'Semoga semua impian Etriku menjadi kenyataan!',
        'Terimakasih yaa sayangku sudah hadir di hidup aku! 💖',
      ],
      photos: [
        {
          url: '/birthday1.jpg',
          caption: 'Special Day! 🎈',
          color: '#ff4757',
        },
        {
          url: '/birthday2.jpg',
          caption: 'Selfie Pertama hehe',
          color: '#7bed9f',
        },
        {
          url: '/birthday3.jpg',
          caption: 'Cemberut saja 😍',
          color: '#ffa502',
        },
        {
          url: '/birthday4.jpg',
          caption: 'Cantikku! 💖',
          color: '#3742fa',
        },
      ],
      bgm: null,
    }
  },
  mounted() {
    this.initAnimations()
    this.initSound()
  },
  methods: {
    initAnimations() {
      // Animasi karakter
      anime({
        targets: '.anime-character',
        translateY: [-10, 10],
        duration: 2000,
        loop: true,
        easing: 'easeInOutQuad',
        direction: 'alternate',
      })

      // Animasi awan
      anime({
        targets: '.clouds',
        translateX: ['-100%', '100%'],
        duration: 30000,
        loop: true,
        easing: 'linear',
      })
    },

    initSound() {
      this.bgm = new Howl({
        src: ['/lagu.mp3'],
        loop: true,
        volume: 0.5,
        onplayerror: function () {
          // Handle browser audio context blocking
          this.bgm.once('unlock', () => this.bgm.play())
        },
      })
    },

    changeMessage(direction) {
      if (direction === 'next') {
        this.currentMessage = (this.currentMessage + 1) % this.messages.length
      } else {
        this.currentMessage =
          (this.currentMessage - 1 + this.messages.length) % this.messages.length
      }
      this.playSound('click')
    },

    showConfetti() {
      this.playSound('confetti')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffa500', '#ffff00'],
      })
    },

    toggleSound() {
      this.isSoundOn = !this.isSoundOn
      this.isSoundOn ? this.bgm.play() : this.bgm.pause()
      this.playSound('switch')
    },

    togglePhotoMode() {
      this.playSound('click')
      this.isPhotoMode = !this.isPhotoMode
      if (!this.isPhotoMode) this.currentMessage = 0
    },

    playSound(type) {
      const sounds = {
        click: new Howl({ src: ['/sfx-click.wav'] }),
        confetti: new Howl({ src: ['/sfx-confetti.wav'] }),
        switch: new Howl({ src: ['/sfx-switch.wav'] }),
      }
      sounds[type].play()
    },

    animateCaption(index) {
      anime({
        targets: `.photo-item:nth-child(${index + 1}) .photo-caption`,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
      })
    },
  },
}
</script>

<style scoped>
/* Base Style */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  background: linear-gradient(160deg, #ff6f61 0%, #ff9671 50%, #ffc75f 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Press Start 2P', cursive;
}

/* Efek Langit */
.sky {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: skyAnimation 20s infinite linear;
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('Stars.png') repeat;
  opacity: 0.3;
  animation: twinkle 5s infinite;
}

.clouds {
  position: absolute;
  width: 200%;
  height: 100%;
  background: url('Clouds.png') repeat-x;
  opacity: 0.2;
  animation: clouds-flow 30s linear infinite;
}

@keyframes clouds-flow {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Konsol Retro */
.console {
  background: #ffd1dc;
  border-radius: 20px;
  padding: 2rem;
  width: 600px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
  border: 5px solid #ff4757;
}

.screen {
  background: #c30b76;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
  overflow: hidden;
}

.crt-effect {
  position: relative;
  background:
    linear-gradient(rgba(18, 16, 16, 0.2) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size:
    100% 4px,
    3px 100%;
  min-height: 300px;
}

.scanline {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  animation: scanline 6s linear infinite;
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(300px);
  }
}

/* Kontrol Gamepad */
.controls {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.d-pad {
  position: relative;
  width: 120px;
  height: 120px;
}

.d-btn {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #c30b76;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.d-btn:active {
  background: #c30b76;
}

.d-btn.up {
  top: 0;
  left: 40px;
}
.d-btn.down {
  bottom: 0;
  left: 40px;
}
.d-btn.left {
  top: 40px;
  left: 0;
}
.d-btn.right {
  top: 40px;
  right: 0;
}

.action-btns {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.action-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 5px #666;
  position: relative;
  font-family: 'Press Start 2P', cursive;
}

.action-btn:active {
  box-shadow: 0 2px #666;
  transform: translateY(3px);
}

.a-btn {
  background: #ff4757;
}
.b-btn {
  background: #3742fa;
}
.c-btn {
  background: #77dd77;
  margin-left: 10px;
}

.active-mode {
  box-shadow: 0 0 15px #77dd77;
  animation: pulse 1s infinite;
}

/* Foto Gallery */
/* .photo-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.photo-item {
  position: relative;
  padding: 5px;
  background: #ffffff15;
  border: 2px solid var(--caption-color);
} */
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
}

/* Ukuran Item Foto */
.photo-item {
  width: 100%;
  height: 300px;
  flex-direction: column;
}

.pixel-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid var(--caption-color);
  flex: 1;
}

.photo-caption {
  height: 40px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  padding: 0.5rem;
}

/* Responsive Design */
@media (max-width: 600px) {
  .photo-gallery {
    grid-template-columns: 1fr;
    max-height: 300px;
  }

  .photo-item {
    height: 250px;
    max-width: 400px;
    margin: 0 auto;
  }
}

/* Scrollbar Styling */
.photo-gallery::-webkit-scrollbar {
  width: 8px;
}

.photo-gallery::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.photo-gallery::-webkit-scrollbar-thumb {
  background: #ff4757;
  border-radius: 4px;
}

/* .pixel-art {
  width: 100%;
  height: 150px;
  object-fit: cover;
  image-rendering: pixelated;
} */
.pixel-art {
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}

.photo-caption {
  padding: 8px;
  background: #000000dd;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  text-transform: uppercase;
  margin-top: 5px;
  position: relative;
}

.photo-caption::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 2px;
  background: var(--caption-color);
  filter: drop-shadow(0 0 3px var(--caption-color));
}

/* Animasi */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-mode-enter-active,
.fade-mode-leave-active {
  transition: all 0.5s ease;
}
.fade-mode-enter,
.fade-mode-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* LED Indicators */
.led-indicators {
  display: flex;
  gap: 10px;
  position: absolute;
  top: 15px;
  left: 15px;
}

.led {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff4757;
  opacity: 0.5;
}

.blinking {
  animation: blink 1s infinite;
}

.pixel-text {
  text-shadow: 2px 2px #000;
  font-size: 15px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .console {
    width: 90%;
    padding: 1rem;
  }

  .photo-gallery {
    grid-template-columns: 1fr;
  }
}

.anime-character {
  /* Ukuran dasar */
  width: 180px;
  height: auto;

  /* Posisi */
  position: absolute;
  right: 20px;
  bottom: 20px;

  /* Batasan ukuran */
  max-width: 20%;
  max-height: 20vh;

  /* Efek anime */
  filter: drop-shadow(0 0 10px rgba(255, 71, 87, 0.5));

  /* Responsif */
  @media (max-width: 768px) {
    width: 120px;
    right: 10px;
    bottom: 10px;
  }

  /* Animasi */
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.d-btn::after {
  content: '↑';
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.d-btn.down::after {
  content: '↓';
}
.d-btn.left::after {
  content: '←';
}
.d-btn.right::after {
  content: '→';
}

.anime-corner {
  position: absolute;
  z-index: 1; /* Di bawah console tapi di atas background */
  width: 150px;
  opacity: 0.8;
  filter: drop-shadow(0 0 10px rgba(255, 71, 87, 0.5));
  animation: float 6s ease-in-out infinite;
}

.anime-corner-top-left {
  top: -30px;
  left: -30px;
  transform: rotate(-15deg);
}

.anime-corner-top-right {
  top: -30px;
  right: -30px;
  transform: rotate(15deg);
}

.anime-corner-bottom-left {
  bottom: -30px;
  left: -30px;
  transform: rotate(15deg);
}

.anime-corner-bottom-right {
  bottom: -30px;
  right: -30px;
  transform: rotate(-15deg);
}

/* Animasi */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(-15deg);
  }
  50% {
    transform: translateY(-20px) rotate(-15deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .anime-corner {
    width: 100px;
    opacity: 0.6;
  }

  .anime-corner-top-left {
    top: -20px;
    left: -20px;
  }

  .anime-corner-top-right {
    top: -20px;
    right: -20px;
  }

  .anime-corner-bottom-left {
    bottom: -20px;
    left: -20px;
  }

  .anime-corner-bottom-right {
    bottom: -20px;
    right: -20px;
  }
}
.message {
  color: #ffffff; /* Warna putih */
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5); /* Tambahkan shadow untuk kontras */
}

/* Atau jika ingin memastikan inherit dari parent */
.message-box.pixel-text {
  color: white !important;
}

/* Jika menggunakan class pixel-text global */
.pixel-text {
  color: white;
}

.anime-character {
  position: absolute;

  transform: translate(-50%, -50%);
  width: 80%;
  height: auto;
  animation: ghostly 6s ease-in-out infinite;
}

.sound-toggle {
  /* Posisi & Ukuran */
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;

  /* Style Dasar */
  background: linear-gradient(145deg, #ff6b6b, #ff8e53);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 71, 87, 0.5);

  /* Efek Transisi */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Teks/Ikon */
  font-size: 1.5em;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

  /* Animasi */
  animation: button-float 3s ease-in-out infinite;
}

/* Efek Hover */
.sound-toggle:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 0 25px rgba(255, 71, 87, 0.8);
}

/* Efek Aktif */
.sound-toggle:active {
  transform: scale(0.95);
  box-shadow: 0 0 10px rgba(255, 71, 87, 0.3);
}

/* Status Sound On */
.sound-toggle[data-sound='true'] {
  background: linear-gradient(145deg, #7bed9f, #2ed573);
  box-shadow: 0 0 15px rgba(126, 237, 159, 0.5);
}

/* Animasi Pulsa */
@keyframes button-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Tooltip */
.sound-toggle::after {
  content: 'Toggle Sound';
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  font-family: 'Press Start 2P', cursive;
  opacity: 0;
  transition: opacity 0.3s;
}

.sound-toggle:hover::after {
  opacity: 1;
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .sound-toggle {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 1.2em;
  }
}
</style>
