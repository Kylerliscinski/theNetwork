import { reactive } from 'vue'
import { Profile } from "./models/Profile.js"
import { Post } from "./models/Post.js"
import { Ad } from "./models/Ad.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Post[]} */
  posts: [],

  /** @type {Ad[]} */
  ads: [],

  /** @type {Profile} */
  activeProfile: null,

  /** @type {Post[]} */
  profilePosts: [],

  searchTerm: '',

  currentPage: 1,

  totalPages: 32,

  currentProfilePage: 1,

  totalProfilePages: 3
})
