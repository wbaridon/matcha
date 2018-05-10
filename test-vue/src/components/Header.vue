<template>
  <div id="app">
  <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h1 {
color: red;
}
</style>
