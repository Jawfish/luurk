import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		posts: {
			home: [],
			hot: [],
			top: [],
			rising: [],
			new: [],
		},
		subreddit: '',
	},
	getters: {
		posts: state => {
			return state.posts
		},
		subreddit: state => {
			return state.subreddit
		},
	},
	mutations: {
		ADD_POST(state, payload) {
			state.posts[payload.page].push(payload.post)
		},
		UNLOAD_POSTS(state, page) {
			state.posts[page] = []
		},
		SET_SUBREDDIT(state, subreddit) {
			state.subreddit = subreddit
		},
	},
	actions: {
		unloadPosts: ({ commit }, page) => {
			commit('UNLOAD_POSTS', page)
		},
		populatePosts: ({ commit }, payload) => {
			fetch(payload.query)
				.then(response => response.json())
				.then(data =>
					data.data.children.forEach(child =>
						commit('ADD_POST', {
							post: child.data,
							page: payload.page,
						})
					)
				)
		},
		setSubreddit: ({ commit }, subreddit) => {
			commit('SET_SUBREDDIT', subreddit)
		},
	},
})
