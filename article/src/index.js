const express = require("express");
const morgan = require("morgan")
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { pageNotFoundMiddleware, endPointNotFoundMiddleware } = require("./middlewares/notFoundMiddleWare");
const errorMiddleWare = require("./middlewares/errorMiddleWare");
const interceptMiddleWare = require("./middlewares/interceptMiddleWare");
const articleRoutes = require("./routes/articleRoutes");

// dotenv.config({ path: __dirname + "/../.env" });
dotenv.config();

const webapp = express();
webapp.use(morgan("common"))
webapp.use("/public", express.static("src/assets"));

webapp.use(express.json());
// webapp.use(express.urlencoded())

webapp.post("/", (req, res)=> {
  res.send(req.body)
})

webapp.get("/", interceptMiddleWare, (req, res) => {
  console.log("Handling req");
  // for(let i =0; i< 5_000_000_000; i++);
  res.send(
    `
    <h1 style='color: red'>
    
      <form method="POST" >
        <input name="email" />
         <input type="submit" />
      </form>
    
    
    </h1>
    
    
    `
  );
});

webapp.use("/api", userRoutes);
webapp.use("/api", articleRoutes);

webapp.use("/api", endPointNotFoundMiddleware)
webapp.use("/api", errorMiddleWare)

webapp.use("/", pageNotFoundMiddleware)


webapp.listen(process.env.PORT, () => {
  console.log(`Running on: http:/localhost:${process.env.PORT}`);
});
