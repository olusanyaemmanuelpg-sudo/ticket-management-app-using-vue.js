<script setup>
import FooterPage from '@/components/FooterPage.vue'
const featuresDescription = [
  {
    title: 'Real-time Updates',
    desc: 'Get instant notifications on ticket status changes',
  },
  {
    title: 'Team Collaboration',
    desc: 'Work together seamlessly with your team',
  },
  {
    title: 'Advanced Filtering',
    desc: 'Find tickets quickly with powerful search',
  },
]
</script>

<template>
  <div class="circle"></div>
  <main>
    <nav>
      <h2 class="logo">TicketFlow</h2>
      <div class="nav-btn">
        <a href="login" class="secondaryButton"> Login </a>
        <a href="signin" class="primaryButton"> Signin </a>
      </div>
    </nav>

    <section class="heroSection">
      <div class="circle2"></div>
      <h1 class="heroH1">
        Manage Your Tickets
        <br />
        With Ease
      </h1>
      <p class="heroP">
        A powerful and intuitive ticket management system built for modern teams. Track, organize,
        and resolve issues faster.
      </p>
      <a href="signin" class="heroBtn"> Start Free </a>
    </section>
    <svg class="svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path
        fill="rgba(59, 130, 246, 0.1)"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </main>

  <section class="featuresSection">
    <div class="features">
      <h2>Key Feautures</h2>
      <div class="feautures-grid">
        <div v-for="(features, i) in featuresDescription" :key="i" class="featureCard">
          <h3>{{ features.title }}</h3>
          <p>{{ features.desc }}</p>
        </div>
      </div>
    </div>
  </section>
  <FooterPage />
</template>

<style>
/** @format */

html,
body {
  max-width: 100%;
  overflow-x: hidden;
}

body {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  position: relative;
}
main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.circle {
  position: absolute;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  border-radius: 50%;
  top: -100px;
  right: -100px;
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
}

nav {
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 2rem 0;
  gap: 1rem;
}
nav h2 {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
nav .nav-btn {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
nav .secondaryButton {
  background-color: rgba(51, 65, 85, 0.8);
  text-decoration: none;
  color: white;
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}
nav .primaryButton {
  text-decoration: none;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.heroSection {
  text-align: center;
  padding: 6rem 0;
  position: relative;
}
.circle2 {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  filter: blur(40px);
}
.heroH1 {
  color: white;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}
.heroP {
  color: #94a3b8;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  margin-bottom: 2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}
.heroBtn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  z-index: 1000;
}
.svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.featuresSection {
  background: rgba(15, 23, 42, 0.8);
  padding: 6rem 2rem;
}
.features {
  max-width: 1440px;
  margin: 0 auto;
}
.features h2 {
  color: white;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
}
.feautures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}
.featureCard {
  background: rgba(30, 41, 59, 0.8);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(148, 163, 184, 0.1);
}
.featureCard h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.featureCard p {
  color: #94a3b8;
  line-height: 1.6;
}

@media (max-width: 402px) {
  .nav-btn {
    margin-left: 5rem;
  }
}
@media (max-width: 364px) {
  .nav-btn {
    margin-left: 4rem;
  }
}
@media (max-width: 350px) {
  .nav-btn {
    margin-left: 3rem;
  }
}

@media (max-width: 330px) {
  .nav-btn {
    margin-left: 2rem;
  }
}

@media (max-width: 320px) {
  .nav-btn {
    margin-left: 1rem;
  }
}

@media (max-width: 305px) {
  .nav-btn {
    margin-left: 0;
  }
}
</style>
