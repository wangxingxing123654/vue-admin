import App from './App.vue';
import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import login from "./admin/account/login.vue";
import layout from './admin/layout.vue';
import goodlist from "./admin/goods/goodlist.vue";
import goodadd from "./admin/goods/goodadd.vue";
import goodedit from "./admin/goods/goodedit.vue";
import category from "./admin/goods/categorylist.vue";
import order from "./admin/order/order.vue";
import Element from "element-ui";
import '../../statics/css/theme_rms/index.css';
import '../../statics/css/site.css';

//设置axios
axios.defaults.baseURL = 'http://157.122.54.189:9095';
axios.defaults.withCredentials=true;
//全局应用就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;
// 设置路由
import vueRouter from 'vue-router';
//配置路由
var routes = [{
    name: 'default',
    path: '/',
    redirect: '/admin'
}, {
    name: 'login',
    path: '/login',
    component: login
}, {
    name: 'admin',
    path: '/admin',
    component: layout,
    children: [{
        name: 'goodlist',
        path: 'goodlist',
        component: goodlist,
        meta:{menuno:'1-1', ischangemenu:true}
    }, {
        name: 'category',
        path: 'category',
        component: category,
        meta:{menuno:'1-2', ischangemenu:true}
    }, {
        name: 'order',
        path: 'order',
        component: order
    },{
        name: 'add',
        path: 'goodadd',
        component: goodadd
    },{
        name: 'edit',
        path: 'goodedit/:id',
        component: goodedit
    }

    ]
}];
const router = new vueRouter({ routes })

//绑定到vue上。
Vue.use(vueRouter);
Vue.use(Element);
Vue.use(axios);
Vue.use(Vuex);

//配置store.
const state={
    menuid:'1-1'
};
const mutations={
    changeMenuId(state,newMenuId){
        state.menuid=newMenuId;
    }
};
const actions={
    changeMenuId({commit},newMenuId){
        commit('changeMenuId',newMenuId)
    }
}

const store=new Vuex.Store({
    state,mutations,actions
})
var vm=new Vue({
    el: "#app",
    router: router,
    store,
    render: h => h(App)
})



//全局拦截

window.store=store;
router.beforeEach((to,from,next)=>{
   

    console.log(to);

  
    
    if(to.meta.ischangemenu){
        store.dispatch('changeMenuId',to.meta.menuno);
    }
    if(to.name=='login'){
        next();
    }else{
        axios.get('/admin/account/islogin').then(res=>{
            if(res.data.code=='logined'){
                next();


            }else {
                console.log(1);
                router.push({name:'login'})
            }
        })
    }


})