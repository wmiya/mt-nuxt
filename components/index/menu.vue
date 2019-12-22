<template>
  <div class="m-menu">
    <dl class="nav"
        @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,idx) in $store.state.home.menu"
          :key="idx"
          @mouseenter="mouseenter">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div class="detail"
         v-if="kind"
         @mouseleave="leave"
         @mouseenter='enter'>
      <template v-for="(item,index) in curdetail.child">
        <h4 :key="index">{{item.title}}</h4>
        <nuxt-link v-for="(items,index) in item.child"
                   :key="index.title"
                   :to="{path:'products',query:{keyword:items}}">{{items}}</nuxt-link>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      kind: '',
      timer: ''
    }
  },
  computed: {
    curdetail: function () {
      return this.$store.state.home.menu.filter(key => key.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave: function () {
      let self = this;
      this.timer = setTimeout(function () {
        self.kind = ''
      }, 150)
    },
    mouseenter: function (e) {
      this.kind = e.target.querySelector('i').className
    },
    leave: function () {
      this.kind = ''
    },
    enter: function () {
      clearTimeout(this.timer)
    }
  }
};
</script>
<style lang="scss">
</style>