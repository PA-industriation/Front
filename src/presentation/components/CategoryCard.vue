<script setup>


defineProps({
  href: { type: String, required: true },
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
  imgAlt: { type: String, required: true }
});
</script>

<template>
  <article class="category-showcase__card">
    <a class="category-showcase__card-link" :href="href">
      <h2 class="category-showcase__card-title">{{ title }}</h2>
      <div class="category-showcase__card-bg">
        <img :src="imgSrc" :alt="imgAlt" />
      </div>
    </a>
  </article>
</template>

<style scoped>

</style>