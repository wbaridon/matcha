<template>
  <div id="userLikes">
    <h3>Ils vous ont liké</h3>
    <div v-for="user in likes" v-bind:key='user.id'>
      <router-link :to="'/profile/' + user.id">{{user.firstname}}</router-link>, {{user.age}} ans
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLikes',
  props: ['userId', 'likes'],
  data () {
    return {
    }
  }
}
</script>
