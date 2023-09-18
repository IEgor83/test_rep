<script setup>
  import { YoutubeIframe } from '@vue-youtube/component'
</script>

<template>
  <div class="main-block">
    <h1>Тренировка</h1>
    <hr>
    <div v-for="exercise in training" :key="exercise.id">
      <h1 class="exercise-title">{{ exercise.name }}</h1>
      <div class="technique-block" v-if="exercise.video">
        <youtube-iframe :video-id="exercise.video" width="650" height="400"/>
      </div>
      <div class="technique-block description">
        <h3 class=" text-description">{{ exercise.technique }}</h3>
      </div>
      <div v-if="exercise.duration">
        <h2 class="text-description">Время выполнения: {{ get_minutes(exercise.duration) }} </h2>
      </div>
      <div v-else>
        <h2 class="text-description">Количество повторений: {{ exercise.quantity }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainingDetailView",
  data () {
    return {
      training: [{
        id: null,
        name: null,
        technique: null,
        video: null,
        duration: null,
        quantity: null,
      }]
    }
  },
  methods: {
    get_minutes(date) {
      if(Number(date)%60 === 0){
        return (Number(date)/60).toString() + ' мин.'
      }
      if(Math.floor(Number(date)/60) === 0){
        return Number(date).toString() + ' сек.'
      }
      return [(Math.floor(Number(date)/60)), Number(date)%60].join(' мин. ') + ' сек.'
    },
  },
  created() {
    this.$store.dispatch('getTrainingDetail', this.$route.params.id)
    .then(() =>{
      this.training = this.$store.state.training_detail
    })
    .catch((error) =>{
      console.log(error)
      this.$router
            .push({ name: 'auth' })
            .then(() => { this.$router.go() })
    })
  },
}
</script>

<style scoped>
  .main-block {
    width: 80%;
    margin: 40px auto 0;
  }
  .technique-block {
    display: inline-block;
  }
  .description {
    width: 40%;
    margin-left: 40px;
    vertical-align: top;
  }
  .text-description {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
  }
</style>