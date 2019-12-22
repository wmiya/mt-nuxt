<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue"
               placeholder="省份">
      <el-option v-for="item in province"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue"
               :disabled="!city.length"
               placeholder="省份">
      <el-option v-for="item in city"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <span class="name">直接搜索：</span>
    <el-autocomplete v-model="input"
                     :fetch-suggestions="querySearchAsync"
                     placeholder="请输入内容"
                     @select="handleSelect"></el-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  data () {
    return {
      pvalue: '',
      province: [],
      cvalue: '',
      city: [],
      input: '',
      cities: []
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      let self = this;
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        if (!query.length) return
        let { status, data: { city } } = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map(item => {            return {
              value: item.name
            }          })
          cb(self.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect: function (item) {
      window.location.href = `https://bj.meituan.com`
    },
    getProvince: async function () {
      let { status, data: { province } } = await this.$axios.get('/geo/province')
      if (status === 200) {
        this.province = province.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    }
  },
  mounted () {
    this.getProvince()
  },
  watch: {
    pvalue: async function (newVal) {
      if (newVal) {
        let { status, data: { city } } = await this.$axios.get(`/geo/province/${newVal}`)
        if (status === 200) {
          this.city = city.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
        } else {
          this.city = []
        }

      }
    }
  },
}
</script>
<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>