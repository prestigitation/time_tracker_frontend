interface IAuth {
    email: string,
    password: string
}
interface ILogin extends IAuth {}
interface IRegister extends IAuth {
    login: string
}
declare interface IUserData {
    login: string | undefined,
    id: number | undefined
}
export { ILogin, IRegister, IUserData }