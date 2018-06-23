<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="/static/css/basic.css" type="text/css" />
      <link rel="stylesheet" media="all and (max-width: 600px)" href="/static/css/mobile.css" type="text/css" />
      <title>Titre non gere</title>
    </head>
    <body>
        <app-header></app-header>
        <div class='cover'>
            <h2>Soyez sûr de rencontrer <br>la bonne personne !</h2>
        </div>
        <div class="content">
          <router-view/>
        </div>
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
