<template>
  <div class="wrapper">
    <form @submit.prevent="register" class="form-signin">
      <h2 class="form-signin-heading">Регистрация</h2>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="email" placeholder="E-mail" required="" autofocus="" />
        </div>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="username" placeholder="Имя пользователя" required="" autofocus="" />
        </div>
        <div class="input-blocks">
          <input type="password" class="form-control" v-model="password" placeholder="Пароль" required=""/>
        </div>
        <div class="input-blocks">
          <input type="password" class="form-control" v-model="password2" placeholder="Повторите пароль" required=""/>
        </div>
      <button class="btn-submit" type="submit">Отправить</button>
    </form>
  </div>
  <div class="sign-with-google">
    <h2 class="register-with-google">Регистрация через google</h2>
    <a href="/">
      <img title="sign-google" class="sign-google" src="./images/sign-google.png" alt="sign-google">
    </a>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data () {
    return {
      email: '',
      username: '',
      password: '',
      password2: '',
      incorrectAuth: false,
    }
  },
  methods: {
    register () {
      this.$store.dispatch('userRegister', {
        email: this.email,
        username: this.username,
        password: this.password,
        password2: this.password2,
      })
      .then(response => {
        console.log(response)
        this.$router
            .push({ name: 'profile_edit' })
            .then(() => { this.$router.go() })
      })
      .catch(err => {
        console.log(err)
        this.incorrectAuth = true
      })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    width: 40%;
    margin: 50px auto 0;
  }
  .form-signin {
    width: 300px;
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
  }
  .form-control {
    border: 1px solid #ccc;
    padding: 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
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
  .sign-with-google {
    margin: 40px auto 0;
  }
  .sign-google {
    height: 50px;
    width: 250px;
    display: block;
    margin: 0 auto;
  }
  .register-with-google {
    text-align: center;
    font-family: "Gill Sans", sans-serif;
    color: #333333;
  }
</style>