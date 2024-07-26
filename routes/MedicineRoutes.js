const express = require('express');
const router = express.Router();
const {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  cache,
  upload
} = require('../controller/MedicineController');

router.post('/medicines', upload.single('image'), createMedicine);
router.get('/medicines', cache, getMedicines);
router.put('/medicines/:id', upload.single('image'), updateMedicine);
router.delete('/medicines/:id', deleteMedicine);

module.exports = router;
