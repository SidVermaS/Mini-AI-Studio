import { prismaPg } from "@config/db";
import { Email } from "@interfaces/index";

export const CoreUserModule = {
    exists: async (email: Email) => {
        // Check if user exists logic here
        const user = await prismaPg.user.count({
            
            where: { email },
        });
        return user > 0;
    }
}