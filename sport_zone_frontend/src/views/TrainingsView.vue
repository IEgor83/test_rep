<template>
  <div class="main-container">
    <div class="titles">
      <div class="exercise-title top-blocks">
        <h1 class="exercise-title">Тренировки</h1>
      </div>
    </div>
    <hr style="margin-bottom: 50px">
    <div style="padding-left: 50px">
      <template v-for="(training, num) in trainings" :key="training.id">
        <div class="exercises-blocks">
          <div style="text-align: center; margin-bottom: 15px">
            <router-link :to="'/training/' + training.id" style="font-size: 25px;" class="exercise-title">
              {{ truncate(training.name, 25) }}
            </router-link>
          </div>
          <img :src="require(`./images/training${num+1}.png`)" width="350" height="250" alt="img"/>
          <h3 class="training-titles">Уровень: {{ training.level }}</h3>
          <h3 class="training-titles">Количество упражнений: {{ training.amount_of_exercise }}</h3>
          <h3 class="training-titles">Примерное время: {{ get_minutes(training.duration) }} мин.</h3>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainingsView",
  data () {
    return {
      trainings: [{
        name: '',
        id: '',
        level: '',
        amount_of_exercise: '',
        duration: ''
      }],
    }
  },
  methods: {
    truncate(data, num) {
      const str = data.slice(0, num)
      if(str.length < data.length){
        return data.slice(0, num) + '...'
      }
      return data
    },
    get_minutes(date) {
      return (Number(date) / 60)
    },
  },
  created() {
    this.$store.dispatch('getTrainings')
    .then(() =>{
      this.trainings = this.$store.state.trainings
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
  .main-container {
    width: 90%;
    margin: 50px auto 0;
  }
  .top-blocks {
    display: inline-block;
    margin-left: 43%;
  }
  .exercise-title {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
  }

  .exercises-blocks {
    display: inline-block;
    padding: 17px;
    width: 350px;
    border: 2px solid darkslategray;
    margin-right: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px 2px gray;
  }
  .training-titles {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
  }

</style>