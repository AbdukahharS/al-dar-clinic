// Define action types
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR'
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'

// Action creators
export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
})

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
})
