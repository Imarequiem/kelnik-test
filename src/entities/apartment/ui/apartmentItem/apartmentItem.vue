<template>
  <div class="apart-item">
    <div class="apart-item__image">
      <img
        width="80"
        height="80"
        :src="apartment.image"
        :alt="apartment.title"
      />
    </div>

    <span class="apart-item__title">
      {{ apartment.title }}
    </span>

    <div class="apart-item__info">
      <span class="apart-item__size">
        {{ apartment.size }}
      </span>

      <span class="apart-item__floor">
        {{ apartment.floor }}

        <span class="apart-item__floor-all">из 17</span>
      </span>

      <span class="apart-item__price">
        {{ apartment.price.toLocaleString() }} ₽
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IApartment } from '@/entities/apartment/types/IApartment'

defineProps<{ apartment: IApartment }>()
</script>

<style scoped lang="scss">
.apart-item {
  display: grid;
  grid-template-areas: 'image title info info info';
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--main-grey);
  padding: 8px 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  &__image {
    min-width: 100px;
    grid-area: image;
  }

  &__title {
    min-width: 301px;
    grid-area: title;
  }

  &__info {
    display: grid;
    align-items: center;
    grid-template-areas: 'size floor price';
    grid-template-columns: repeat(3, 1fr);
    grid-area: info;
  }

  &__size {
    min-width: 140px;
    grid-area: size;
  }

  &__floor {
    min-width: 140px;
    grid-area: floor;

    &-all {
      color: var(--main-grey);
    }
  }

  &__price {
    min-width: 120px;
    grid-area: price;
  }
}

.apart-item__image img {
  max-height: 100px;
  width: auto;
  object-fit: cover;
}

.apart-item__plan,
.apart-item__title,
.apart-item__size,
.apart-item__floor,
.apart-item__price {
  display: block;
}

@media (max-width: 1439px) and (min-width: 960px) {
  .apart-item {
    display: grid;
    grid-template-areas:
      'title . . image'
      'size floor price image';
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;

    &__image {
      min-width: auto;
      width: 80px;
    }

    &__title {
      min-width: auto;
      width: 344px;
    }

    &__size {
      min-width: auto;
      width: 43px;
    }

    &__floor {
      min-width: auto;
      width: 75px;
    }

    &__price {
      min-width: auto;
    }
  }
}

@media (max-width: 1439px) and (min-width: 960px) {
  .apart-item {
    display: grid;
    grid-template-areas:
      'title . image'
      'info  . image';
    grid-template-columns: auto 1fr auto;
    gap: 12px;

    &__image {
      width: 80px;
      grid-area: image;
    }

    &__title {
      grid-area: title;
    }

    &__info {
      grid-area: info;
      display: flex;
      gap: 20px;
      align-items: center;
    }
  }
}

</style>