const app = require('./src/app')
const connectTodb = require('./src/db/db')
const PORT = process.env.PORT || 3000;

// connectTodb();
// app.listen(PORT,()=>{
//     console.log(`server is running ${PORT}`)
// })

const startServer = async () => {
  try {
    await connectTodb(); // ✅ Wait for DB connection
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Database connection failed:", error.message);
  }
};
startServer();
