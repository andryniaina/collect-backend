export class CreateUserDto {
    name: String|string
    email: String|string
    password: String|string
    role?: string
    phoneNumber?: string
    status?:string
    description?:string
    project?:string
}
