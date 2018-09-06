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
import Login from '@/services/LoginService'
export default {
  data () {
    return {
      isAuth: false
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      Login.checkAuth(this.$cookie.get('authToken')).then(res => {
        this.isAuth = res.result
        // this.$cookie.delete('authToken')
        console.log(this.isAuth)
      })
    }
  }
}
</script>
