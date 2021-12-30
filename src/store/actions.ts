const actions = {
    auth(store: any, user: any) {
        store.commit('set_user', user)
    },
    logout(store: any) {
        store.commit('logout')
    },
    change_locale(store: any, locale: string) {
        store.commit('change_locale', locale)
    }
}

export {actions}