<template>
  <div class="home">
    <div class='cover'>
        <h2>Soyez sûr de rencontrer <br>la bonne personne !</h2>
    </div>
    <div class="content">
    <h1>Home</h1>
    Contenu a mettre
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  }
}
</script>

<style>
  h2 {
    margin: 0;
  }
  .content {
    padding: 5%;
    margin : 2% 5% 2% 5%;
    border: 1px solid lightgrey;
  }
  .cover {
    width: 100%;
    height: 350px;
    background-color: lightgrey;
    border-bottom: solid 1px grey;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2.5em;
  }
  .cover:hover {
    background-color: black;
    opacity: 0.4;
  }

</style>
