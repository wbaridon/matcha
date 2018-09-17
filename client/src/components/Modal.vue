<template>
  <transition name="modal-fade">
    <div class="modalBackground">
      <div class="modal" role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription">
          <slot name="title"></slot>
          <slot name="content"></slot>
          <slot name="close">
            <button type="button" class="btn" @click="close">OK</button>
          </slot>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>

.modalBackground {
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  width: 100%;
  height: 100vh;
  color: black;
}
 .modal {
   background: #FFFFFF;
   margin: 15% auto;
   box-shadow: 2px 2px 20px 1px;
   display: flex;
   flex-direction: column;
   width: 90%;
   padding: 15px;
   justify-content: center;
   text-align: center;
 }

 .btn {
   margin: 15px;
   padding: 8px;
   color: black;;
   background: white;
   border: 1px solid black;
   border-radius: 2px;
 }
 .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
