import db from "../models"

const createNewRoles = async (roles) => {
    
     // create a new role
     try {


        let currentRoles = await db.Role.findAll({
            atrributes: ['url', 'description'],
            raw: true
        })


        const persists = roles.filter(({url: url1}) => !currentRoles.some(({url: url2}) => url1 === url2))

        if(persists.length === 0){
            return {
                message: "Nothing to create ...", //Error message
                errorCode: 0, // Error code
            }
        }

        await db.Role.bulkCreate(persists);
        
        return {
            message: `Created ${persists.length} roles successfully`, //Error message
            errorCode: 0, // Error code
        }
    } catch (error) {

        console.error('Error creating role:', error);
        return {
            message: "Error from server maybe database", //Error message
            errorCode: -2, // Error code
        }
    }
}


module.exports = {createNewRoles}