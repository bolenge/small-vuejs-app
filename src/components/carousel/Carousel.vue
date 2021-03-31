<template>
  <div>
    <div class="carousel">
        <carousel-slide
          v-for="n in slides"
          :key="n"
          :index="n - 1"
          class="mt-3"
        >
          <img
            :src="`https://loremflickr.com/640/360/${n}`"
            :alt="'Image ' + n"
            width="100%"
          />
        </carousel-slide>

        <button class="btn-carousel btn-carousel-prev" @click.prevent="prev">Précédent</button>
        <button class="btn-carousel btn-carousel-next" @click.prevent="next">Suivant</button>

        <div class="carousel-pagination">
          <button
            v-for="n in slidesCount"
            :class="{active: n-1 === index}"
            :key="n"
            @click="goto(n-1)"
          ></button>
        </div>
    </div>
    <button @click="addSlide">Add Slide +</button>
    <button @click="removeSlide">Remove Slide -</button>
  </div>
</template>

<script>
import CarouselSlide from '@/components/carousel/CarouselSlide'

export default {
  components: {CarouselSlide},
  data () {
    return {
      index: 0,
      slides: 5,
      direction: 'right'
    }
  },
  methods: {
    next () {
      this.direction = 'right'
      this.index++

      if (this.index >= this.slidesCount) {
        this.index = 0
      }
    },
    prev () {
      this.direction = 'left'
      this.index--

      if (this.index < 0) {
        this.index = this.slidesCount - 1
      }
    },
    goto (index) {
      this.direction = index > this.index ? 'right' : 'left'
      this.index = index
    },
    addSlide () {
      this.slides++
    },
    removeSlide () {
      this.slides--
    }
  },
  computed: {
    slidesCount () {
      return this.slides
    }
  },
  mounted () {
  },
  watch: {
    slides (slides) {
      if (this.index >= this.slidesCount) {
        this.index = this.slidesCount - 1
      }
    }
  }
}
</script>
<style>
  .mt-3 {
    margin-top: 20px;
  }
  .carousel {
    position: relative;
    width: 60%;
    overflow: hidden;
    margin: 0 auto;
  }

  .btn-carousel {
    position: absolute;
    top: 50%;
  }
  .btn-carousel.btn-carousel-next {
    right: 10px;
  }
  .btn-carousel.btn-carousel-prev {
    left: 10px;
  }
  .carousel-pagination {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    text-align: center;
  }
  .carousel-pagination button {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #000;
    opacity: 0.8;
    display: inline-block;
    margin: 0 2px;
    border: 0.5px solid #ddd;
  }
  .carousel-pagination button.active {
    background-color: #fdfdfd;
  }
</style>
