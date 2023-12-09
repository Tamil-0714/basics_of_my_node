const mysql = require("mysql2");
function connectDB() {
  const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool.promise();
}
async function queryDB(query,value) {
  try {
    const connection = await connectDB();
    const [rows] = await connection.query(query,value);
    connection.releaseConnection();
    return rows;
  } catch (error) {
    throw error;
  }
}
async function fetchUsers(userName) {
  try {
    const result = await queryDB('select * from login where userName = ?',[userName]);
    // console.log(result[0].userName);
    // console.log(result[0].password);
    // return { UserName: result[0].userName, password: result[0].password };
    return result;

  } catch (error) {
    throw error;
  }
}
async function insertUsers(name, userName, password) {
  try {
    const connection = await connectDB();
    const query = "insert into login values(?, ?, ?)";
    const values = [name, userName, password];
    const [result] = await connection.execute(query,values);
    connection.releaseConnection();
    return result;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      // Handle duplicate entry error
      console.error('Duplicate entry error:', error.sqlMessage);
      return {msg:"ER_DUP_ENTRY"}
      // You can choose to log, notify the user, or handle it as needed
    } else {
      console.error('Error inserting values:', error.message);
      throw error;
    }
  }
}
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("connected");
//   return true;
// });
module.exports = {
  fetchUsers,
  insertUsers,
};
