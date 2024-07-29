const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const getAllArticle = async (req, res) => {
  const { first = 10, after } = req.query; 

  try {
    let cursor = after ? { id: { gt: parseInt(after) } } : undefined; 

    const articles = await prisma.article.findMany({
      take: first, 
      cursor, 
      orderBy: { id: 'asc' }, 
    });
    const hasNextPage = articles.length === first;
    res.json({
      articles,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching articles." });
  }
};


const createNewArticle = async (req, res) => {
  const { title, contents, createdBy } = req.body;
  await prisma.article.create({ data: {
    title,
    contents,
    createdByUserId: createdBy
  }})
  res.status(204).send({ message: "created success"})
}

const getArticleById = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    }); 
    if (foundArticle) { console.log("Articles: ",foundArticle);
      res.status(200).json(foundArticle);
    } else
      res.status(404).json({ message: "Article not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", code: 10000 });
  }
};


const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, contents, createdBy } = req.body;

  try {
    const updateArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title,
        contents,
        createdByUserId: createdBy
      },
    });

    if (updateArticle) {
      res.status(200).json({ message: "Article updated successfully!", article: updateArticle });
    } else {
      res.status(404).json({ message: "Article with the provided ID not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating article." });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({ where: { id: parseInt(id) }});
  res.status(204).send({ message: "Article have been deleted" });
};



module.exports = {
  getAllArticle,
  createNewArticle,
  getArticleById,
  updateArticle,
  deleteArticle
}