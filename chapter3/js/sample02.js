let app = new Vue({
  el: "#app",
  data: {
    message: ''
  },
  // 現在日時を求めた上で、その値をmessageプロパティに代入
  methods: {
    onclick: function() {
      this.message = new Date().toLocaleString();
    }
  }
});

let app2 = new Vue({
  el: "#app2",
  //　イベントハンドラーからイベントオブジェクトを参照
  methods: {
    onclick: function(e) {
      console.log(e);
    }
  }
});

let app3 = new Vue({
  el: '#app3',
  methods: {
    onclick: function(message, e) {
      console.log(message);
      console.log(e);
    }
  }
});

let app4 = new Vue({
  el: "#app4",
  data: {
    myName: '匿名'
  }
});

let app5 = new Vue({
  el: "#app5",
  data: {
    pet: 'いぬ'
  }
});

let app6 = new Vue({
  el: "#app6",
  data: {
    message: ''
  },
  methods: {
    onchange: function() {
      // アップロードファイル準備
      // this.$ref.名前の形式でref属性で命名した要素へアクセス
      let fl = this.$refs.upfile.files[0];
      // Fileオブジェクトのままではアップロードできないので、
      // 送信のための形式(FormDataオブジェクト)に変換しておく
      let data = new FormData();
      // FormDataにファイル（データ）を追加するのはappendメソッドの役割
      // append(name,value[file.name])
      data.append('upfile', fl, fl.name);
      // fetchメソッドで、サーバー(upload.php)にデータを送信
      // アップロードデータはbodyオプションに渡す
      fetch('upload.php', {
        method: 'POST',
        body: data,
      })
      // 成功時には結果を表示
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        this.message = text;
      })
      // 失敗時にはエラーメッセージをダイアログ表示
      .catch(function (error) {
        window.alert('Error: ' + error.message);
      });
    }
  }
});

let app7 = new Vue({
  el: "#app7",
  data: {
    temperature: 0
  },
  methods: {
    // 入力値を小数点以下１位にまるめ、ログ出力
    onchange: function() {
      console.log(this.temperature.toFixed(1));
    }
  }
});

let app8 = new Vue({
  el: "#app8",
  data: {
    mails: []
  }
})

let app9 = new Vue({
  el:'#app9',
  data: {
    // パネルの表示状態を表すフラグ
    show: true
  }
});

let app10 = new Vue({
  el: "#app10",
  data: {
    books: [
      {
      isbn: '978-4-7981-5757-3',
      title: 'Javascript逆引きレシピ',
      price: 2800
      },
      {
        isbn: '978-4-7981-5757-8',
        title: 'Vue.js',
        price: 3000
      }
    ]
  }
});

let app11 = new Vue({
  el: "#app11",
  data: {
    books: [
      {
      isbn: '978-4-7981-5757-3',
      title: 'Javascript逆引きレシピ',
      price: 2800
      },
      {
        isbn: '978-4-7981-5757-8',
        title: 'Vue.js',
        price: 3000
      }
    ]
  },
  computed: {
    // filterはコールバック関数の条件に合致する(＝戻り値がtrue)要素だけを返す
    expensiveBooks: function() {
      return this.books.filter(function(b) {
        return b.price >= 2500;
      })
    }
  }
});

let app12 = new Vue({
  el: "#app12",
  data: {
    songs: [
      {
        title: '赤トンボ',
        lyrics: '夕焼け小焼けの・・・',
        composer: '山田耕作'
      },
      {
        title: '七つの子',
        lyrics: 'なぜなくの・・・',
        composer: '本居長世'
      }
    ]
  }
})

let app13 = new Vue({
  el: "#app13",
  data: {
    //属性情報をまとめて定義
    attrs: {
      size: 20,
      maxlength: 14,
      required: true
    }
  }
});

let app14 = new Vue({
  el: "#app14",
  data: {
    message: 'みなさん、こんにちは！'
  }
});

let app15 = new Vue({
  el: "#app15"
});

let app16 = new Vue({
  el: "#app16",
  data: {
    name: '匿名'
  },
  methods: {
    // ESCキーでテキストをクリア
    clear: function() {
      this.name = '';
    }
  }
});

let app17 = new Vue({
  el: "#app17",
  data: {
    // コンテキストメニューの表示位置
    pos: {
      left: 0,
      right: 0
    },
    // コンテキストメニューの表示状態
    show: false
  },
  methods: {
    // 左クリックでメニュー非表示
    onleftclick: function() {
      this.show = false;
    },
    // 右クリックでメニュー表示
    onrightclick: function(e) {
      this.pos = {
        // メニューの表示位置(left:X軸 right; Y軸)
        top: e.pageY + 'px',
        left: e.pageX + 'px'
      };
      // メニューを表示するかどうか(true false)
      this.show = true;
    }
  }
});