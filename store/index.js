import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
import user from './modules/user'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home,
    user
  },
  actions: {
    async nuxtServerInit({
      commit
    }, {
      app
    }) {
      const {
        status,
        data: {
          province,
          city
        }
      } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', status === 200 ? {
        city: '北京市',
        province: '北京直辖市'
      } : {
        city: '',
        province: ''
      })
      const {
        status: status2,
        data: {
          menu
        }
      } = await app.$axios.get('geo/menu')
      commit('home/setMenu', status2 === 200 ? menu : [])
      const {
        status: status3,
        data: {
          result
        }
      } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status3 === 200 ? result : [])
      const {
        status: status4,
        data: {
          user
        }
      } = await app.$axios.get('/users/getUser')
      commit('user/setUser', status4 === 200 ? decodeURIComponent(user) : '')
    }
  }
})

export default store
