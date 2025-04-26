<template>
  <div class="container">
    <!-- Langit senja -->
    <div class="sky">
      <div class="stars"></div>
      <div class="clouds"></div>
    </div>

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
          <h1 class="title pixel-text">HAPPY BIRTHDAY!</h1>

          <!-- Karakter Anime -->
          <!-- <img src="/anime-character.png" class="anime-character" alt="Anime Girl" /> -->

          <!-- Pesan -->
          <div class="message-box pixel-text">
            <transition name="fade" mode="out-in">
              <p :key="currentMessage" class="message">{{ messages[currentMessage] }}</p>
            </transition>
          </div>
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
          <button class="action-btn b-btn" @click="toggleSound">B</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler'
import confetti from 'canvas-confetti'
import * as anime from 'animejs' // Cara 2

export default {
  data() {
    return {
      currentMessage: 0,
      isSoundOn: false,
      messages: [
        '🎂 Happy Birthday! 🎉',
        '🌟 Semoga sukses selalu!',
        '🌸 Tetap jadi yang terbaik!',
        '🎮 Keep leveling up!',
      ],
      bgm: null,
      confettiInterval: null,
    }
  },
  mounted() {
    this.initAnimations()
    this.initSound()
  },
  methods: {
    initAnimations() {
      anime({
        targets: '.anime-character',
        translateY: [-10, 10],
        duration: 2000,
        loop: true,
        easing: 'easeInOutQuad',
        direction: 'alternate',
      })
    },

    initSound() {
      this.bgm = new Howl({
        src: ['/8bit-bgm.mp3'],
        loop: true,
        volume: 0.5,
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

    playSound(type) {
      const sounds = {
        click: new Howl({ src: ['/sfx-click.wav'] }),
        confetti: new Howl({ src: ['/sfx-confetti.wav'] }),
        switch: new Howl({ src: ['/sfx-switch.wav'] }),
      }
      sounds[type].play()
    },
  },
}
</script>

<style scoped>
/* Font Pixel */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.container {
  background: linear-gradient(160deg, #ff6f61 0%, #ff9671 50%, #ffc75f 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Efek Langit Senja */
.sky {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: skyAnimation 20s infinite linear;
}

.stars {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==);
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

/* Konsol Retro */
.console {
  background: #2a2a2a;
  border-radius: 20px;
  padding: 2rem;
  width: 600px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
  border: 5px solid #ff4757;
}

.screen {
  background: #1a1a1a;
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
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  animation: scanline 4s linear infinite;
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(300px);
  }
}

.message-box {
  background: #000;
  border: 2px solid #ff4757;
  padding: 1rem;
  margin: 1rem;
  color: #fff;
  font-size: 1.2rem;
}

.anime-character {
  width: 150px;
  position: absolute;
  right: 20px;
  bottom: 20px;
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
  background: #4a4a4a;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.d-btn:active {
  background: #ff4757;
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
}

.action-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  font-family: 'Press Start 2P', cursive;
  color: white;
  cursor: pointer;
  box-shadow: 0 5px #666;
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

.pixel-text {
  font-family: 'Press Start 2P', cursive;
  text-shadow: 2px 2px #000;
}
</style>
