<script setup>
import "../styles/global.css";
defineProps({
  title: String,
  description: String,
  image: String,
  tags: Array,
  url: String,
});
</script>

<template>
  <a
    :href="url"
    class="group block forge-card overflow-hidden transition-all duration-300 hover:border-forge-accent hover:-translate-y-1 no-underline flex flex-col"
  >
    <img :src="image" :alt="title" class="w-full h-48 object-cover" />
    <div class="p-1 flex flex-col flex-1">
      <div>
        <h3
          class="text-xl font-bold text-white mb-2 group-hover:text-forge-accent transition-colors"
        >
          {{ title }}
        </h3>
        <p class="text-forge-text-secondary mb-4">{{ description }}</p>
      </div>

      <div class="flex flex-wrap gap-2 mt-auto">
        <span v-for="tag in tags" :key="tag" class="forge-tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>
