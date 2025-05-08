import getConnection from "../config/database";

const getListUserService = async () => {
  console.log("get-data success");
  const connection = await getConnection();
  try {
    const [results, fields] = await connection.query("SELECT * FROM users");
    return results;
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
    const [results, fields] = await connection.query(
      `INSERT INTO Users (name, email, address) VALUES (?, ?, ?)`,
      [email, name, address]
    );
    return results;
  } catch (err) {
    return [];
  }
};

export { handleCreateUserService, getListUserService };
