<template>
  <div class="profile">
    <div class="user-data-links parts">
      <div class="avatar">
        <img title="avatar-img" class="avatar-img" src="./images/none-avatar.png" alt="avatar-img">
        <p class="avatar-edit">Сменить аватарку</p>
      </div>
      <div class="user-links">
        <ul class="links_ul">
          <li class="links_li"><a href="#" class="links">Посмотреть дневник питания</a></li>
          <li class="links_li"><a href="#" class="links">Ваши фото/видео</a></li>
          <li class="links_li"><a href="#" class="links">Друзья</a></li>
          <li class="links_li"><a href="#" class="links">Упражнения</a></li>
          <li class="links_li"><a href="#" class="links">Программы</a></li>
        </ul>
      </div>
    </div>
    <div class="user-info parts">
      <div class="user-data-block">
        <h1 class="hello">Добро пожаловать, {{ username }}</h1>
        <div style="margin-bottom: 10px" class="user-info-data">
          <h2 class="data_h">Ваш e-mail: {{ email }}</h2>
        </div>
        <div class="user-info-data">
          <h2 class="data_h">Фамилия: </h2>
            <h2 class="data_h_val data_h">{{ last_name }}</h2>
        </div>
        <div class="user-info-data">
          <h2 class="data_h">Имя: </h2>
            <h2 class="data_h_val data_h">{{ first_name }}</h2>
        </div >
        <div class="user-info-data">
          <h2 class="data_h">Отчество: </h2>
            <h2 class="data_h_val data_h">{{ patronymic }}</h2>
        </div>
        <template v-if="is_coach">
          <div class="user-info-data">
            <h2 class="data_h">Опыт: </h2>
            <h2 class="data_h_val data_h">{{ experience }} лет</h2>
          </div>
          <div class="user-info-data">
            <h2 class="data_h">Информация о себе: </h2>
            <h2 class="data_h_val data_h">{{ info }}</h2>
          </div>
          <div class="user-info-data">
            <h2 class="data_h">Организация: </h2>
            <h2 class="data_h_val data_h">{{ organization }}</h2>
          </div>
        </template>
      </div>
      <h2 class="programs-title">Ваши программы:</h2>
    </div>
    <div class="user-characteristics parts">
      <div class="user-physic-info">
        <div class="target-block">
          <h2 class="params-names">Цель: </h2>
          <h2 v-if="target !== 0" style="color: darkslategrey; margin-top: 9px" class="data_h_right">{{ target }}</h2>
          <h2 v-else style="color: darkslategrey; margin-top: 9px" class="data_h_right">без цели</h2>
        </div>
        <div>
          <h2 class="params-names">Ваш вес: </h2>
          <h2 style="margin-left: 10px" class="data_h_right">{{ weight }}</h2>
        </div>
        <div style="margin-top: 20px">
          <h2 class="params-names">Ваш рост: </h2>
          <h2 style="margin-left: 10px" class="data_h_right">{{ height }}</h2>
        </div>
      </div>
      <a href="profile/edit" class="profile-edit">Редактировать данные профиля</a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "ProfileView",
  data() {
    return {
      username: this.$store.state.username,
      email: this.$store.state.email,
      first_name: this.$store.state.first_name,
      last_name: this.$store.state.last_name,
      patronymic: this.$store.state.patronymic,
      weight: this.$store.state.weight,
      height: this.$store.state.height,
      targets_names: ['Не выбрано', 'Похудение', 'Набор мышечной массы', 'Поддержка физической формы'],
      target: 0,
      experience: this.$store.state.experience,
      info: this.$store.state.info,
      organization: this.$store.state.organization,
      is_coach: this.$store.state.is_coach,
    }
  },
  methods: {
    get_target(index) {
      return this.targets_names[index]
    }
  },
  computed: {
    ...mapGetters([
        'ACCESS_TOKEN',
        'USERNAME',
        'EMAIL',
        'TARGET',
      ]),
  },
  created() {
    this.$store.dispatch('getUserData')
    .then(() =>{
      this.target = this.get_target(this.$store.state.target)
      this.first_name = this.$store.state.first_name
      this.last_name = this.$store.state.last_name
      this.patronymic = this.$store.state.patronymic
      this.weight = this.$store.state.weight
      this.height = this.$store.state.height
      this.experience = this.$store.state.experience
      this.info = this.$store.state.info
      this.organization = this.$store.state.organization
      this.is_coach = this.$store.state.is_coach
    })
    .catch((error) =>{
      console.log(error)
      this.$router
            .push({ name: 'auth' })
            .then(() => { this.$router.go() })
    })
  }
}
</script>

<style scoped>
  .profile {
    width: 80%;
    margin: 70px auto 0;
  }
  .parts {
    display: inline-block;
  }
  .user-data-links {
    width: 341px;
  }
  .avatar-img {
    height: 300px;
    width: 300px;
    border-radius: 10px;
    display: block;
    margin: auto;
  }
  .user-info {
    vertical-align: top;
    margin-left: 10px;
    width: 500px;
  }
  .user-characteristics {
    vertical-align: top;
    margin-left: 70px;
    width: 250px;
  }
  .user-characteristics h2 {
    font-family: "Verdana", sans-serif;
    color: black;
    font-weight: normal;
    margin: 0;
    font-size: 21px;
  }
  .user-characteristics input {
    display: inline-block;
    width: 50px;
    vertical-align: 2px;
    margin-left: 10px;
    border: 1px solid;
    border-radius: 3px;
    padding: 2px 2px 2px 5px;
  }
  .hello{
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
    margin: 0 0 20px;
  }
  .avatar-edit {
    text-align: center;
    text-decoration: underline;
    font-family: "Verdana", sans-serif;
    color: darkslategray;
  }
  .links_ul {
    list-style-type: none;
    margin: 0;
    padding: 5px 5px 5px 15px;
  }
  .links_li {
    vertical-align: middle;
    padding: 5px;
    margin-bottom: 10px;
  }
  .links {
    color: blue;
    font-family: "Verdana", sans-serif;
    font-size: 21px;
  }
  .data_h {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .data_h_right {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    font-weight: normal;
    margin-left: 10px;
    display: inline-block;
  }
  .user-info-data h2 {
    display: inline-block;
  }
  .user-info-data h3 {
    color: darkgrey;
    cursor: pointer;
    margin-top: 0;
  }
  .user-info-data input {
    vertical-align: 5px;
    margin-left: 10px;
    border: 2px solid darkslategray;
    padding: 5px;
    border-radius: 5px;
  }
  .data_h_val {
    margin-left: 10px;
  }
  .user-data-block {
    margin-left: 50px;
  }
  .params-names {
    display: inline-block;
  }
  .target-block {
    margin-bottom: 20px;
  }
  .programs-title {
    padding-left: 50px;
    color: darkblue;
    font-family: "Verdana", sans-serif;
    font-weight: 400;
    margin-top: 30px;
  }
  .user-physic-info {
    background-color: lavender;
    border-radius: 15px;
    padding: 20px;
  }
  .profile-edit {
    margin-top: 20px;
    text-align: center;
    display:block;
    text-decoration: underline;
    font-family: "Verdana", sans-serif;
    color: darkslategray;
  }
</style>