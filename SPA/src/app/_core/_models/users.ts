export interface Users {
    user_Account: string;
    password: string;
    user_Name: string;
    email: string;
    phone_Number: string;
    valid_From: Date;
    valid_To: Date;
    last_Login: Date;
    update_By: string;
    update_Time: Date;
    image: string;
    roles: string[];
}