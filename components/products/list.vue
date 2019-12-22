<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="(item,index) in nav"
          :key="item.name"
          :class="[item.name,item.acitve?'s-nav-active':'']"
          @click="navSelect(item,index)">{{ item.txt }}</dd>
    </dl>
    <ul v-if='newList.length'>
      <Item v-for="(item,idx) in newList"
            :key="idx"
            :meta="item"
            :location='item.location' />
    </ul>
    <p v-else
       align='center'>暂无数据</p>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ],
      newList: [],
      proxy: ''
    }
  },
  created () {
    this.newList = this.list
  },
  mounted () {
    let arr = this.newList
    Object.freeze(arr)
    this.proxy = new Proxy({}, {
      get (target, val) {
        if (val === 'price') {
          return [].concat(arr).sort((a, b) => a.price - b.price)
        } else if (val === 'comment') {
          return [].concat(arr).sort((a, b) => b.comment - a.comment)
        } else {
          return arr
        }
      },
      set () {
        return false
      }
    })
  },
  methods: {
    navSelect: function (ctx, index) {
      let self = this
      this.nav.forEach(item => item.acitve = false)
      this.nav[index].acitve = true
      switch (ctx.name) {
        case 's-price':
          this.newList = this.proxy.price
          break
        case 's-visit':
          this.newList = this.proxy.comment
          break
        case 's-comment':
          this.newList = this.proxy.comment
          break
        default:
          this.newList = this.proxy.default
      }
    }
  }
}
</script>
