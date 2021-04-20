

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  user: state => state.user.user,
  addRouter: state => state.user.addRouter,
  allRouter: state => state.user.allRouter
}
export default getters
