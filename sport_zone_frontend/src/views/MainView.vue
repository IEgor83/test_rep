<template>
  <div class="main-container">
    <h1 class="welcome">Welcome to SportZone</h1>
    <div class="description">
      <div class="description-text">
        Приложение SportZone содержит бесплатные индивидуальные планы тренировок для всех желающих занимться спортом.
        Мы понимаем, что не у всех одинаковые цели в фитнесе, поэтому все наши программы тренировок разрабатываются
        специально для вас.
        Мы помогаем людям сбросить вес, повысить тонус, нарастить мышечную массу, улучшить сердечно-сосудистую систему,
        увеличить силу, связаться с другими через группы поддержки, узнать о физических упражнениях и питании... и т. д.
        Мы надеемся, что вы найдете наш сайт полезным и сможете добиться всех поставленных целей.
      </div>
    </div>
    <div class="start-images">
      <div class="img-position">
        <img title="img1" class="main-images" src="./images/main-image-1.png" alt="img1">
        <p class="signature">
          Ставь перед собой цели и достигай их
        </p>
      </div>
      <div class="img-position">
        <img title="img2" class="main-images" src="./images/main-image-2.png" alt="img2">
        <p class="signature">
          Комплекс упражнений для каждой области
        </p>
      </div>
      <div class="img-position">
        <img title="img3" class="main-images" src="./images/main-image-3.png" alt="img3">
        <p class="signature">
          Для людей любого уровня подготовки
        </p>
      </div>
    </div>
    <hr>
    <div class="info">
      <div class="block-info">
        <img title="img-info" class="img-info" src="./images/main-image-info.png" alt="img-info">
      </div>
      <div class="block-info block-right">
        <h1 class="titles">Отслеживание прогресса</h1>
        <p class="titles-description">
          Загружайте фото и видео наблюдать за своими изменениями
        </p>
        <h1 class="titles">Советы тренеров</h1>
        <p class="titles-description">
          Задавайте вопросы по технике и питанию профессионалам и смотрите обучающие видео и советы
          для достижения лучших результатов
        </p>
      </div>
    </div>
  </div>
  <div class="bottom-line">
    <div class="bottom-blocks"><a class="bottom-links" href="#">Разделы</a></div>
    <div class="bottom-blocks"><a class="bottom-links" href="#">Информация</a></div>
  </div>
</template>

<script>
export default {
  name: "MainView",
  data () {
    return {

    }
  },
}
</script>

<style scoped>
  .main-container {
    margin: 50px auto 0;
    width: 75%;
  }
  .welcome {
    color: darkslategray;
    text-align: center;
    font-weight: normal;
    font-family: "Gill Sans", sans-serif;
  }
  .description {
    width: 75%;
    margin: 40px auto 0;
  }
  .description-text {
    line-height: 1.5;
    text-align: center;
    padding: 30px 50px;
    background-color: gainsboro;
    font-family: "Verdana", sans-serif;
    font-size: 18px;
    color: revert;
  }
  .start-images {
    margin: 60px auto 30px;
  }
  .main-images {
    height: 250px;
    width: 250px;
    border-radius: 10px;
  }
  .img-position {
    margin-left: 83px;
    display: inline-block;
    width: 260px;
  }
  .signature {
    text-align: center;
    font-family: "Verdana", sans-serif;
    color: darkslategray;
  }
  hr {
    margin: 20px 0;
    padding: 0;
    height: 10px;
    border: none;
    border-top: 2px solid #333;
    box-shadow: 0 10px 10px -10px #8c8b8b inset;
  }
  .info {
    margin-top: 50px;
    padding: 35px 45px;
    background-color: lightslategrey;
    border-radius: 5px;
  }
  .block-info {
    display: inline-block;
    width: 490px;
    height: 490px;
  }
  .block-right {
    float: right;
    background-color: lightgray;
    border-radius: 10px;
    margin-left: 20px;
    padding-left: 25px;
    width: 445px;
  }
  .img-info {
    height: 479px;
    width: 479px;
    border: 2px solid orangered;
    border-radius: 8px;
  }
  .titles {
    font-family: "Verdana", sans-serif;
    color: midnightblue;
    width: 300px;
    font-weight: normal;
  }
  .titles-description {
    font-family: "Verdana", sans-serif;
    color: darkslategray;
    line-height: 1.5;
  }
  .bottom-line {
    margin-top: 60px;
    height: 70px;
    background-color: darkslategray;
  }
  .bottom-blocks {
    display: inline-block;
    margin-left: 50px;
    margin-top: 25px;
  }
  .bottom-links {
    color: white;
    font-size: 20px;
    text-decoration: none;
    font-family: sans-serif;
  }
</style>