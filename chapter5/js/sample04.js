// 個々のバナー
Vue.component('banner-member', {
  template: `<div class="banner">
    <h3>WINGSメンバー募集中！</h3>
    <p>参加しませんか？</p>
  </div>`
});
Vue.component('banner-new', {
  template: `<div class="banner">
    <h3>新刊「HTML5超入門 」発売</h3>
    <p>ステップバイステップで学ぶ入門書です。<br />
      HTML5アプリの基礎知識、画面のデザイン、コードの書き方などが理解できます。</p>
  </div>`
});
Vue.component('banner-env', {
  template: `<div class="banner">
    <h3>環境構築設定</h3>
    <p>開発環境の設定方法を図を交えて詳しく解説します。<br />
      紹介している各モジュールは、日々頻繁にバージョンアップが行われています。</p>
  </div>`
});
let app = new Vue({
  el: "#app",
  // 起動時にコンポーネント切り替え用のタイマーを準備
  // 準備のタイミングは、メインコンポーネントを起動したタイミング(created)
  created: function() {
    let that = this;
    // 表示すべきコンポーネントを一定時間おきに切り替えるためにsetIntervalメソッドでタイマーを準備
    this.interval = setInterval(function(){
      // that.current + 1) % that.components.lengthで０〜最大インデックスの範囲で循環する値を求め、
      // その値をcurrentプロパティに反映させている
      that.current = (that.current + 1) % that.components.length;
    }, 3000);
  },
  // タイマーを破棄
  // コンポーネントないで準備したリソースはコンポーネントを破棄するタイミングで破棄する
  beforeDestroy: function() {
    clearInterval(this.interval);
  },
  // 表示コンポーネントを管理
  computed: {
    // 現在表示すべきコンポーネント名を取得
    // 表示コンポーネントの完全名(banner-xxx)は、components,currentプロパティから
    // currentBannerプロパティで算出する
    currentBanner: function() {
      // 表示すべきコンポーネントはcomponentsプロパティでリスト化しておく
      // 対象のコンポーネントを増やしたい場合はここで追加する
      // currentプロパティの変化によって、表示コンポーネントも変化する
      return 'banner-' + this.components[this.current];
    }
  },
  // 表示コンポーネントを管理
  data: {
    // 表示中のコンポーネント(components配列内のインデックス番号)
    // currentプロパティは、後からタイマーで制御するためにインデックス値
    // この値を時間経過で変化することで、表示コンポーネントを切り替える
    current: 0,
    // 表示すべきコンポーネントのリスト
    components: [ 'member', 'new', 'env' ]
  }
});

Vue.component('tab-member', {
  template: `<div class="tab">
    <p>あなたもWINGSプロジェクトに参加しませんか？<br />
      現在、WINGSプロジェクトでは、ご一緒にお仕事ができる仲間を募集中です。</p>
    <label>名前：<input type="text" v-model="name" /></label>
    <input type="submit" value="登録" />
  </div>`,
  data: function() {
    return {
      name: ''
    }
  }
});
Vue.component('tab-new', {
  template: `<div class="tab">
    <h3>「HTML5超入門 」発売！</h3>
    <p>ステップバイステップで学ぶ入門書です。<br />
      HTML5アプリの基礎知識、画面のデザイン、コードの書き方などが理解できます。</p>
  </div>`
});
Vue.component('tab-env', {
  template: `<div class="tab">
    <p>開発環境の設定方法を図を交えて詳しく解説します。<br />
      紹介している各モジュールは、日々頻繁にバージョンアップが行われています。</p>
  </div>`
});
let app2 = new Vue({
  el: "#app2",
  methods: {
    // クリック時に現在のパネルを表すcurrentプロパティを切り替える
    onclick: function(tab) {
      this.current = tab;
    }
  },
  computed: {
    // タブ名の取得(tab-xxxxxのxxxxの部分)
    tabNames: function() {
      return Object.keys(this.tabs);
    },
    // 現在表示すべきコンポーネント名を取得
    currentTab: function() {
      return 'tab-' + this.current;
    }
  },
  data: {
    // 表示中のタブ
    current: 'member',
    // 予めタブリストを用意しておく
    tabs: {
      'member': 'メンバー募集',
      'new': '新刊紹介',
      'env': '環境構築設定'
    }
  }
});

Vue.component('my-input', {
  // valueプロパティを準備
  props: [ 'value' ],
  // input要素に準備したvalueプロパティをバインド
  // input要素のinputイベントが発生したところで、
  // コンポーネント自体のinputイベントを$emitする
  // $event.target.value:入力値
  template: `<label>
    名前：
    <input
     type="text" v-bind:value="value"
     v-on:input="$emit('input', $event.target.value)" />
  </label>`
});
let app3 = new Vue({
  el: "#app3",
  data: {
    message: ''
  }
});

Vue.component('my-input2', {
  props: [ 'value' ],
  template: `<label>
    名前：
    <input
      type="text" v-bind:value="value"
      v-on:input="$emit('update:value', $event.target.value)" />
  </label>`
});
let app4 = new Vue({
  el: "#app4",
  data: {
    message: ''
  }
})

let app5 = new Vue({
  el: "#app5",
  data: {
    flag: true
  },
  methods: {
    onclick: function() {
      this.flag = !this.flag;
    }
  }
});

let app6 = new Vue({
  el: "#app6",
  data: {
    // 表示するパネル(インデックス番号)
    id: 0,
    //表示するパネルを配列として、パネルの内容を管理
    panels: [
      'いぬ',
      'ねこ',
      'とり'
    ],
  },
  methods: {
    // クリック時にid値を0~2で変化
    onclick: function() {
      this.id = (this.id + 1) % this.panels.length;
    }
  }
});

let app8 = new Vue({
  el: "#app8",
  data: {
    todo: '',
    // todoリストの初期値
    items: [
      'A',
      'B',
      'C',
      'D'
    ]
  },
  methods: {
    // 新たに入力っされた項目は配列の先頭に追加
    onadd: function() {
      this.items.unshift(this.todo);
      this.todo = '';
    },
    // 指定された項目を配列から除外
    onremove: function() {
      let that = this;
      // filterは配列の内容を特定の条件で絞り込むメソッド
      this.items = this.items.filter(function(value){
        return value !== that.todo;
      });
      this.todo = '';
    },
    onsort: function() {
      this.items.sort();
    }
  }
});

Vue.component('hello', {
  // templateオプションから #idの形式でテンプレートを参照させる
  template: '#hello',
  data: function() {
    return {
      name: 'Vue.js'
    };
  }
})
let app9 = new Vue({
  el: "#app9"
});

Vue.component('my-loading', {
  props: ['type'],
  // renderオプションの値は関数として表す
  // render関数であることの条件は以下
  // 引数としてcreateElementメゾットを受け取る(ここではhで省略)
  // createElement(要素名[データオブジェクト][子要素])
  // 戻り値として生成された要素(VNodeオブジェクト)を返す
  render: function(h) {
    // type属性に応じて戻り値を切り替え
    switch(this.type) {
      case 'text':
        // 属性がなく、子要素（テキスト）がある例
        // 引数の要素名、子要素を指定する
        return h('p', '...Now Loading...');
      case 'image':
        // 子要素がなく、属性だけを持つ要素の例
        // 引数の要素名、データオブジェクトを指定する
        return h('img', {
          attrs: {
            src: 'loading.gif',
            alt: 'loading'
          }
        });
      default:
        console.error('type属性はimage、textいずれかを設定してください');
        return null;
    }
  }
});
let app10 = new Vue({
  el: "#app10"
});

Vue.component('my-random', {
  // 関数型コンポーネントを有効化
  // 関数型コンポーネントでは、出力はrenderオプション経由で行う
  functional: true,
  props: [ 'min', 'max' ],
  // 関数型オブジェクトはインスタンスを持たないので、コンテキストオブジェクト経由で明示的に情報を受け取る
  // 関数型コンポーネントでは第２引数でコンテキストオブジェクトを受け取る
  // コンテキストオブジェクトとは、コンポーネントの動作に必要とされる情報を詰め込んだオブジェクト
  render: function(h, context) {
    //propsプロパティ経由でmin,maxプロパティを取得
    let min = context.props.min;
    let max = context.props.max;
    // min=maxの範囲の乱数を生成
    let result = Math.floor(Math.random() * (max - min + 1) + min);
    // createElement(h)メソッドで結果要素(ここではp要素)を生成し、戻り値路して返す
    return h('p', result);
  }
});
let app11 = new Vue({
  el: "#app11"
})