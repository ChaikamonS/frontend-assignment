export default class SummaryModel {
    male?: number
    female?: number
    ageRange?: string
    hair?: object
    addressUser?: object

    constructor(
        hair?: object,
        addressUser?: object,
        male?: number,
        female?: number,
        ageRange?: string
    ) {
        this.hair = hair
        this.addressUser = addressUser
        this.male = male
        this.female = female
        this.ageRange = ageRange
    }
}