<template>
  <div class="max-w-xl mx-auto">
    <!-- Header -->
    <h2 class="text-3xl font-bold text-white text-center mb-2">
      Ready for the Forge?
    </h2>
    <p class="text-forge-text-secondary text-center mb-8">
      Send us a message and let's build something together.
    </p>

    <!-- Contact Form -->
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <input type="email" v-model="email" placeholder="Your E-mail" required />
      <input
        type="text"
        v-model="name"
        placeholder="Your Name or Company"
        required
      />
      <textarea
        v-model="message"
        placeholder="Tell us about your project..."
        required
        rows="5"
      ></textarea>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="formStatus === 'sending'"
        class="forge-btn forge-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ formStatus === "sending" ? "Sending..." : "Send Message" }}
      </button>
    </form>

    <!-- User Feedback Messages -->
    <div v-if="formStatus === 'success'" class="form-success">
      <p>Message sent! We'll get back to you soon.</p>
    </div>

    <div v-if="formStatus === 'error'" class="form-error">
      <p>An error occurred. Please try again or reach out on Twitter.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// --- Form State ---
const email = ref("");
const name = ref("");
const message = ref("");

// --- UX State ---
// Possible values: '', 'sending', 'success', 'error'
const formStatus = ref("");

// --- Submission Logic ---
const submitForm = async () => {
  formStatus.value = "sending";

  try {
    // IMPORTANT: Replace with our actual API endpoint
    const response = await axios.post("https://YOUR_API_ENDPOINT/feedback", {
      email: email.value,
      name: name.value,
      message: message.value,
    });

    console.log("Message sent successfully:", response.data);
    formStatus.value = "success";

    // Clear form on success
    email.value = "";
    name.value = "";
    message.value = "";
  } catch (error) {
    console.error("Error sending message:", error);
    formStatus.value = "error";
  }
};
</script>
