const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const { first = 10, after } = req.query; 

  try {
    let cursor = after ? { id: { gt: parseInt(after) } } : undefined; 

    const users = await prisma.user.findMany({
      take: first, 
      cursor, 
      orderBy: { id: 'asc' }, 
    });
    const hasNextPage = users.length === first;
    res.json({
      users,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users." });
  }
};

const createNewUser = async (req, res) => {

  const { username, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password, 
      },
    });
    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { articles: true} 
    });
    if (foundUser) {
      new Response(res).setResponse(foundUser).send();
    } else
      new Response(res).setStatusCode(404).setMessage("User not found").send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username,
        password, 
      },
    });

    if (updatedUser) {
      res.status(200).json({ message: "User updated successfully!", user: updatedUser });
    } else {
      res.status(404).json({ message: "User with the provided ID not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user." });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: parseInt(id) }});
  res.status(204).send({ message: "User have been deleted" });
};

module.exports = {
  getAllUser,
  createNewUser,
  getUserById,
  deleteUser,
  updateUser
};
// export default userRoutes;
