import { IState } from "@/types/store"
const getters = {
    get_user(state: IState) {
        return state.user
    },
    get_locale(state: any) {
        return state.locale
    }
}

export {getters}