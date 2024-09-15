export interface IUserBasicInfo {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface IGeo {
    lat: string;
    lng: string;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IUserContactInfo {
    phone: string;
    website: string;
}

export interface IUser extends IUserBasicInfo, IUserContactInfo {
    address: IAddress;
    company: ICompany;
}
