<script setup>

defineProps({
  href: { type: String, required: true },
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
  imgAlt: { type: String, default: '' },
  bgClass: { type: String, default: '' }
})

</script>

<template>
  <article class="catalog-card">
    <a
        :href="href"
        class="catalog-card__link"
        :class="bgClass"
        itemscope
        itemtype="http://schema.org/ImageObject"
    >
      <span class="catalog-card__title">{{ title }}</span>
      <img
          class="catalog-card__img"
          width="170"
          height="170"
          loading="lazy"
          :src="imgSrc"
          :alt="imgAlt"
      />
    </a>
  </article>
</template>

<style scoped>
.catalog-card {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  width: 348px;
  height: 236px;
  display: flex;
  align-items: stretch;
  box-shadow: 0 2px 16px rgba(40,80,40,0.07);
}

.catalog-card__link {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
  color: inherit;
}

.catalog-card__title {
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 1.35em;
  font-weight: 500;
  color: #fff;
  text-shadow: 0 2px 8px rgba(60,120,60,0.13);
  z-index: 2;
  letter-spacing: 0.01em;
}

.catalog-card__img {
  position: absolute;
  right: 12px;
  bottom: 10px;
  max-width: 65%;
  max-height: 80%;
  object-fit: contain;
  z-index: 1;
  /* Опционально: мягкая тень для отделения от фона */
  filter: drop-shadow(0 2px 8px rgba(40,80,40,0.10));
  background: transparent;
  pointer-events: none;
}

</style>