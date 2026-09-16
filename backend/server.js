import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors({ origin: config.clientUrl }))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(config.port, () => {
  console.log(`Nuzio backend running on http://localhost:${config.port}`)
})
