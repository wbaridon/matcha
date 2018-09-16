<template>
  <div class="profileInterest">
    <h3>Vos passions</h3>
    <div id='interests'>
      <div v-for="(data, index) in interests" v-bind:key="index">
        <div v-if="data===1 && index!='id_account' && index!='id'" class='sticker'>#{{index}} &times;</div>
      </div>
      <div>
        <form class="" method="post">
          <input type="text" name="interest" value="">
          <input type="submit" name="submit" value="Ajouter">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInterests',
  props: ['userId', 'interests']
}
</script>
