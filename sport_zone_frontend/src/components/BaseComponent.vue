<template>
  <header>
    <div class="container">
      <nav class="navigation">
        <div class="left">
          <ul class="nav_ul">
            <li class="crumb">
              <router-link :to="{name: 'main'}">
                <img title="logo" class="logo" src="./icons/sport_zone_logo.png" alt="logo">
              </router-link>
            </li>
            <li class="crumb"><router-link class="link" :to="{name: 'trainings'}">Тренировки</router-link></li>
            <li class="crumb"><router-link class="link" :to="{name: 'exercises'}">Упражнения</router-link></li>
            <li class="crumb"><a class="link" href="#">Сообщество</a></li>
            <li class="crumb"><a class="link" href="#">Питание</a></li>
          </ul>
        </div>
        <div class="right">
          <ul class="nav_ul">
            <li class="crumb"><a class="link" href="#">
              <img title="search" class="icon" src="./icons/search-icon.png" alt="search">
            </a></li>
            <template v-if="username !== null">
              <li class="crumb">
                <router-link class="link" :to="{name: 'profile'}">{{ username }}</router-link>
              </li>
              <li class="crumb">
                <router-link class="link" :to="{name: 'logout'}">Выйти</router-link>
              </li>
            </template>
            <template v-else>
              <li class="crumb dropdown">
                <a class="link" href="#">Войти ▼</a>
                <div class="dropdown-content">
                  <router-link class="a" :to="{name: 'register'}">Регистрация</router-link>
                  <router-link class="a" :to="{name: 'auth'}">Авторизация</router-link>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>

export default {
  name: "BaseComponent",
  props: ['username'],
  date() {
    return {

    }
  },
}
</script>

<style scoped>
  body {
    margin: 0;
  }
  .left, .right {

      display: inline-block;
      padding: 5px;
      border-spacing: 5px 0;
  }
  .crumb {
      display: inline-block;
      vertical-align: middle;
      padding: 5px; /* Отступы текста от границ */
  }
  .crumb:not(:first-child) {
      margin-left: 20px;
  }
  .container {
      padding-top: 0;
      padding-bottom: 0;
      background-color: darkslategray;
  }
  .navigation {
      position: relative;
      margin: 0 auto;
      width: 75%;
  }
  .logo{
      height: 44px;
      width: 156px;
      vertical-align: -webkit-baseline-middle;
  }
  .link {
      color: white;
      font-size: 20px;
      text-decoration: none;
      font-family: sans-serif;
  }
  .right {
      position: absolute;
      right: 0;
      top: 10px;
  }
  .nav_ul {
      margin: 0;
      padding: 5px;
  }
  .icon {
      height: 25px;
      width: 25px;
      margin-right: 20px;
  }

  .dropdown-content {
      left: 30px;
      margin-top: 23px;
      display: none;
      position: absolute;
      background-color: darkslategray;
      min-width: 160px;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      z-index: 1;
  }

  .dropdown-content .a {
      color: white;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      font-family: sans-serif;
  }

  .dropdown-content .a:hover {background-color: mediumaquamarine;}

  .dropdown:hover .dropdown-content {display: block;}
  .dropdown:after {
      content: '';
      position: absolute;
      /* Вытягиваем абсолютный псевдоэлемент на 10 пк за границы родителя — самого элемента */
      inset: 0 0 -5px 70px;
  }
</style>