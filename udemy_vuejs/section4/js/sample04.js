// dataを外部で定義することはOK
var data = {
  message: 'インスタンス１',
  name: 'topi'
}
// コンポーネントは上に書く必要がある
// 第一引数にはコンポーネントの名前
// 第二引数は情報を書いていく
Vue.component('hello', {
  template: '<p>hello</p>'
});
// 変数を指定することで、外部からもアクセスができる
// Vueはインスタンスが作成された際に全てのプロパティを渡り歩く
var vm = new Vue({
  el: '#app',
  // プロパティごとウォッチャ(getterとsetter)が用意される
  // getter:その変数が参照されたときに関数が実行される
  // setter:messageが書き換わったときに関数を実行したいという際に書く所
  // data内に置いてあるデータでないとリアクティブにならない
  data: data,
  // インスタンス内でプロパティやメソッドにアクセスする
  computed: {
    Myobject: function() {
      // 外部からの場合はvim.$data
      // 自身で作成したプロパティやメソッドには$はつかない
      return this.$data
    }
  }  
});
// dataにないものを後付けしてもリアクティブにはならない
// getterとsetterが用意されないため
// vm.name = 'mari'
// 外部からapp1のmessageにアクセスして書き換え
// vm1.message ='書き換え'


//var vm2 = new Vue({
//  el: '#app2',
//  data: {
//    message: 'インスタンス２'
//  },
//  methods: {
    //vm2からもインスタンス１へアクセスできる
//    changeMessage1: function() {
//      vm1.message = 'インスタンス２から変更'
//    }
//  }
//})

var vm2 = new Vue({
  data: {
    message: 'こんにちは！'
  }
})
// 後からelプロパティを付けたいときに使う
vm2.$mount('#app2')

new Vue({
  data: {
    name: 'topi'
  },
  // HTMLに書いていたテンプレートをtemplateプロパティにそのまま書いても
  // 同じ表現ができる（行が多いと煩雑になるのであまり使わない）
  template: '<h1>こんにちは{{name}}</h1>'
}).$mount('#app3')
// 変数としなくても$mountできる

new Vue({
  el: '#app4',
  data: {
    name: 'topi'
  },
  // render関数内でテンプレートを書いていく
  // デフォルトでcreateElementを引数に持つことができる
  render: function(createElement) {
    // consoleにはVNode(仮想Node)が表示される
    // VNodeの中身はオブジェクト=DOM要素ではない
    // 仮想DOM(DOM要素を模したjavascriptのオブジェクト)を作るため
    console.log(createElement('h1', 'こんにちは' + this.name));
    return createElement('h1', 'こんにちは' + this.name)
  }
})

var dir = document.createElement('div');
// DOM要素を作る
// <div></div>
console.log(dir)
// div→オブジェクト
console.dir(dir)
// htmlが全て表示
console.log(document)
// オブジェクト
console.dir(document)

new Vue({
  el: '#app5',
  data: {
    name: 'topi'
  },
  beforeCreate: function() {
    console.log('beforeCreate')
  },
  // dataやmethodsにアクセスできるようになる
  created: function() {
    console.log('created')
  },
  beforeMount: function() {
    console.log('beforeMount')
  },
  // DOMにアクセスできるようになる
  mounted: function() {
    console.log('mounted')
  },
  beforeUpdate: function() {
    console.log('beforeUpdate')
  },
  // 2度updateしても同じ内容であれば実行されない
  // 仮想DOM同士が内容を比較し変更がないため=DOMを再描画していないため
  updated: function() {
    console.log('updated')
  },
  beforeCreate: function() {
    console.log('beforeCreate')
  },
  beforeDestroy: function() {
    console.log('beforeDestroy')
  },
  // インスタンスが破壊される
  // 画面から消えるわけではないが、それ以降変更などはできなくなる
  destroyed: function() {
    console.log('destroyed')
  },
  methods: {
    destroy: function() {
      this.$destroy()
    }
  }
})

new Vue({
  el: '.hello',
  template: '<p>こんにちは</p>'
})