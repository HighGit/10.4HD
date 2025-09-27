<template>
  <div class="contact-form-container">
    <h2>Contact Us</h2>
    <p>If you have any questions, please fill out the form below.</p>
    <form @submit.prevent="handleSubmit">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="formData.name" required>

      <div class="form-checkbox">
        <input type="checkbox" id="subscribe" v-model="formData.subscribe">
        <label for="subscribe">Subscribe to our newsletter</label>
      </div>
      
      <label for="country">Country:</label>
      <select id="country" v-model="formData.country" required>
        <option disabled value="">Please select a country</option>
        <option v-for="country in countries" :value="country">{{ country }}</option>
      </select>

      <div v-if="formData.country === 'Other'">
        <label for="other-country">Please specify:</label>
        <input type="text" id="other-country" v-model="formData.otherCountry" required>
      </div>
      
      <label for="age">Age:</label>
      <input type="number" id="age" v-model.number="formData.age" min="1" required>
      <p v-if="showAgeValidation" class="validation-text" :class="ageValid ? 'valid' : 'invalid'">
        {{ ageValidationMessage }}
      </p>

      <label>Contact Preference:</label>
      <div class="form-radio">
        <input type="radio" id="email_pref" value="Email" v-model="formData.contactPreference">
        <label for="email_pref">Email</label>
      </div>
      <div class="form-radio">
        <input type="radio" id="sms_pref" value="SMS" v-model="formData.contactPreference">
        <label for="sms_pref">SMS</label>
      </div>

      <div v-if="formData.contactPreference === 'Email'">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div v-if="formData.contactPreference === 'SMS'">
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" v-model="formData.phoneNumber" required>
      </div>
      
      <label for="message">Message:</label>
      <textarea id="message" v-model="formData.message" rows="4" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useFormStore } from '@/stores/form.js';

const formStore = useFormStore();

const formData = ref({
  name: '',
  subscribe: false,
  country: '',
  otherCountry: '',
  age: null,
  contactPreference: 'Email',
  email: '',
  phoneNumber: '',
  message: ''
});

const countries = ref([
  'Australia', 'New Zealand', 'United States', 'United Kingdom', 'Canada', 'Other'
]);

const showAgeValidation = ref(false);
const ageValid = ref(false);
const ageValidationMessage = ref('');

watch(() => formData.value.age, (newAge) => {
  if (newAge !== null) {
    showAgeValidation.value = true;
    if (newAge >= 18 && newAge <= 125) {
      ageValid.value = true;
      ageValidationMessage.value = 'Age is valid.';
    } else {
      ageValid.value = false;
      ageValidationMessage.value = 'Please enter a valid age between 18 and 125.';
    }
  } else {
    showAgeValidation.value = false;
  }
});

const handleSubmit = () => {
  if (formData.value.age < 18 || formData.value.age > 125) {
    ageValid.value = false;
    ageValidationMessage.value = 'Please enter a valid age between 18 and 125.';
    showAgeValidation.value = true;
    return;
  }

  if (formData.value.contactPreference === 'Email' && !formData.value.email) {
    return;
  }
  if (formData.value.contactPreference === 'SMS' && !formData.value.phoneNumber) {
    return;
  }
  
  if (formData.value.name && formData.value.message) {
    formStore.setSubmittedData({ ...formData.value });
  }
};
</script>

<style scoped>
.contact-form-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 1rem;
  font-weight: bold;
  color: #34495e;
}
input, textarea, button, select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
  font-size: 1rem;
}
textarea {
  resize: vertical;
}
button {
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1.5rem;
}
.confirmation-message, .error-message {
  text-align: center;
  font-weight: bold;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 5px;
}
.confirmation-message {
  color: #27ae60;
  background-color: #d4edda;
}
.error-message {
  color: #c0392b;
  background-color: #f8d7da;
}
.form-checkbox, .form-radio {
  flex-direction: row;
  align-items: center;
}
.form-checkbox input, .form-radio input {
  margin-right: 0.5rem;
  margin-top: 1rem;
}
.form-radio {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}
.validation-text {
  font-size: 0.9em;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.valid {
  color: #27ae60;
}
.invalid {
  color: #c0392b;
}
</style>