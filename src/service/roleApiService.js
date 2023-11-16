import db from "../models"

const createNewRoles = async (roles) => {
    
     // create a new role ...
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


const getAllRole = async () => {

    try {
        const roleList = await db.Role.findAll();
        if(roleList) {
            return {
                message: "Get all role successfully!!",
                errorCode: 0,
                roleList: roleList
            }; 
        }else {
            return {
                message: "Get all role successfully!!",
                errorCode: 0,
                roleList: []
            }; 
        }

    } catch (error) {
        console.log("Error when get role: ", error);
        return {
            message: "Error when get role!!",
            errorCode: 1,
            roleList: []
        }; 
    }
    

}

const deleteRole = async (id) => {
    
    try {
         // Find the user by ID
         const Role = await db.Role.findByPk(id);

         if (!Role) {
             return {
                message: "Role not exit",
                errorCode: 2,
            }; 
         }else {
             // Delete the Role
             await Role.destroy();
             console.log('Role was deleted successfully');
             return {
                message: "Delete Role successfully!!",
                errorCode: 0,
            }; 
         }
 

    } catch (error) {

        console.log("Error when delete Role: ", error);
        return {
            message: "Error when delete Role!!",
            errorCode: 1,
        }; 
    }

}

module.exports = {createNewRoles, getAllRole, deleteRole}