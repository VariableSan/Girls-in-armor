/* ==================== LIBRARIES, MIDDLEWARES START ==================== */
import express from 'express'
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors'
import morgan from 'morgan'
import passport from 'passport'
import helmet from 'helmet'
import dotenv from 'dotenv'
/* ==================== LIBRARIES, MIDDLEWARES END ==================== */

/*==================== ROUTES IMPORT START ====================*/
import ListRouter from './routes/list.route'
import AuthRouter from './routes/auth.route'
import AddRouter from './routes/add.route'
import WaifuRouter from './routes/waifu.route'
import ModerateRouter from './routes/moderate.route'
/*==================== ROUTES IMPORT END ====================*/

/*==================== INIT START ====================*/
const app = express()
dotenv.config()
const { NODE_ENV, PORT, BASE_URL, DOMAIN_WHITELIST } = process.env

const isDev = NODE_ENV === 'development' ? true : false
const whitelist: string[] = DOMAIN_WHITELIST ? DOMAIN_WHITELIST.split(',') : []
whitelist.push(BASE_URL)

const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) === -1) {
      return callback(
        new Error(
          `The CORS policy for this origin doesn't allow access from the particular origin - ${origin}`
        ),
        false
      )
    }
    return callback(null, true)
  }
}
/*==================== INIT END ====================*/

/*==================== MIDDLEWARE IMPORTS START ====================*/
import { strategy } from './middleware/passport-strategy.middle'
import { startMongo } from './middleware/mongoose.middle'
/*==================== MIDDLEWARE IMPORTS END ====================*/

/* ==================== MIDDLEWARE USING START ==================== */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(isDev ? {} : corsOption))
app.use(passport.initialize())
app.use(helmet())
app.use(morgan('combined'))
/* ==================== MIDDLEWARE USING END ==================== */

/*==================== OTHERS START ====================*/
passport.use(strategy)
startMongo()
/*==================== OTHERS END ====================*/

/* ==================== ROUTES USE START ==================== */
app.use('/list', ListRouter)
app.use('/add', AddRouter)
app.use('/waifu', WaifuRouter)
app.use('/auth', AuthRouter)
app.use('/moderate', ModerateRouter)
/* ==================== ROUTES USE END ==================== */

/*==================== SERVER START ====================*/
app.set('port', PORT)
app.listen(PORT, () => {
  console.info(`server has started on port ${PORT}`)
})
/*==================== SERVER END ====================*/
