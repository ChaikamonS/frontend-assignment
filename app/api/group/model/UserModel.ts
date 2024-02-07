export default class UserModel {
    firstName?: string
    lastName?: string
    age?: number
    gender?: string
    hair?: HairModel
    address?: AddressModel
    company?: CompanyModel
}

export class HairModel {
    color?: string
    type?: string
}

export class AddressModel {
    postalCode?: string
}

export class CompanyModel {
    department?: string
}