<script setup>
  import { YoutubeIframe } from '@vue-youtube/component'
</script>

<template>
  <div class="main-block">
    <h1 class="exercise-title">{{ exercise.name }}</h1>
    <div v-if="exercise.video">
      <youtube-iframe :video-id="exercise.video" width="650" height="400"/>
    </div>
    <div>
      <h2 class="exercise-title">{{ exercise.technique }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExerciseDetailView",
  data () {
    return {
      exercise: {
        name: null,
        technique: null,
        video: null
      },
    }
  },
  methods: {

  },
  created() {
    this.$store.dispatch('getExercise')
    .then(() =>{
      const exercises = this.$store.state.exercises
      for (let ex in exercises){
        if (exercises[ex].id == this.$route.params.id){
          this.exercise = exercises[ex]
        }
      }
      if (this.exercise === null){
        this.$router
            .push({ name: 'exercises' })
            .then(() => { this.$router.go() })
      }
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
  .exercise-title {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
  }
</style>