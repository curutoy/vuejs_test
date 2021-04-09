// コンポーネント定義
let MyHello = {
  template: `<div>こんにちはVue.js！</div>`,
}
let app = new Vue({
  el: '#app',
  components: {
    'my-hello': MyHello
  }
});

Vue.component('you-hello', {
  // プロパティを定義
  props: ['yourName'],
  template: '<div>こんにちは{{ yourName }}さん！</div>'
})
let app2 = new Vue({
  el:"#app2"
});

Vue.component('my-counter', {
  props: ['init'],
  template: `<div>現在の値は{{ current }}です！
    <input type="button" v-on:click="onclick" value="増やす" /></div>`,
  data: function() {
    return {
      // コンポーネント内部のデータオブジェクト(current)に退避させ、
      // init属性(プロパティ)を更新するようにする
      current: this.init
    };
  },
  methods: {
    onclick: function() {
      //onclickイベントハンドラーでcurrentプロパティを操作する(initプロパティではない)
      this.current++;
    }
  }
})
let app3 = new Vue({
  el: "#app3"
})

Vue.component('my-counter', {
  // ボタンクリックで加算する値
  props: [ 'step' ],
  // クリック時にカウントアップ処理を実行
  template: `<button type="button" v-on:click="onclick">{{ step }}</button>`,
  methods: {
    // クリック時にplusイベントを発生
    // イベントを発生させるのは、$emitメソッドの役割
    // plus: イベント名
    // Number(this.step): stepプロパティを数値に変換したもの。親コンポーネントに引き渡すデータ
    onclick: function() {
      // 子コンポーネント
      this.$emit('plus', Number(this.step));
    }
  }
});
let app4 = new Vue({
  el: "#app4",
  data: {
    current: 0
  },
  methods: {
    // 親コンポーネント
    // plusイベントでカウンター値を更新
    // $emitメソッドの引数で渡されたデータはイベントオブジェクト(e)として受け取られる
    // 引数eには増分値が格納されているので、そのままcurrentプロパティにインクリメントしている
    onplus: function(e) {
      this.current += e;
    }
  }
})

Vue.component('m-hello', {
  props: [ 'yourName' ],
  // テンプレートの配下にslot要素を埋め込むことで、
  // 呼び出し側で指定されたコンテンツがslot要素のあった場所に埋め込まれる
  template: `<div>こんにちは<slot>ゲスト</slot>さん！`,
})
let app5 = new Vue({
  el: "#app5"
})

Vue.component('my-slot', {
  // 複数のスロットを埋め込む場合、互いを区別できるようにslot要素にname属性をつける
  // 名前のないslot要素は、既定でname=defaultとみなされる
  template: `<div>
    <header>
      <slot name="header">DEFAULT HEADER</slot>
    </header>
    <div>
      <slot>MAIN</slot>
    </div>
    <footer>
      <slot name="footer">DAFAULT FOOTER</slot>
    </footer>
  </div>`
});
let app6 = new Vue({
  el: "#app6"
});

Vue.component('my-book', {
  data: function() {
    return {
      book: {
        isbn: '999-9-9999-9999-9',
        title: 'HTML',
        price: 2800,
        publish: '日経BP'
      }
    };
  },
  //　子コンポーネント
  // スコープ付きのスロットを利用するために、
  // 子コンポーネント(slot要素)の側でv-bindディレクティブでbook属性を登録
  // slot要素にバインドされたbook属性はスロットプロパティと呼ばれる
  template: `<div>
    <slot v-bind:book="book">{{book.title}} ({{book.publish}}) </slot>
  </div>`
});
let app7 = new Vue({
  el: "#app7"
})