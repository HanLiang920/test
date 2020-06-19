<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
  <div>{{a}}</div>
  <div>{{b}}</div>
</template>

<script>
  import { reactive, computed,ref, onMounted, onUnmounted  } from 'vue'

  function useMousePosition() {
    const x = ref(0)
    const y = ref(0)

    function update(e) {
      x.value = e.pageX
      y.value = e.pageY
    }

    onMounted(() => {
      window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', update)
    })

    return { x, y }
  }

  export default {
    setup() {
      const state = reactive({
        count: 0,
        double: computed(() => state.count * 2),
      })

      function increment() {
        state.count++
      }

      const { x:a, y:b } = useMousePosition()
      console.log(a)

      return {
        a, b,
        state,
        increment,
      }
    }
  }
</script>