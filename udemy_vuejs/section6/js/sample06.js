// ローカル登録のために変数登録
var component = {
  data: function() {
    // returnでオブジェクトを返す必要がある
    return {
      number : 12
    }
  },
  template: '<p>いいね({{number}})<button @click="increment">+1</button></p>',
  methods: {
    increment: function() {
      return this.number += 1;
    }
  }
}

// グローバル登録
// どこのVueインスタンスでも呼び出すことができる
//Vue.component('my-component', {
  // コンポーネントの中ではdataはコンポーネントである必要がある
  // オブジェクトにしてしまった場合、同じdataを共有してしまう
  // コンポーネントは複数用いるものだが、
  // オブジェクトだと１つの場所でdataを変更したら他の場所でもdataが変更されてしまう
  //data: function() {
    // returnでオブジェクトを返す必要がある
    //return {
      //number : 12
    //}
  //},
  //template: '<p>いいね({{number}})<button @click="increment">+1</button></p>',
  //methods: {
    //increment: function() {
      //return this.number += 1;
    //}
  //}
//})

new Vue({
  el: '#app',
  // インスタンスでローカル登録
  components: {
    // コンポーネント名:変数名
    'my-component': component
  }
});

new Vue({
  el: '#app2'
});