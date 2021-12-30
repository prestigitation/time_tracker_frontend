import { IState } from "@/types/store"
const mutations = {
    set_user(state: IState, user: any) {
        state.user = user
    },
    logout(state: any) {
        state.user.login = undefined
        state.user.id = undefined
    },
    change_locale(state: any, locale: string) {
        state.locale = locale
    }
}

export {mutations}