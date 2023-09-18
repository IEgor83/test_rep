<template>
  <div class="logout">
  </div>
</template>

<script>
export default {
  name: "LogoutView",
  created() {
    this.$store.dispatch('userLogout')
        .then(() => {
          this.$router
            .push({ name: 'main' })
            .then(() => { this.$router.go() })
        })
  }
}
</script>

<style scoped>

</style>