<template>
  <main>
    <ContactForm />
    <div v-if="submittedData" class="data-display">
      <h3>Submitted Data (Parent Component)</h3>
      <p><strong>Name:</strong> {{ submittedData.name }}</p>
      <p v-if="submittedData.contactPreference === 'Email'"><strong>Email:</strong> {{ submittedData.email }}</p>
      <p v-if="submittedData.contactPreference === 'SMS'"><strong>Phone Number:</strong> {{ submittedData.phoneNumber }}</p>
      <p><strong>Country:</strong> {{ submittedData.country }}<span v-if="submittedData.otherCountry"> ({{ submittedData.otherCountry }})</span></p>
      <p><strong>Age:</strong> {{ submittedData.age }}</p>
      <p><strong>Contact Preference:</strong> {{ submittedData.contactPreference }}</p>
      <p><strong>Subscribed:</strong> {{ submittedData.subscribe ? 'Yes' : 'No' }}</p>
    </div>
  </main>
</template>

<script setup>
import ContactForm from './ContactForm.vue';
import { useFormStore } from '@/stores/form.js';
import { storeToRefs } from 'pinia';

const formStore = useFormStore();
const { submittedData } = storeToRefs(formStore);
</script>

<style scoped>
/* Scoped styles for this view */
</style>