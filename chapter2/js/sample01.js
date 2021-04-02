// Vueクラスをインスタンス 化してVue.jsを起動（マウント）させる
let app = new Vue({
  el: '#app',
  data: {
    message: 'みなさん、こんにちは！'
  }
});

let app2 = new Vue({
  el: '#app2',
  data: {
    url: 'https://wings.msn.to/'
  }
});

let app3 = new Vue({
  el: "#app3",
  data: {
    flag: false
  }
});

let app4 = new Vue({
  el: "#app4",
  data: {
    email: 'M-Ka@exlample.com'
  },
  methods: {
    localEmail: function() {
      return this.email.split('@')[0].toLowerCase();
    }
  }
});

let app5 = new Vue({
  el: "#app5",
  data: {
    current: new Date().toLocaleString()
  },
  computed: {
    randomc: function() {
      return Math.random();
    }
  },
  methods: {
    onclick: function() {
      this.current = new Date().toLocaleString();
    },
    randomm: function() {
      return Math.random();
    }
  }
});

let app6 = new Vue({
  el: "#app6",
  data: {
    current: new Date()
  },
  created: function() {
    let that = this;
    this.timer = setInterval(function() {
      that.current = new Date();
    }, 1000);
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
});

let app7 = new Vue({
  el: "#app7",
  data: {
    author: {
      name: '山田'
    }
  },
  created: function() {
    let that = this;
    this.timer = setTimeout(function() {
      //Vue.jsがプロパティの追加を検知できないため表示されない
      //that.author.company = 'WINGプロジェクト';
      //Vue setメソッドでプロパティの追加・Vue.jsに通知できる
      //ここではauthorオブジェクトの配下にcompanyプロパティを追加
      Vue.set(that.author, 'company', 'WINGプロジェクト');
    }, 3000);
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
});

let app8 = new Vue({
  el: '#app8',
  data: {
    name: '',   //入力値
    upperName: ''　 //大文字変換後の表示する値
  },
  // createdフックのタイミングで生成した遅延関数をdelayFuncに代入
  // debounce: 呼び出しを遅らせる
  // _.:　lodashを使う時の宣言
  created: function() {
    this.delayFunc = _.debounce(this.getUpper, 2000);
  },
  // nameプロパティが変化したときにdelayFuncメソッドを呼び出す
  // 2000ミリ秒以上処理を呼び出さない場合にだけ決められた処理を実行
  watch: {
    name: function(newValue, oldValue) {
      this.delayFunc();
    }
  },
  // nameの値を大文字に変換したものをupperNameプロパティに設定
  methods: {
    getUpper: function() {
      this.upperName =　this.name.toUpperCase();
    }
  }
});