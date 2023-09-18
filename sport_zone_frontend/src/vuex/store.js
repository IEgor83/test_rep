import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


const store = createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    username: null,
    email: '-',
    first_name: '',
    last_name: '',
    patronymic: '',
    weight: '',
    height: '',
    target: 0,
    is_coach: false,
    experience: '',
    info: '',
    organization: '',
    exercises: null,
    trainings: null,
    training_detail: null,
  },
  mutations: {
    updateStorage (state, {access, refresh}) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    updateUserData (state, {fn, ln, p, w, h, t, e, i, o, ch}){
      state.first_name = fn
      state.last_name = ln
      state.patronymic = p
      state.weight = w
      state.height = h
      state.target = t
      state.experience = e
      state.info = i
      state.organization = o
      state.is_coach = ch
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
      state.username = null
      state.email = '-'
      state.first_nam = ''
      state.last_name = ''
      state.patronymic = ''
      state.weight = ''
      state.height = ''
      state.target = 0
      state.is_coach = false
      state.experience = ''
      state.info = ''
      state.organization = ''
    },
    setNewAccessToken (state, {access}) {
      state.accessToken = access
    },
    updateUsername (state, username) {
      state.username = username
    },
    updateEmail (state, email) {
      state.email = email
    },
    loadExercises (state, exercises) {
      state.exercises = exercises
    },
    loadTrainings (state, trainings) {
      state.trainings = trainings
    },
    loadTrainingDetail (state, training_detail) {
      state.training_detail = training_detail
    },
  },
  actions: {
    resetPassword (context, userEmail){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/v1/reset-password/', {
        email: userEmail.email,
      })
        .then(response => {
          console.log(response)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
      })
    },


    userLogin (context, userCredentials){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/v1/token/', {
        email: userCredentials.email,
        password: userCredentials.password
      })
        .then(response => {
          context.commit('updateStorage', {
            access: response.data.access,
            refresh: response.data.refresh,
          })
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },


    userRegister (context, userCredentials){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/v1/register/', {
        email: userCredentials.email,
        name: userCredentials.username,
        password: userCredentials.password,
        password2: userCredentials.password2,
      })
        .then(() => {
          context.dispatch('userLogin', {
            email: userCredentials.email,
            password: userCredentials.password,
          })
            .then(() => {
              resolve()
            })
            .catch(error =>{
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
      })
    },


    userLogout(context) {
      if(context.getters.LOGGED_IN) {
        context.commit('destroyToken')
      }
    },

    getUserData(context) {
      if (context.state.accessToken !== null) {
        return new Promise((resolve, reject) => {
          axios.get("http://127.0.0.1:8000/api/v1/user/data", {
            headers: {
              Authorization: `Bearer ${context.state.accessToken}`
            }
          })
          .then(response => {
            const user_info = response.data.user_info
            const user_physical = response.data.user_physical
            const coach_data = response.data.coach_data
            let fn, ln, p, w, h, t, e, i, o
            let check_coach = false
            if(user_info !== null) {
              fn = (user_info.first_name !== null) ? user_info.first_name : ''
              ln = (user_info.last_name !== null) ? user_info.last_name : ''
              p = (user_info.middle_name !== null) ? user_info.middle_name : ''
            }
            else {
              fn = ln = p = ''
            }
            if(user_physical !== null) {
              w = (user_physical.weight !== null) ? user_physical.weight : ''
              h = (user_physical.height !== null) ? user_physical.height : ''
              t = (user_physical.target !== null) ? user_physical.target : 0
            }
            else {
              w = h = t = ''
            }
            if(coach_data !== null) {
              e = (coach_data.experience !== null) ? coach_data.experience : ''
              i = (coach_data.info !== null) ? coach_data.info : ''
              o = (coach_data.organization !== null) ? coach_data.organization : 0
              check_coach = true
            }
            else {
              e = i = o = ''
            }
            context.commit('updateUserData', {fn: fn, ln: ln, p: p, w: w, h: h, t: t, e: e, i: i, o: o, ch: check_coach})
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
      }
    },


    getExercise(context) {
      if (context.state.accessToken !== null) {
        return new Promise((resolve, reject) => {
          axios.get("http://127.0.0.1:8000/api/v1/exercises/", {
            headers: {
              Authorization: `Bearer ${context.state.accessToken}`
            }
          })
            .then(response => {
              context.commit('loadExercises', response.data)
              resolve()
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },


    getTrainings(context) {
      if (context.state.accessToken !== null) {
        return new Promise((resolve, reject) => {
          axios.get("http://127.0.0.1:8000/api/v1/trainings/", {
            headers: {
              Authorization: `Bearer ${context.state.accessToken}`
            }
          })
            .then(response => {
              console.log(response.data)
              context.commit('loadTrainings', response.data)
              resolve()
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },


    getTrainingDetail(context, training_id) {
      if (context.state.accessToken !== null) {
        return new Promise((resolve, reject) => {
          axios.get(`http://127.0.0.1:8000/api/v1/training/${training_id}/`, {
            headers: {
              Authorization: `Bearer ${context.state.accessToken}`
            }
          })
            .then(response => {
              console.log(response.data)
              context.commit('loadTrainingDetail', response.data)
              resolve()
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },


  },
  getters: {
    ACCESS_TOKEN(state) {
      return state.accessToken
    },
    REFRESH_TOKEN(state) {
      return state.refreshToken
    },
    LOGGED_IN(state) {
      return state.accessToken !== null
    },
    USERNAME(state) {
      return state.username
    },
    EMAIL(state) {
      return state.email
    },
    TARGET(state) {
      return state.target
    },
    FIRST_NAME(state) {
      return state.first_name
    },
    LAST_NAME(state) {
      return state.last_name
    },
    PATRONYMIC(state) {
      return state.patronymic
    },
    WEIGHT(state) {
      return state.weight
    },
    HEIGHT(state) {
      return state.height
    },
    EXPERIENCE(state) {
      return state.experience
    },
    INFO(state) {
      return state.info
    },
    ORGANIZATION(state) {
      return state.organization
    },
    IS_COACH(state) {
      return state.is_coach
    },
  },
  modules: {

  },
  plugins: [createPersistedState()],
})

export default store
