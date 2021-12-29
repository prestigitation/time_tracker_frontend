interface IAuth {
    email: string,
    password: string
}
interface ILogin extends IAuth {}
interface IRegister extends IAuth {
    login: string
}
export { ILogin, IRegister }