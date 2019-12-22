<template>
  <div class="page-changeCity">
    <el-row>
      <el-col>
        <iSelect />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <Hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <cateGroy />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import iSelect from '@/components/changeCity/iselect'
import Hot from '@/components/changeCity/hot'
import cateGroy from '@/components/changeCity/categroy'

export default {
  components: {
    iSelect,
    Hot,
    cateGroy
  }
}
</script>
<style lang="scss">
</style>