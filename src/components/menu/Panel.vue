<template>
  <div>
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="" sliding></f7-navbar>
        <f7-pages>
          <f7-page class="panel__back-ground">
            <div class="panel__user-block flex">
              <div style="width: 100%">
                <span class="panel__greeting">hello,</span>
                <div class="panel__user-block-wrap flex" @click="logout">
                  <div class="panel__user-block__name-wrap">
                    <span class="panel__user-block__name">{{email}}</span>
                  </div>
                  <i class="f7-icons panel__icon">logout</i>
                </div>
                <!-- logout Finalization -->
                <div
                  :class="{'panel__logout-wrapper': true,
                  'panel__logout-wrapper__opened':isLoggingOut,
                  'flex': true }"
                >
                  <div class="panel__logout__back flex" @click="cancelLogout">
                    <i class="f7-icons">close</i>
                  </div>
                  <div class="flex panel__logout__final" @click="logout">
                    <i class="f7-icons panel__logout-icon">logout</i>
                    <p class="panel__logout">Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>
  </div>
</template>

<script>
export default {
  props:{email:String},
  methods:{
    cancelLogout(){
      this.isLoggingOut = false;
    },
    logout:function() {
      console.log('log');
      if(this.isLoggingOut){
        //logout
        let self = this;
        this.$emit('logout')

        setTimeout(function(){
          window.f7.closePanel();
          self.isLoggingOut = false;
        }, 200)
      }else{
        this.isLoggingOut = true;
      }
    },
  },
  data(){
    return{
      isLoggingOut: false
    }
  }
}
</script>
