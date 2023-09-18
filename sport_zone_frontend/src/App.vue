<script setup>

</script>

<template>
  <BaseComponent :username="username"/>
  <router-view></router-view>
</template>

<script>
import BaseComponent from './components/BaseComponent.vue'
import {mapGetters, mapMutations} from 'vuex'
import axios from "axios";
import store from "@/vuex/store";

export default {
  name: 'App',
  components: {
    BaseComponent
  },
  data () {
    return {
      username: null
    }
  },
  methods: {
    ...mapMutations([
        'updateUsername',
        'updateEmail',
    ])
  },
  computed: {
    ...mapGetters([
        'ACCESS_TOKEN',
        'REFRESH_TOKEN',
      ]),
  },
  created() {
    console.log(this.ACCESS_TOKEN)
    console.log(this.REFRESH_TOKEN)
    axios.interceptors.request.use(
      (config) => {
        const accessToken = this.ACCESS_TOKEN;
        if (accessToken !== null) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
        },
      (err) => {
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      async function(error) {
        const originalRequest = error.config;
        if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry
            && store.state.refreshToken !== null) {
          originalRequest._retry = true;
          try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
              refresh: store.state.refreshToken,
            });
            const newAccessToken = response.data.access;
            console.log(response.data)
            store.commit('setNewAccessToken', {access: newAccessToken});
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (error) {
            console.error(error);
            await store.dispatch('userLogout');
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    if (this.ACCESS_TOKEN !== null && this.username === null) {
      axios.get("http://127.0.0.1:8000/api/v1/get/username/")
      .then(response => {
        this.username = response.data.username
        this.updateUsername(this.username)
        this.updateEmail(response.data.email)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
 body {
   margin: 0;
 }
</style>
