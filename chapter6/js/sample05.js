// Vue.directive(ディレクティブ名,動作の定義)でディレクティブを定義
//　動作の定義は「実行のタイミング:関数」形式のオブジェクトを指定
Vue.directive('highlight', {
  bind: function(el, binding, vnode, oldVnode) {
    el.style.backgroundColor = binding.value;
  }
});
let app = new Vue({
  el: "#app",
  data: {
    color: 'yellow'
  }
});

Vue.directive('highlight2', {
  // 紐づいたときの処理（初回のみ）
  bind: function(el, binding, vnode, oldVnode) {
    el.style.backgroundColor = binding.value;
  },
  // 上位コンポーネントが変化した時
  update: function(el, binding, vnode, oldVnode) {
    el.style.backgroundColor = binding.value
  }
});
let app2 = new Vue({
  el: "#app2",
  data: {
    color: 'yellow'
  }
});

let hook = function(el, binding) {
  if (binding.value === binding.oldValue) {return}
  // binding.modifiersプロパティで修飾子のオン／オフにアクセス
  // border修飾子で背景ハイライトか枠線ハイライトかを選択
  // 戻り値はtrue.false
  if (binding.modifiers.border) {
    el.style.borderColor = binding.value;
    el.style.borderStyle = 'solid';
  } else {
    el.style.backgroundColor = binding.value;
  }
};
Vue.directive('highlight3', {
  bind: hook,
  update: function(el, binding, vnode, oldValue) {
    // once修飾子でupdate更新はスキップ
    if(!binding.modifiers.once) {
      hook(el, binding)
    }
  }
});
let app3 = new Vue({
  el: "#app3",
  data: {
    color: 'yellow'
  }
});

Vue.directive('highlight4', function(el, binding, vnode, oldVnode) {
  // ディレクティブの引数を取得するために、フック関数でbinding.argプロパティを参照する
  // 引数の値に応じてハイライト処理を分岐
  // 引数は文字列として取得できる
  switch(binding.arg) {
    case 'bg':
      el.style.backgroundColor = binding.value;
      break;
    case 'border':
      el.style.borderStyle = 'solid';
      el.style.borderWidth = '1px';
      el.style.borderColor = binding.value;
      break;
    case 'text':
      el.style.fontWeight = 'bold';
      el.style.color = binding.value;
      break;
    default:
      throw new Error('指定のハイライトは使えません');
  }
});
let app4 = new Vue({
  el: "#app4",
  data: {
    color: 'red'
  },
});

Vue.directive('highlight5', {
  bind: function(el, binding) {
    // mouseenter時のイベント処理を定義
    el.addEventListener('mouseenter', function() {
      this.style.backgroundColor = binding.value;
    }, false);
    // mouseleave時のイベント処理を定義
    el.addEventListener('mouseleave', function() {
      this.style.backgroundColor = null;
    }, false);
  }
});
let app5 = new Vue({
  el: "#app5",
  data: {
    color: 'yellow'
  }
});

Vue.directive('markdown',function(el, binding, vnode, oldVnode) {
  el.innerHTML = marked(el.textContent, binding.value);
});

let app6 = new Vue({
  el: '#app6',
  data: {
    options: {
      gfm: true,
      breaks: true,
      xhtml: true,
    }
  },
});

// trimフィルターを宣言
// Vue.filter(フィルター名,フィルターの挙動)
// フィルターの挙動は引数として加工対象の値、フィルターのための引数を受け取り、
// 加工した結果を戻り値として返す
Vue.filter('trim', function(value) {
  // 引数valueが文字列であるかを確認
  // 文字列以外であれば、その値をそのまま返す
  if (typeof value !== 'string') {
    return value;
  }
  // 引数valueが文字列であった場合はtrimメソッドで文字列前後の空白を除去
  return value.trim();
});
let app7 = new Vue({
  el: "#app7",
  data: {
    str: ' WINGS Project '
  }
});

// nl2brフィルターを定義
Vue.filter('nl2br', function(value) {
  // データ型をチェック
  // 文字列でない場合にはそのまま返す
  if (typeof value !== 'string') {
    return value;
  }
  // 文字列の場合はreplaceメソッドで改行文字を変換
  // /\r?\n/は\r\nまたは\n
  // ?は０回か１回という意味
  // \rが０回の\nか１回の\n
  // gはグローバルマッチといって、当てはまるもの全てを置き換える役割
  return value.replace(/\r?\n/g, '<br />');
});
let app8 = new Vue({
  el: "#app8",
  data: {
    memo: ''
  }
})

// フィルターにパラメータを渡すには、filterメソッドに指定した関数の第2引数移行を利用
// ここではlen,omitがパラメータ
// 引数の規定値は「引数名＝値」で明示する
Vue.filter('truncate', function(value, len = 10, omit = '...') {
  // 文字列でなければ元の値を返す
  if (typeof value !== 'string') {
    return value;
  }
  // 文字列長が指定文字数(len)以下であれば、元の値を返す
  if (value.length <= len) {
    return value;
  } else {
    // 指定文字数を超えたら、超過分を切り捨て、末尾文字(omit)を付与
    return value.substring(0, len) + omit;
  }
});
let app9 = new Vue({
  el: "#app9",
  data: {
    memo: ''
  }
});

// Vue.useでVeeValidateを有効化
// Vue.use(有効かするプラグイン,動作オプション)
// fastExitは、最初のエラーで確認を打ち切るかを決定
Vue.use(VeeValidate, {
  locale: 'ja',
  fastExit: false,
  dictionary: {
    ja: {
      messages: {
        required: function(field, param) {
          return field + 'を入力してください'
        }
      },
      // 個別フィールド名をdata-vv-as属性で宣言していたが、
      // フィールド名はアプリで統一すべきものなので、１箇所で管理する
      // attributesオプションで辞書としてまとめておく
      attributes: {
        name: '氏名',
        age: '年齢',
        sex: '性別',
        memo: 'メモ'
      }
    }
  }
});


let app10 = new Vue({
  el: "#app10",
});

let app11 = new Vue({
  el: "#app11",
  // 検証ルールはVueインスタンスの生成時(created)に宣言する
  created: function() {
    // ルールそのものはValidator#extendメソッドで宣言
    // validatorオブジェクトは、VeeValidate登録時に
    // Vueの$validatorプロパティとして登録されているので、
    // フック関数からは「this.$validator」でアクセス可能
    // extend(ルール名,検証ルール)
    // 検証ルールはgetMessage(field,args),validate(value,args) メソッドを持ったオブジェクト
    this.$validator.extend('ngword', {
      // getMessage(項目名,検証パラメーター):検証エラー時のメッセージを取得
      getMessage(field, args) {
        return field + 'で「'+ args +'」は利用できない単語です';
      },
      // validate(入力値,検証パラメーター):検証本体(検証正否をtrue/falseで返す)
      // 引数args(検証パラメータ)には「暴力,グロ,エロ」が渡されている
      // カンマ区切りの値は、内部的に配列として扱われる
      // Array#everyメソッドでそれぞれの値argが入力りvalueに含まれないか
      // (=indevOfメソッドが-1であるか)を判定し、全ての単語で問題なければ
      // validateメソッド全体としてtrue(=検証成功)を返す
      validate(value, args) {
        return args.every(function(arg) {
          return value.indexOf(arg) === -1;
        });
      }
    });
  },
});

// Vue.useメソッドの呼び出しはElementが内部的に行っているので不要
let app12 = new Vue({
  el: "#app12"
});

// trimフィルターを一つだけ定義した、MyUtilプラグインを定義
let MyUtil = {
  // プラグインを定義するために、<プラグイン名>オブジェクトの配下で、
  // installという名前のメソッドを用意する
  //installメソッドは、引数として「Vueクラス」「動作オプション」を受け取る
  install : function(Vue, options) {
    // trimフィルターを定義
    Vue.filter('trim', function(value) {
      if (typeof value !== 'string') {
        return value;
      }
      return value.trim();
    });
  }
};
Vue.use(MyUtil);
let app13 = new Vue({
  el: "#app13",
  data: {
    str: ' WINGS Project '
  }
});

// ミックスインを準備
// ミックスインは「オプション名：値,...」の形式のオブジェクトリテラル
let dataLoggable = {
  // moutedはDOMの作成が完了している状態(createdの場合は完成していない)
  mounted: function() {
    // dataプロパティでデータオブジェクトを参照
    console.log(this.$data);
  }
};
Vue.component('my-comp', {
  data: function() {
    return {
      current: new Date()
    }
  },
  template: `<div>現在時刻：{{ current }}</div>`,
  // ミックスインを組み込み
  // 複数のミックスインを組み込めるので、配列として指定
  mixins: [ dataLoggable ]
});
let app14 = new Vue({
  el: "#app14"
});