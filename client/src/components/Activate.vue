<template>
  <div class="home">
    <h1>Activation de votre compte</h1>
    {{status}}
  </div>
</template>

<script>
import Register from '@/services/RegisterService'
export default {
  name: 'activate',
  data () {
    return {
      token: '',
      status: ''
    }
  },
  methods: {
    activate () {
      Register.activate(this.token).then(res => {
        this.status = res
      })
    }
  },
  mounted () {
    this.token = this.$router.currentRoute.query
    this.activate()
  }
}
</script>

<style>
</style>
