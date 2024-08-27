const db = require('../db')

module.exports.getAllUsers = async () => {
    const [records] = await db.query("SELECT * FROM user_tbl")
        .catch(err => console.log(err))
    return records;    
}

module.exports.getUserById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM user_tbl WHERE id = ?", [id])
    return record;    
}

module.exports.deleteUser = async (id) => {
    const [{affectedRows}] = await db.query("DELETE FROM user_tbl WHERE id = ?", [id])
    return affectedRows;    
}

module.exports.addOrEditUser = async (obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL user_add_or_edit(?, ?, ?, ?, ?, ?, ?)", [id, obj.name, obj.Password, obj.contacts, obj.age, obj.isActive, obj.CreatedAt])
    return affectedRows;    
}