<template>
  <div class="slider">
    <h3 class="slider__title">
      {{ title }}
    </h3>

    <div class="slider__values-wrap">
      <span class="slider__values">
        от

        <span>{{ formattedLocal[0] }}</span>
      </span>

      <span class="slider__values">
        до

        <span>{{ formattedLocal[1] }}</span>
      </span>
    </div>

    <div class="slider__track">
      <input
        v-model.number="localModel[0]"
        class="slider__input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        @mouseup="fixOrder"
        @touchend="fixOrder"
      />

      <input
        v-model.number="localModel[1]"
        class="slider__input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        @mouseup="fixOrder"
        @touchend="fixOrder"
      />

      <div
        class="slider__range"
        :style="{
          left: ((localModel[0] - min) / (max - min)) * 100 + '%',
          width: ((localModel[1] - min) / (max - min)) * 100 - ((localModel[0] - min) / (max - min)) * 100 + '%',
          background: props.activeColor
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Props {
  title: string
  min?: number
  max?: number
  step?: number
  activeColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  activeColor: 'var(--main-green)'
})

const model = defineModel<[number, number]>({ required: true })

const localModel = ref<[number, number]>([...model.value])

const fixOrder = (): void => {
  if (localModel.value[0] > localModel.value[1]) {
    localModel.value = [localModel.value[1], localModel.value[0]]
  }

  model.value = [...localModel.value]
}

const fractionDigits = computed(() => {
  const s = String(props.step ?? 1)
  const parts = s.split('.')

  return parts[1]?.length ?? 0
})


const formatter = computed(() => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: fractionDigits.value,
  maximumFractionDigits: fractionDigits.value,
}))

const formattedLocal = computed<[string, string]>(() => {
  const a = formatter.value.format(Number(localModel.value[0] ?? 0))
  const b = formatter.value.format(Number(localModel.value[1] ?? 0))

  return [a, b]
})

watch(() => model.value, (val: [number, number]) => {
  localModel.value = [...val]
}, { deep: true })
</script>

<style scoped lang="scss">
.slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__title {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
  }

  &__values-wrap {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--main-black);
  }

  &__values {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--main-grey);

    span {
      color: var(--main-black);
    }
  }

  &__track {
    position: relative;
    width: 100%;
    height: 6px;
    background: var(--main-grey);
    border-radius: 3px;
  }

  &__range {
    position: absolute;
    height: 100%;
    border-radius: 3px;
  }

  &__input {
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    height: 20px;
    background: none;
    pointer-events: none;
    appearance: none;
    z-index: 100;
  }
}

.slider__input::-webkit-slider-thumb {
  pointer-events: all;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--main-green);
  cursor: pointer;
  border: none;
}

.slider__input::-moz-range-thumb {
  pointer-events: all;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--main-green);
  cursor: pointer;
  border: none;
}
</style>