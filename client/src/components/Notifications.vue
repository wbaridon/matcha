<template>
  <div id="notifications">
    <!-- Sent messages output -->
    <div @click="close" id="topNotifications">X</div>
    <div id="all_notifications">
      <!-- Sent messages output -->
      <ul>
        <li class="notifications" v-for="element in notifications" :key="element.id">
          {{element.id}} - {{element.action}}
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
    width: 250px;
    right: 0;
  }
  #topNotifications {
    background-color: lightgrey;
    text-align: right;
    display: block;
  }
</style>
