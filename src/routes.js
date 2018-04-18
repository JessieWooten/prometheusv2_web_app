export default [
  // {
  //     path: '/manual/',
  //     component: require('./components/manualUpload/Uploader.vue')
  // },
  {
      path: '/form/',
      component: require('./components/form.vue')
  },
  {
      path: '/dynamic-route/blog/:blogId/post/:postId/',
      component: require('./components/dynamic-route.vue')
  }
]
