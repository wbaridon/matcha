<template>
  <div class="profilePic">
    <div v-for="image in images.gallery" :key="image.id">
      <img v-if="image.isProfile" :src="'/static/images/uploads/'+image.filename" class="profilePic"/>
    </div>
    <img v-if="!images.count" src="/static/images/noPicture.jpg" alt="Pas de photos" class="profilePic"/>
  </div>
</template>

<script>
export default {
  name: 'UserProfilePic',
  props: ['images']
}
</script>
