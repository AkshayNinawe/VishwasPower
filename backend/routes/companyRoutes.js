import express from 'express';
import { setCompanyData, setNewCompanyData, getAllCompanyData, deleteCompanyByID } from '../controller/companyController.js';

const router = express.Router();

router.post('/',setNewCompanyData)
router.post('/addCompany', setCompanyData)
router.get('/', getAllCompanyData)
router.delete('/:id', deleteCompanyByID)

export default router;
