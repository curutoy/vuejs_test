let app1 = new Vue({
  el: '#app1',
  data: {
    message: 'こんにちは！'
  },
  methods: {
    sayHi: function() {
      // インスタンス内でそのインスタンスのプロパティにアクセスする場合はthisをつける
      this.message = 'Hello!'
      return 'Hi!'
    }
  }
})

let app2 = new Vue({
  el: '#app2',
  data: {
    html: '<h1>h1です</h1>'
  }
})

let app3 = new Vue({
  el: '#app3',
  data: {
    url: 'https://google.com',
    attribute: 'href',
    urlTwitter: 'https://twitter.com',
    number: 31,
    // オブジェクトを作る場合、上のhref,numberは削除して良い
    twitterObject: {
      href: 'https://twitter.com',
      id: 31
    }
  }
})

let app4 = new Vue({
  el: '#app4',
  data: {
    number: 0,
    x: 0,
    y: 0
  },
  // methodsは関数をたくさん保持するブロック
  methods: {
    // 引数倍足していく
    // times=2
    countUp: function(times) {
      this.number += 1 * times
    },
    // eventをおくだけで、eventオブジェクトを取得できる
    changeMousePosition: function(divideNumber, event) {
      this.x = event.clientX / divideNumber;
      this.y = event.clientY / divideNumber;
    },
    myAlert() {
      alert('アラート！');
    }
  }
})

let app5 = new Vue({
  el: '#app5',
  data: {
    number: 0,
    event: 'click'
  },
  methods: {
    countUp: function() {
      this.number += 1;
    }
  }
})

let app6 = new Vue({
  el: '#app6',
  data: {
    message: 'こんにちは！'
  }
})

let app7 = new Vue({
  el: '#app7',
  // dataは動的なものを扱うことができない
  // あくまでも初期値
  data: {
    counter: 0,
    otherCounter: 0
  },
  // 動的に扱いたい場合はcomputedプロパティを用いる
  // 動的な表現をする必要がああるので、中身は関数を書く
  // プロパティなので、returnで値を返す必要がある
  // computedプロパティからdataにアクセスしたい場合はthisを用いる
  // computedプロパティは依存関係に基づいてキャッシュされる
  // 参照先(今回はthis.counter)が変わった時のみ実行される
  computed: {
    lessThanThree: function() {
      console.log('Computed');
      return this.counter > 3 ? '3より上' : '3以下'
    }
  },
  // methodsでも同じ表現ができるが、
  // methodsは再描画されるたびに実行されてしまう
  // console.logをみると、otherCounterを押した時でも反応している
  methods: {
    lessThanThreeMethods: function() {
      console.log('Methods');
      return this.counter > 3 ? '3より上' : '3以下'
    }
  }
})

let app8 = new Vue({
  el: '#app8',
  data: {
    counter: 0
  },
  computed: {
    lessThanThree: function() {
      return this.counter > 3 ? '3以上' : '3以下'
    }
  },
  // 特定のデータに何か変更があったときに処理を実行する
  // computedと似ているが、ウォッチャは
  // ウォッチャでは非同期処理をすることが多い
  // computedプロパティは非同期処理はできるものの、
  // returnの文を非同期処理で書くことができないため
  // 非同期処理の中ではthisが使えない
  watch: {
    // counterが変わったときに何か処理をしたい
    counter: function() {
      var vm = this;
      setTimeout(function() {
        vm.counter = 0
      }, 3000)
    }
  }
})

let app9 = new Vue({
  el: '#app9',
  data: {
    counter: 0
  },
  computed: {
    doubleCounterComputed: function() {
      return this.counter * 2;
    }
  },
  methods: {
    countUp: function() {
      this.counter += 1;
    },
    doubleCounterMethod: function() {
      return this.counter * 2;
    }
  }
});

let app10 = new Vue({
  el: '#app10',
  data: {
    isActive: true,
    color: 'red',
    bg: 'bg-blue'
  },
  computed: {
    classObject: function() {
      return {
        red: this.isActive,
        'bg-blue': !this.isActive
      }
    }
  }
})

let app11 = new Vue({
  el: '#app11',
  data: {
    textColor: 'red',
    bgColor: 'blue',
    styleObject: {
      color: 'red',
      'background-color': 'blue'
    },
    baseStyle: {
      fontSize: '60px'
    }
  }
})