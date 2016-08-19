import express from 'express';
import r from 'rethinkdb'
import Promise from 'bluebird'
import FMApi from './api/fm'
import Maplestory from './api/maplestory'
import Character from './api/character'
import compression from 'compression'

const router = express.Router();

//Convert objects appropriately
router.use('/', async (req, res, next) => {
  res.success = (model) => {
    if(model instanceof Array)
      return res.status(200).send(model.map((entry) => entry.toJSON ? entry.toJSON() : entry ))

    res.status(200).send(model.toJSON ? model.toJSON() : model)
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  return next()
})

//Try to compress the objects, because 5Mb per request is costly
router.use(compression())

router.use('/fm', FMApi)
router.use('/maplestory', Maplestory)
router.use('/character', Character)

export default router