let app1 = new Vue({
  el: '#app1',
  data: {
    ok: false,
    maybeok: true,
    hello: true
  }
})

let app2 = new Vue({
  el: '#app2',
  data: {
    fruits: ['りんご', 'ばなな', 'もも'],
    object: {
      firstName: '太朗',
      lastName: '田中',
      age: 20
    }
  }
})

let app3 = new Vue({
  el: '#app3',
  data: {
    fruits: ['りんご', 'ばなな', 'もも']
  },
  methods: {
    remove: function() {
      this.fruits.shift()
    }
  }
})