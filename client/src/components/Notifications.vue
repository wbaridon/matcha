<template>
  <div id="notifications">
    <!-- Sent messages output -->
    <div @click="close" id="topNotifications">X</div>
    <div id="all_notifications">
      <!-- Sent messages output -->
      <ul>
        <li class="notifications" v-for="element in notifications" :key="element.id">
          <router-link :to="'/profile/' + element.emitterProfile.id_account" class="link">
            {{element.emitterProfile.firstname}}
          </router-link> {{element.action}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  props: ['notifications'],
  methods: {
    close () {
      console.log(this.notifications)
      this.$emit('close')
    }
  }
}
</script>

<style>
  #notifications {
    position: absolute;
    background-color: white;
    color: black;
    border: solid 1px black;
    width: 250px;
    right: 0;
  }
  #topNotifications {
    background-color: lightgrey;
    text-align: right;
    display: block;
  }
  .link {
    color: black;
  }
  .notifications {
    list-style-type: none;
  }
  #all_notifications ul {
    padding: 2px;
  }
</style>
