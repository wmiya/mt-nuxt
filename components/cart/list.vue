<template>
  <el-table :data="cartData"
            style="width: 100%">
    <el-table-column label="项目"
                     prop="name">
    </el-table-column>
    <el-table-column label="单价"
                     prop="price">
    </el-table-column>
    <el-table-column label="数量">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count"
                         :min="1" />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <div>{{scope.row.count*scope.row.price}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    cartData: Array
  }
}
</script>
<style lang="scss">
</style>