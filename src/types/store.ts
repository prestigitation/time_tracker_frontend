interface IState {
    user: {
        id: undefined | number,
        login: undefined | string,
    },
    locale: string | undefined
}

interface IStore {
    getters: object,
    state: IState,
    actions: object,
    mutations: object,
}

export { IState, IStore }