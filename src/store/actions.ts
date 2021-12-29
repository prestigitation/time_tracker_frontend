const actions = {
    auth(store: any, user: any) {
        store.commit('set_user', user)
    }
}

export {actions}