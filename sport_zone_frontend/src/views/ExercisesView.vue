<script setup>

</script>

<template>
  <div class="main-container">
    <div class="titles">
      <div class="exercise-title top-blocks">
        <h1 class="exercise-title">Упражнения</h1>
      </div>
      <div class="top-blocks">
        <div class="search-block">
          <h3 class="search-title">Поиск:</h3>
        </div>
        <div class="search-block">
          <form>
            <input v-model="search" type="search" placeholder="Search..." class="search-input">
            <button type="button" class="search-submit">Search</button>
          </form>
        </div>
      </div>
    </div>
    <hr>
    <div>
      <template v-for="exercise in exercises" :key="exercise.id">
        <div class="exercises-blocks" v-if="search_params(exercise.name)">
          <div style="text-align: center; margin-bottom: 15px">
            <router-link :to="'/exercise/' + exercise.id" style="font-size: 25px;" class="exercise-title">
              {{ truncate(exercise.name, 25) }}
            </router-link>
          </div>
          <img :src="'https://i.ytimg.com/vi/' + exercise.video + '/maxresdefault.jpg'" width="400" height="250" alt="img"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExercisesView",
  data () {
    return {
      exercises: null,
      search: '',
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
    search_params(name) {
      return !!(this.search === '' || name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  created() {
    this.$store.dispatch('getExercise')
    .then(() =>{
      this.exercises = this.$store.state.exercises
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
  }
  .top-blocks:not(:first-child) {
    margin-left: 100px;
  }
  .search-block {
    display: inline-block;
    margin-right: 20px;
  }
  .search-block:not(:first-child) {
    vertical-align: 5px;
  }
  .exercise-title {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
  }
  .search-title {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
  }
  form {
    color: #555;
    display: flex;
    padding: 2px;
    border: 1px solid currentColor;
    border-radius: 18px;
  }
  input[type="search"] {
    border: none;
    background: transparent;
    margin: 0;
    padding: 7px 8px;
    font-size: 14px;
    color: inherit;
    border-radius: inherit;
  }

  input[type="search"]::placeholder {
    color: #bbb;
  }
  .search-submit {
    text-indent: -999px;
    overflow: hidden;
    width: 40px;
    padding: 0;
    margin: 0;
    border: 1px solid transparent;
    border-radius: inherit;
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
    cursor: pointer;
    opacity: 0.7;
  }

  .search-submit:hover {
    opacity: 1;
  }
  .search-submit:focus,
  input[type="search"]:focus {
    box-shadow: 0 0 3px 0 #1183d6;
    border-color: #1183d6;
    outline: none;
  }
  .mid-line {
    margin-left: 0;
    width: 500px;
  }
  .exercises-blocks {
    display: inline-block;
    padding: 17px;
    width: 400px;
  }

</style>