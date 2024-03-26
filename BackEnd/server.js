import express from 'express'
import 'colors'
import userRoutes from './routes/userRoute.js'
import postRoutes from './routes/postRoute.js'
import eventRoutes from './routes/eventRoute.js'
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/event', eventRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to myMongoDB application.'.green })
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
 try {
  console.log(`Server is running on port ${PORT}. `.bgYellow)
 } catch (error) {
  console.log(`Server cannot Connect. `.bgRed)
  process.exit()
 }
})