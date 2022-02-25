const express = require('express');
const { route } = require('express/lib/application');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals');

//Include other resource routers
const appointmentRouter=require('./appointments');

const {protect,authorize} = require('../middleware/auth');
const router = express.Router();

const app=express();

//Re-route into other resource routers
router.use('/:hospitalId/appointments/',appointmentRouter);

router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital);

module.exports=router;