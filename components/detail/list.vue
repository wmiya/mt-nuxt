<template lang="html">
  <div class="m-detail-list">
    <ul>
      <li>{{ list.filter(item=>item.photos.length).length }}款套餐</li>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './item.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
}
</script>
