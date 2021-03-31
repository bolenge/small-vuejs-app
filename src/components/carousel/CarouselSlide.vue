<template>
  <div>
    <transition :name="transition">
      <div v-if="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'carousel-slide',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    visible () {
      return this.index === this.$parent.index
    },
    transition () { return this.$parent.direction ? 'slide-' + this.$parent.direction : '' }
  },
  mounted () {
  }
}
</script>
<style>
  .slide-right-enter-active {
    animation: slideRightIn .5s;
  }

  @keyframes slideRightIn {
    from {transform: translateX(100%);}
    to {transform: translateX(0%);}
  }

  .slide-right-leave-active {
    animation: slideRightOut .5s;
    position: absolute;
    left: 0;
  }

  @keyframes slideRightOut {
    from {transform: translateX(0%);}
    to {transform: translateX(-100%);}
  }

  .slide-left-enter-active {
    animation: slideLeftIn .5s;
  }

  @keyframes slideLeftIn {
    from {transform: translateX(-100%);}
    to {transform: translateX(0%);}
  }

  .slide-left-leave-active {
    animation: slideLeftOut .5s;
    position: absolute;
    top: 0;
    left: 0;
  }

  @keyframes slideLeftOut {
    from {transform: translateX(0%);}
    to {transform: translateX(100%);}
  }
</style>
