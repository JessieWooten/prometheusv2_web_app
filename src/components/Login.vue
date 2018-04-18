<template lang="html">
  <div :class="{'flex':true,'login__page':!isOpened,'login__page-opened': isOpened}">
    <div style="margin-bottom: 20px; margin-left: 15vw; margin-right: 15vw;">
      <div class="flex">
        <h2 class="login__title">PROMETHEUS | Newscart</h2>
      </div>
      <div class="login__wrapper">
        <div class="flex login__input-wrapper">
          <i class="f7-icons login__input-clear">email</i>
          <input class="login__input" type="email" name="" placeholder="email" v-model="user" v-on:keydown.enter="handleLogin">
          <i class="f7-icons login__input-clear" :class="{'login__input-clear__hide':user.length === 0}" @click="clearInput('email')">close</i>
        </div>
        <div class="flex login__input-wrapper">
          <i class="f7-icons login__input-clear">lock</i>
          <input class="login__input" type="password" name="" placeholder="*******" v-model="password" v-on:keydown.enter="handleLogin">
          <i class="f7-icons login__input-clear" :class="{'login__input-clear__hide':password.length === 0}" @click="clearInput('password')">close</i>
        </div>
        <f7-button @click="handleLogin"
          :class="{'login__button':true, 'flex':true,'login__button-disabled': !inputsFilled }" fill
        >Login</f7-button>
        <span class="login__error" v-show="error != ''">{{error}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import fb from '../firebase'
export default {
  props:{
    isOpened: Boolean
  },
  computed:{
    inputsFilled(){
      return this.user.length != 0 && this.password.length > 3;
    }
  },
  methods:{
    clearInput(input){
      if(input === 'email'){
        this.user = '';
      }else{
        this.password = '';
      }
    },
    handleLogin(event) {
      this.error = '';
      let self = this;
          if(this.inputsFilled){
            event.preventDefault();
            fb.auth().signInWithEmailAndPassword(this.user, this.password)
            .then(user => {
              console.log('user: ', user);
              if(user !== null) {
                let obj = {user: user, email: self.user}
                self.$emit('receiveUser', obj)
              }
            })
            .catch(err => {
              self.error = err.message
            })
          }
          this.password = '';
        }
  },
  data(){
    return{
      user:window.localStorage.getItem('email') ? window.localStorage.getItem('email') : '',
      password:'',
      error:''
    }
  }
}
</script>
