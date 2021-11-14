const app = require("express")();

const PORT = process.env.PORT || 3000;

//Routes

app.listen(PORT, () => {
  console.log(`Serving at port ${PORT}`);
});
