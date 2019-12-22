<template>
  <div class="slide">
    <el-carousel height="240px">
      <el-carousel-item v-for="item in list"
                        :key="item.img">
        <nuxt-link :to="{path:'products',query:{keyword:item.keyword }}"><img :src="item.img"></nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [{
        url: '#abc',
        img: 'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg',
        keyword: '酒店'
      }, {
        url: '#bsbsb',
        img: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
        keyword: '美食'
      }, {
        url: '#sjfkajfj',
        img: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
        keyword: '外卖'
      }, {
        url: '#sjfkajfja',
        img: 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg',
        keyword: '电影'
      }]
    }
  }
}
</script>
<style lang="scss">
</style>