<template>
  <dl class="s-item">
    <dt>
      <img :src="imgs"
           :data-src='meta.img'
           alt="商品图片">
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{ meta.name }}</nuxt-link>
      </h3>
      <el-rate v-model="meta.rate"
               :colors="['#ff9900', '#ff9900', '#FF9900']"
               disabled />
      <span v-if="meta.rate>4"
            class="s-item-comment">很好</span><span v-else-if="meta.rate>3"
            class="s-item-comment">一般</span><span v-else
            class="s-item-comment">很差</span>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.type }}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.price }}起</em>
        <b>{{ meta.status }}</b>
      </p>
      <ul>
        <!-- <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li> -->
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>{{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      io: '',
      imgs: 'https://misc.360buyimg.com/mtd/pc/common/img/blank.png',
    }
  },
  mounted () {
    this.io = new IntersectionObserver(this.callback)
    let imgs = document.querySelectorAll('[data-src]');
    Array.from(imgs).forEach(item => this.io.observe(item))
  },
  methods: {
    callback (entries) {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          item.target.src = item.target.dataset.src
          this.io.unobserve(item.target)
        }
      })
    }
  }
}
</script>
