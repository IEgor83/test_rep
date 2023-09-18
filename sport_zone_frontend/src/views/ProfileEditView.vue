<template>
  <div class="wrapper">
    <h1 class="form-title">Данные пользователя</h1>
    <form @submit.prevent="save" class="form-signin">
      <h2 class="form-signin-heading">Пожалуйста заполните поля:</h2>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="username" placeholder="Логин *" />
        </div>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="first_name" placeholder="Введите имя *" />
        </div>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="last_name" placeholder="Введите фамилию *" />
        </div>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="patronymic" placeholder="Введите отчество *" />
        </div>
        <template v-if="!is_coach">
          <div class="input-blocks one-line">
            <select v-model="target" class="target-select">
              <option value="0" disabled selected>Выберите свою цель *</option>
              <option value="1">Похудение</option>
              <option value="2">Набор мышечной массы</option>
              <option value="3">Поддержка физической формы</option>
            </select>
          </div>
          <div class="input-blocks one-line weight-block">
            <input type="number" step="0.1" class="form-control-weight" v-model="weight" placeholder="Вес"/>
            <label class="inp-label">Кг</label>
          </div>
          <div class="input-blocks one-line height-block">
            <input type="number" class="form-control-weight"  v-model="height" placeholder="Рост" />
            <label class="inp-label">См</label>
          </div>
        </template>
        <div class="check-coach">
          <input type="checkbox" class="check-is-coach" v-model="is_coach" />
          <label class="coach-title">Я являюсь тренером</label>
        </div>
        <template v-if="is_coach">
          <div class="input-blocks">
            <input type="number" class="form-control experience-count" v-model="experience" placeholder="Опыт работы *" />
            <label class="coach-title">Лет</label>
          </div>
          <div class="input-blocks">
            <textarea v-model="info" cols="63" rows="5" class="coach-info">Напишите информацию о себе *</textarea>
          </div>
          <div class="input-blocks">
            <input type="text" class="form-control" v-model="organization" placeholder="Организация" />
          </div>
        </template>
      <button class="btn-submit" type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store";
import {mapGetters} from "vuex";

export default {
  name: "ProfileEditView",
  data() {
    return {
      username: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      weight: '',
      height: '',
      target: '',
      is_coach: false,
      experience: '',
      info: '',
      organization: '',
    }
  },
  computed: {
    ...mapGetters([
        'ACCESS_TOKEN',
        'REFRESH_TOKEN',
        'USERNAME',
        'FIRST_NAME',
        'LAST_NAME',
        'PATRONYMIC',
        'WEIGHT',
        'HEIGHT',
        'TARGET',
        'EXPERIENCE',
        'INFO',
        'ORGANIZATION',
        'IS_COACH',
      ]),
  },
  beforeCreate() {
    this.username = this.$store.state.username
  },
  methods: {
    save() {
      axios.interceptors.request.use(
        (config) => {
          const accessToken = this.ACCESS_TOKEN;
          if (accessToken) {
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
          if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const response = await axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
                refresh: store.state.refreshToken,
              });
              const newAccessToken = response.data.access;
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

      let role = 'user'
      if(this.is_coach){
        role = 'coach'
      }

      if(this.is_coach){
        this.weight = null
        this.height = null
        this.target = null
      }
      else{
        this.experience = null
        this.info = null
        this.organization = null
      }

      axios.post('http://127.0.0.1:8000/api/v1/user/data', {
        user_info: {
          first_name: this.first_name,
          last_name: this.last_name,
          middle_name: this.patronymic,
          role: role,
        },
        user_physical: {
          weight: this.weight,
          height: this.height,
          target: this.target,
        },
        is_coach: {
          detail: this.is_coach,
        },
        coach_data: {
          experience: this.experience,
          info: this.info,
          organization: this.organization,
        }
      })
        .then(response => {
          console.log(response.data)
          this.$router
            .push({ name: 'profile' })
            .then(() => { this.$router.go() })
        })
        .catch(error => {
          console.log((error))
          this.$router
            .push({ name: 'auth' })
            .then(() => { this.$router.go() })
        })
    }
  },
  created() {
    this.$store.dispatch('getUserData')
    .then(() => {
      this.username = this.USERNAME
      this.first_name = this.FIRST_NAME
      this.last_name = this.LAST_NAME
      this.patronymic = this.PATRONYMIC
      this.weight = this.WEIGHT
      this.height = this.HEIGHT
      this.target = this.TARGET
      this.is_coach = this.IS_COACH
      this.experience = this.EXPERIENCE
      this.info = this.INFO
      this.organization = this.ORGANIZATION
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .wrapper {
    margin: 50px auto;
    width: 40%;
  }
  .form-signin {
    background: #fff;
    padding: 15px 40px 40px;
    border: 1px solid #ccc;
    margin: 50px auto 0;
    border-radius: 5px;
    box-shadow: 0 0 20px 2px gray;
  }
  .form-signin-heading {
    font-family: "Gill Sans", sans-serif;
    text-align: center;
    color: #333333;
    margin-bottom: 40px;
  }
  .form-control {
    border: 1px solid #ccc;
    padding: 10px;
    width: 95%;
    border-radius: 2px;
  }
  .input-blocks {
    margin-bottom: 30px;
  }
  .btn-submit {
    font-size: 110%;
    font-weight: 100;
    background: darkslategray;
    border-color: cornflowerblue;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
    padding: 10px 16px;
    line-height: 1.33;
    border-radius: 6px;
    width: 100%;
  }
  .btn-submit:hover {
    background: gray;
  }
  .form-title {
    text-align: center;
    font-family: "Verdana", sans-serif;
    color: darkslategray;
  }
  .target-select {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 2px;
    appearance: none;
    background-image: url(data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e);
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 1em;
  }
  .one-line {
    display: inline-block;
  }
  .form-control-weight {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 2px;
    width: 50px;
    margin-left: 10px;
  }
  .weight-block, .height-block {
    margin-left: 20px;
  }
  .inp-label {
    margin-left: 10px;
    font-family: "Gill Sans", sans-serif;
    color: darkslategray;
  }
  .check-coach {
    width: 43%;
    margin: 0 auto 15px;
  }
  .check-is-coach {
    width: 15px;
  }
  .coach-title {
    vertical-align: 1px;
    margin-left: 10px;
    font-family: "Gill Sans", sans-serif;
    color: darkslategray;
  }
  .coach-info {
    resize: none;
    padding: 10px;
  }
  .experience-count {
    width: 20%;
  }
</style>