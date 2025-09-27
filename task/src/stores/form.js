import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
  const submittedData = ref(null);

  const setSubmittedData = (data) => {
    submittedData.value = data;
    setTimeout(() => {
      submittedData.value = null; // Reset data after 2 seconds
    }, 2000);
  };

  return { submittedData, setSubmittedData };
});