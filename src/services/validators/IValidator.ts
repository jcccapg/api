export default interface IValidator<T> {
    validar(data : T) : boolean
}