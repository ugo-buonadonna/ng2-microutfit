/**
 * Created by ugo on 09/11/16.
 */
export interface User {

    firstName: string;
    email: string;
    lastName?: string;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    measures?: any;
    bodyType?: string[];
    occupation?: string;
    token?: string;

    /*
     private firstName: string;
     private email: string;
     public lastName?: string;
     public age?: number;
     public gender?: string;
     public height?: number;
     public weight?: number;
     public measures?: any;
     public bodyType?: string[];
     public occupation?: string;
     private token?: string;



     constructor(user: User) {
     ({firstName: this.firstName ,
     email: this.email,
     lastName: this.lastName,
     age: this.age,
     height: this.height,
     weight: this.weight,
     measures: this.measures,
     bodyType: this.bodyType,
     occupation: this.occupation,
     token: this.token
     } = user);
     }

     */
}
