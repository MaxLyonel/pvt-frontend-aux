
export default function ({ store, route, redirect, req, res, isClient, isServer }) {
    const destination = route.path
    if (store.state.isAuthenticated) {
        if (destination === '/') {
            redirect('/PageChangeModuleRol')
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


