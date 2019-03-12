import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home';
import Search from '@/views/Search';
import Property from '@/views/Property';
// import Login from '@/views/Login';
// import Map_ from '@/views/Map';

// import Home from '@/components/Home';
import All from '@/components/All';
import Filter from '@/components/Filter';
import New from '@/components/New';

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Home,
			children: [
				{
					path: '',
					redirect: { path: '/f' },
				},
				{
					path: 'p',
					name: 'all',
					component: All,
				},
				{
					path: 'f',
					name: 'filter',
					component: Filter
				},
				{
					path: 'new',
					name: 'new',
					component: New,
					meta: {
						requiresAuth: true
					}
				},
			]
		},
		{
			path: '/s',
			name: 'search',
			component: Search
		},
		{
			path: '/login',
			name: 'login',
			component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue')
		},
		{
			path: '/property/:id',
			name: 'property',
			component: Property
		},
		{
			path: '/gallery/:id',
			name: 'gallery',
			// component: Property,
			component: () => import(/* webpackChunkName: "gallery" */ './views/Gallery.vue')
		},
		{
			path: '/map',
			name: 'map',
			component: () => import(/* webpackChunkName: "map" */ './views/Map.vue')
			// component: Map_
		}
	// {
	//   path: '/about',
	//   name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	// }
	]
})
