<template>
  <nav>
    <div class="hamburger" @click="toggleNav">
      &#9776;
    </div>
    <ul class="nav-links" :class="{ 'open': isNavOpen }">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact Us</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isNavOpen = ref(false);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};
</script>

<style scoped>
nav {
  background-color: #34495e;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0 1rem;
  transition: color 0.3s;
}
.nav-links a:hover {
  color: #3498db;
}
.hamburger {
  display: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
}
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #34495e;
    padding: 1rem 0;
    z-index: 100;
  }
  .nav-links.open {
    display: flex;
  }
  .nav-links a {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #4a6375;
  }
}
</style>