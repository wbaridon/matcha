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
    width: 300px;
    right: 0;
  }
  #topNotifications {
    background-color: lightgrey;
    text-align: right;
    display: block;
  }
  .link {
    color: black;
    font-weight: bold;
    padding-bottom: 5px;
  }
  .notifications {
    list-style-type: none;
  }
  #all_notifications ul {
    padding: 2px;
  }
  #all_notifications {
      overflow: scroll;
      height: 250px;
      display: flex;
      flex-direction: column-reverse;
  }
</style>
