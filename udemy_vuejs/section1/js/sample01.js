new Vue({
  el: '#app',
  data: {
    message: 'HelloWorld!'
  },
  methods: {
    reverseMessage: function() {
      // this.message:このVueインスタンス内のmessageにアクセス
      // 配列→逆→連結
      this.message = this.message.split('').reverse().join('')
    }
  }
})