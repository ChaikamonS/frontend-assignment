export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

export default class UsersResModel {
    users?: Array<UserModel>

    constructor(list: Array<UserModel>) {
        this.users = list
    }

    private findDistinctValues<T>(arr: T[]): T[] {
        return Array.from(new Set(arr));
    }

    private getHair(users: Array<UserModel>) {
        let hairList: Array<string> = []

        users.map((user) => {
            if (user.hair?.color) {
                hairList.push(user.hair.color)
            }
        })

        return [this.findDistinctValues(hairList), hairList]
    }

    private getAddressUser(users: Array<UserModel>) {
        const obj: { [key: string]: any } = {};

        users.forEach(user => {
            const key = `${user.firstName}${user.lastName}`
            obj[key] = user.address?.postalCode;
        });

        return obj
    }

    getDepartment() {
        let departmentList: Array<string> = []

        this.users?.map((user) => {
            if (user.company?.department) {
                departmentList.push(user.company.department)
            }
        })

        return this.findDistinctValues(departmentList)
    }

    getUsersByDepartment(department: string) {
        return this.users?.filter((user) => user.company?.department == department)
    }

    getHairSummaryByDepartment(department: string) {
        const obj: { [key: string]: any } = {};

        const usersFiler = this.getUsersByDepartment(department)
        const [distinctHair, hairList] = this.getHair(usersFiler ?? [])

        distinctHair.forEach(key => {
            obj[key] = hairList.filter(color => color == key).length;
        });

        return obj
    }

    getAddressSummaryByDepartment(department: string) {
        const usersFiler = this.getUsersByDepartment(department)
        return this.getAddressUser(usersFiler ?? [])
    }

    genderCountByDepartment(department: string, gender: Gender) {
        const usersFiler = this.getUsersByDepartment(department)
        return usersFiler?.filter(user => user.gender == gender.valueOf()).length ?? 0
    }

    ageRangeByDepartment(department: string) {
        let ageList: Array<number> = []
        const usersFiler = this.getUsersByDepartment(department)
        
        usersFiler?.map((user) => {
            if (user.age) {
                ageList.push(user.age)
            }
        })

        return `${ageList.reduce((a, b) => Math.min(a, b))}-${ageList.reduce((a, b) => Math.max(a, b))}`
    }
}

export class UserModel {
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