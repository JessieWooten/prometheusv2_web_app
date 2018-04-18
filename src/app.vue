<template>
  <!-- App -->
  <div id="app">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>
    <!-- Left Panel -->
    <Panel :email="email" @logout="logout"></Panel>
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" :class="{'main-view': true, 'main-view-transition': !isDragging, 'new-article': isLoadingNewArticle}" navbar-through :dynamic-navbar="true" main>
        <Login :isOpened="!isLoggedIn" @receiveUser="receiveUser"/>
        <!-- Navbar -->
        <Navigation :uploaderOpened="uploaderOpened" @toggleUploader="toggle('uploaderOpened')"></Navigation>
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <!-- <v-touch v-on:panstart="dragStart" v-on:panmove="dragging" v-on:panend="dragEnd"> -->
            <!-- Page Content -->
            <Article style="position: relative;"
            :article="currentArticle"
            @revertEdits="revertEdits"
            @launchEditor="openEditor"
            :isEdited="isEdited"
            @toggleRecommend="toggleRecommend"
            ></Article>
              <Description :article="currentArticle"></Description>
            <!-- </v-touch> -->
            <div class="select-wrapper">
              <Keywords :keywords="keywords"></Keywords>
              <Companies :companies="companies"></Companies>
            </div>
            <Editor
             :isEditorOpened="isEditorOpened"
             :article="editArticle"
             @updateArticle="updateArticle"
             @closeEditor="toggle('isEditorOpened')"
            ></Editor>
          </f7-page>
        </f7-pages>
        <Uploader :isOpened="uploaderOpened" :articleExists="Boolean(currentArticle.title)" @manualUpload="manualUpload" @closeUploader="toggle('uploaderOpened')"></Uploader>
      </f7-view>
    </f7-views>
    <!-- <Accept :isAccepted="isAccepted"></Accept> -->
    <f7-button fill @click="submitArticle"
      :class="{'confirm__button':true, 'flex':true,'confirm__button-disabled':!selectedCompanies.length != 0 || !isFullyFilled}"
      v-if="!uploaderOpened"
    >
      Send to Oracle
      <i class="f7-icons">arrow_right</i>
    </f7-button>
    <f7-button fill @click="declineArticle"
      :class="{'decline__button':true, 'flex':true}"
      v-if="!uploaderOpened"
    >
      <i class="f7-icons">close</i>
      Start Over
    </f7-button>
    <div class="editor__dark-bg" v-show="isEditorOpened" @click="toggle('isEditorOpened')"></div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Navigation from './components/Navigation.vue'
import Article from './components/Article.vue'
import Description from './components/Description.vue'
import Keywords from './components/Keywords.vue'
import Companies from './components/Companies.vue'
import Editor from './components/editor/Editor.vue'
import Panel from './components/menu/Panel.vue'
import Accept from './components/confirmation/Accept.vue'
import Uploader from './components/manualUpload/Uploader.vue'
import dataUpdate from './event-bus.js'
import fb from './firebase'
// import VueTouch from 'vue-touch'
export default {
  created(){
    dataUpdate.$on('selectedCompanies', ($event) => {
      this.selectedCompanies = $event;
    }),
    dataUpdate.$on('selectedKeywords', ($event) => {
      this.selectedKeywords = $event;
    })
  },
  components:{
    Login,
    Navigation,
    Article,
    Description,
    Keywords,
    Companies,
    Editor,
    Panel,
    Uploader,
    Accept
  },
  computed:{
    isEdited(){
      if(this.articles[0]){return this.currentArticle.title != this.articles[0].title ||
      this.currentArticle.author != this.articles[0].author ||
      this.currentArticle.source != this.articles[0].source ||
      this.currentArticle.url != this.articles[0].url ||
      this.currentArticle.urlToImage != this.articles[0].urlToImage ||
      this.currentArticle.description != this.articles[0].description ||
      this.currentArticle.publishedAt != this.articles[0].publishedAt
      }else{return false}
    },
    isFullyFilled(){
      return this.currentArticle.title != '' &&
      this.currentArticle.author != '' &&
      this.currentArticle.source != '' &&
      this.currentArticle.url != '' &&
      this.currentArticle.urlToImage != '' &&
      this.currentArticle.description != '' &&
      this.currentArticle.publishedAt != '' &&
      this.currentArticle.title != undefined &&
      this.currentArticle.author != undefined &&
      this.currentArticle.source != undefined &&
      this.currentArticle.url != undefined &&
      this.currentArticle.urlToImage != undefined &&
      this.currentArticle.description != undefined &&
      this.currentArticle.publishedAt != undefined
    },
    objectID: function(){
      let sourceId=this.currentArticle.source;
      let titleId = this.currentArticle.title;
      if(this.currentArticle.source.split('.').length != 0){
        sourceId = this.currentArticle.source.split('.').join('-');
      }
      if(this.currentArticle.title.split('.').length != 0){
        titleId = this.currentArticle.title.split('.').join('-');
      }
      return encodeURIComponent(sourceId.split(' ').join('').toLowerCase() + "-" + titleId.split(' ').join('').toLowerCase());
    },
  },
  methods:{
    logout(){
      this.isLoggedIn = false;
      window.localStorage.removeItem('user')
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    dragStart(ev) {
      this.isDragging = true
      this.startPos = ev.deltaX;
      //console.log(event.x)
      //ev.dataTransfer.setData("text", ev.target.id);
    },
    dragging(ev){
    let dragLength = ev.deltaX
    if(this.startPos < dragLength){
      this.isAccepted = true;
    }else{
      this.isAccepted = false;
    }
    document.getElementById('main-view').style.transform = 'translate(' + (this.startPos + dragLength) + 'px)'
    },
    dragEnd(ev){
      this.isDragging = false
      if ((this.startPos + ev.deltaX) > (window.screen.width/2) && this.selectedCompanies.length != 0){
        this.acceptAnimation()
      }else if ((this.startPos - ev.deltaX) > (window.screen.width/2)){
        this.declineAnimation()
      }else{
        document.getElementById('main-view').style.transform = 'translate(0px)'
      }
    },
    acceptAnimation() {
      console.log('accept animation');
      document.getElementById('main-view').style.transform = 'translate33(0,100vw,0)'
      let self = this;
      this.submitArticle()
      setTimeout(function(){
        document.getElementById('main-view').style.display = 'none'
        self.loadNewArticle()
        self.isManualArticle = false;
      },200)
    },
    declineAnimation() {
      console.log('decline animation');
      document.getElementById('main-view').style.transform = 'translate33(0,-100vw,0)'
      let self = this;
      setTimeout(function(){
        dataUpdate.$emit('clearSelections')
        document.getElementById('main-view').style.display = 'none'
        self.loadNewArticle()
        self.isManualArticle = false;
      },200)
    },
    updateArticle(obj){
      this.currentArticle = obj;
    },
    loadNewArticle() {
      console.log('loading new article');
      this.currentArticle = this.articles[1]
      this.uploaderOpened = true;
      this.isLoadingNewArticle = true;
      document.getElementById('main-view').style.transform = 'translate3d(0,0,0)'
      let self = this;
      setTimeout(function(){
        document.getElementById('main-view').style.display = 'inherit'
        let that = self;
        setTimeout(function(){that.isLoadingNewArticle = false;},100)
        console.log('timeout');
      }, 300)
    },
    declineArticle: function() {
      console.log('isDenied')
      this.loadNewArticle()
      this.isManualArticle = false;
      dataUpdate.$emit('clearSelections')
    },
    toggleRecommend(){
      console.log(this.currentArticle);
      this.currentArticle.recommended = !this.currentArticle.recommended;
    },
    toggle: function(propertyName) {
      if(propertyName.indexOf('.')!= -1){
          let props = propertyName.split('.')
          this[props[0]][props[1]] = !this[props[0]][props[1]];
      }else{
        this[propertyName] = !this[propertyName];
      }
    },
    openEditor(){
      this.isEditorOpened = true;
      this.editArticle = Object.assign({}, this.currentArticle)
    },
    revertEdits: function() {
      this.currentArticle = Object.assign({}, this.articles[0])
      console.log('revert edits')
    },
    manualUpload: function(upload) {
      upload.recommended = false;
      this.currentArticle = upload;
      this.articles[0] = upload;
      this.uploaderOpened = false;
      this.isManualArticle = true;
    },
    setArticle: function(article) {
      this.currentArticle = article;
    },
    receiveUser(obj){
      window.localStorage.setItem('user', obj.user.uid);
      window.localStorage.setItem('email', obj.user.email);
      this.user = obj.user;
      this.email = obj.email;
      this.isLoggedIn = true;
    },
    guidPart() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
    submitArticle() {
        let article = this.currentArticle;
        article.objectID = this.objectID;
        article.topic = this.selectedKeywords;
        //missing author
        let objectIDHolder = this.objectID;
        let companyHolder = this.selectedCompanies;
        console.log("arr:" ,companyHolder);
        if(companyHolder.length == 1){
          fb.database().ref(companyHolder[0]).child(objectIDHolder + "-" + this.guidPart()).set(article)
          .then(() => {
            console.log('Success');
            dataUpdate.$emit('clearSelections')
            this.loadNewArticle()
            this.isManualArticle = false;
            // this.$swal({
            //   title: 'Success!',
            //   text: 'Your article was submitted',
            //   type: 'success'
            // })
          })
          .catch(err => {
            console.log('Error', err);
          })
        }else{
          for(let i = 0; i <= companyHolder.length; i++){
            fb.database().ref(companyHolder[i]).child(objectIDHolder + "-" + this.guidPart()).set(article)
            .then(() => {
              console.log('Success');
            // this.$swal({
            //   title: 'Success!',
            //   text: 'Your article was submitted',
            //   type: 'success'
            // })
          })
          .catch(err => {
            console.log('Error', err);
          })
        }
      }
    },
  },
  data: function() {
    return {
      isLoggedIn: window.localStorage.getItem('user') ? true : false,
      isAccepted: false,
      isLoadingNewArticle: false,
      isManualArticle: false,
      uploaderOpened: true,
      isEditorOpened:false,
      isDragging: false,
      startPos: 0,
      user:'',
      email: window.localStorage.getItem('user') ? window.localStorage.getItem('user') : '',
      keywords:["Brands","Digital Advertising","Mobile","OTT","Programmatic Advertising","Publishers","Social Media","TV","TV Advertising","Video","Poverty","Social Innovation","Impact Investing"],
      companies: ['A+E Networks','Exceptional Wines','ExtremeReach','Hearst','Turner Family Center'],
      selectedCompanies:[],
      selectedKeywords:[],
      currentArticle:{},
      editArticle:{},
      articles:[{},{urlToImage: '',
          title: '',
          url: '',
          source:'',
          author:'',
          publishedAt: '',
          recommended: false,
          description:''}]
    //   articles: [{
    //     urlToImage: 'https://tctechcrunch2011.files.wordpress.com/2018/01/10502_03_0774.jpg',
    //     title: 'As David Letterman’s First Netflix Guest, Barack Obama Warns Against the ‘bubble’ of Social media',
    //     url: 'https://techcrunch.com/2018/01/12/as-david-lettermans-first-netflix-guest-barack-obama-warns-against-the-bubble-of-social-media/',
    //     source:'techcrunch',
    //     publishedAt: 'January 12',
    //     recommended: false,
    //     description: 'David Letterman seems to be taking the title of his new Netflix show very seriously: On the very first episode of My Next Guest Needs No Introduction With..'
    //   },
    //   {
    //     urlToImage: 'https://cdn-images-1.medium.com/max/1200/1*mPuZbLfPZ8e31fVs4TQ8fA.jpeg',
    //     title: '14 Ways to Take UX to the Next Level for Progressive Web Apps',
    //     url: 'https://uxplanet.org/14-ways-to-take-ux-to-the-next-level-for-progressive-web-apps-6e1d9babde75',
    //     source:'uxplanet.org',
    //     publishedAt: '19:27:27.467Z',
    //     recommended: false,
    //     description: 'There were stand-alone web products and there were apps, but now there’s also the hybrid breed of progressive web apps (PWA) that’s…'
    //   },
    //   {
    //     urlToImage: 'https://cdn-images-1.medium.com/max/1200/1*4IP8pFx-f2X9gG-7MNSNeA.jpeg',
    //     title: '5 Things I Learned By Hacking My Way Into Space – 5 Things I Learned – Medium',
    //     url: 'https://medium.com/s/5-things-i-learned/5-things-i-learned-by-hacking-my-way-into-space-53fb70d6bf14',
    //     source:'medium.com',
    //     publishedAt: '2018-01-10T17:21:02.091Z',
    //     recommended: false,
    //     description: 'In 2010 Jon Spooner of Unlimited Theatre accidentally set up his own space agency. Based out of his garden shed, the Unlimited Space Agency started as a fun way to tell inspirational stories about…'
    //   }
    // ]
    }
  }
}
</script>
