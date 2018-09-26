<template>
  <div id="userVisits">
    <h3>Ils vous ont visité</h3>
      <div v-for="user in visits" v-bind:key='user.id'>
        <router-link :to="'/profile/' + user.id">{{user.firstname}}</router-link>, {{user.age}} ans
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserVisits',
  props: ['userId', 'visits'],
  data () {
    return {
    }
  }
}
</script>
