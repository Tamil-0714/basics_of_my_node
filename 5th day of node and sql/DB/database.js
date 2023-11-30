const mysql = require("mysql2");
function connectDB() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "tamil",
    password: "For_My_196",
    database: "Users",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool.promise();
}
async function queryDB(query) {
  try {
    const connection = await connectDB();
    const [rows, fields] = await connection.query(query);
    connection.releaseConnection();
    return rows;
  } catch (error) {
    throw error;
  }
}
async function fetchUsers() {
  try {
    const result = await queryDB("select * from login");
    console.log(result[0].userName);
    console.log(result[0].password);
    // return { UserName: result[0].userName, password: result[0].password };
  } catch (error) {
    throw error;
  }
}
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("connected");
//   return true;
// });
module.exports = {
  fetchUsers,
};
