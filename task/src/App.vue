<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* Global styles for the entire application can go here */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  margin: 0;
  background-color: #f0f2f5;
}
</style>