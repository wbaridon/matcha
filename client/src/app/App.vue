<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="/static/css/basic.css" type="text/css" />
      <link rel="stylesheet" media="all and (max-width: 775px)" href="/static/css/mobile.css" type="text/css" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
      <title>Matcha</title>
    </head>
    <body>
        <div id="page">
          <app-header></app-header>
          <div class='cover'>
              <h2>Soyez sûr de rencontrer <br>la bonne personne !</h2>
          </div>
          <div class="content">
              <router-view></router-view>
          </div>
          <app-footer></app-footer>
      </div>
    </body>
  </html>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Login from '@/services/LoginService'
// import io from 'socket.io-client'
export default {
  data () {
    return {
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  mounted () {
    this.checkAuth()
  },
  computed: {
  },
  methods: {
    checkAuth () {
      Login.checkAuth(this.$cookie.get('authToken')).then(res => {
        if (res.result === true) {
          this.$store.commit('logIn')
        }
      })
    }
  }
}
</script>
