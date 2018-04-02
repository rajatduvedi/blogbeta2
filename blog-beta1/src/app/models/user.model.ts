
export const possibleUserRoles = [
    { id: 'author', text: 'Author' },
    { id: 'normalUser', text: 'User' },
    { id: 'typer', text: 'Typer' },
    { id: 'viewer', text: 'Viewer'}
];

export const possibleAdminRoles = [
    { id: 'publisher', text: 'Publisher' },
    { id: 'admin', text: 'Admin' },
    { id: 'superAdmin', text: 'Super Admin' }
];



/* Users come in 3 flavors
Small -- bare minimum info needed for cards, login ActionSheetController.
regular -- basic profile like email id and phone number
large -- detailed profile like, address , and other UserDetailsPage.
*/

export interface IUser {
    _id?: string; // database ID
    token: string;
    name: string; // user profile name displayed on the blog etc. can be edited on profile page
    roles?: string[];
    identificationId: string,
    email?: string;
    phone?: string;
    imageUrl: any;
    authorDoc: string[];
    register_type:string;
    status?: string; // active, inactive , suspended etc.


}

export class User implements IUser {
    _id?: string; // database ID
    token: string;
    name: string;
    roles?: string[];
    email?: string;
    phone?: string;
    imageUrl: any;
    identificationId: string;
    register_type:string;
    authorDoc: string[];
    status?: string; // active, inactive , suspended etc.
    constructor() {
    }
}

export interface IAddress {
    streetAddressLine1: string;
    streetAddressLine2?: string;
    apartmentNumber?: string;
    countyOrDistrict?: string;
    stateOrProvince: string;
    zipcode1: string;
    zipcode2?: string;
    country: string;
}
