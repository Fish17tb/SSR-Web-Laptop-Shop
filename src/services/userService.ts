import getConnection from "../config/database";

const getListUserService = async () => {
  console.log("get-data success");
  const connection = await getConnection();
  try {
    const [result, fields] = await connection.query("SELECT * FROM users");
    return result;
  } catch (err) {
    return [];
  }
};

const handleCreateUserService = async (
  name: string,
  email: string,
  address: string
) => {
  const connection = await getConnection();
  try {
    const [result, fields] = await connection.query(
      `INSERT INTO Users (name, email, address) VALUES (?, ?, ?)`,
      [email, name, address]
    );
    return result;
  } catch (err) {
    return [];
  }
};

const handleDeleteUserService = async (id: string) => {
  const connection = await getConnection();
  try {
    const [result, fields] = await connection.query(
      `DELETE FROM Users WHERE id= ?`,
      [id]
    );
    return result;
  } catch (err) {
    return [];
  }
};

const getPageDetailUserService = async (id: string) => {
  const connection = await getConnection();
  try {
    const [result, fields] = await connection.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return result[0] || null;
  } catch (err) {
    return [];
  }
};

const handleUpdateUserService = async (
  id: string,
  name: string,
  email: string,
  address: string
) => {
  const connection = await getConnection();
  try {
    const [result, fields] = await connection.query(
      `UPDATE users
         SET name = ?, email= ?, address= ?
         WHERE id = ?`,
      [name, email, address, id]
    );
    return result;
  } catch (err) {
    return [];
  }
};

export {
  handleCreateUserService,
  getListUserService,
  handleDeleteUserService,
  getPageDetailUserService,
  handleUpdateUserService,
};
