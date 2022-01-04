
export default function ({ store, route, redirect, req, res, isClient, isServer }) {
    const destination = route.path
    if (store.state.isAuthenticated) {
        if (destination === '/') {
            redirect('/changeModuleRol')
        } else {
            return
        }
    } else {
        if (destination === '/') {
            return
        } else {
            redirect("/")
        }
    }
}


