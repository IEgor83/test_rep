<template>
  <div class="wrapper">
    <form @submit.prevent="login" class="form-signin">
      <h2 class="form-signin-heading">Авторизация</h2>
        <div class="input-blocks">
          <input type="text" class="form-control" v-model="email" placeholder="E-mail" required="" autofocus="" />
        </div>
        <div style="margin-bottom: 15px" class="input-blocks">
          <input type="password" class="form-control" v-model="password" placeholder="Пароль" required=""/>
        </div>
        <a class="password-reset-link" href="http://127.0.0.1:8000/api/v1/reset-password/">забыли пароль?</a>
      <button class="btn-submit" type="submit">Отправить</button>
    </form>
  </div>
  <div class="sign-with-google">
    <h2 class="register-with-google">Войти через google</h2>
    <a href="/">
      <img title="sign-google" class="sign-google" src="./images/sign-google.png" alt="sign-google">
    </a>
  </div>
</template>

<script>
export default {
  name: "AuthView",
  data () {
    return {
      email: '',
      password: '',
      incorrectAuth: false,
    }
  },
  methods: {
    login () {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.$router
            .push({ name: 'main' })
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
  .password-reset-link {
    display: block;
    margin: 0 auto 10px;
    text-align: center;
    text-decoration: none;
  }
</style>