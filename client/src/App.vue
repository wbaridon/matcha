<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Titre non gere</title>
    </head>
    <body>
        <app-header></app-header>
        <router-view/>
        <app-footer></app-footer>
    </body>
  </html>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
