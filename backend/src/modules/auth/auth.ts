import { AuthRegister } from "@schemas/index";

export const CoreAuthModule = {
    
    register:async({email,password,name}:AuthRegister)=>{
        // Registration logic here
        const userExists = await CoreUserModule.exists({ email });
        if (userExists) {
            throw new Error("User already exists");
        }
        // Create user
    }
}