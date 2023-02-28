import express from 'express';
import { getAllProducts } from '../controller/apiController.js';
import { createProduct } from '../controller/apiController.js';
import { updateProduct } from '../controller/apiController.js';
import { deleteProducts } from '../controller/apiController.js';

let router = express.Router();
const initAPIRoute = (app) => {
    router.get('/products', getAllProducts ); // Method GET -> READ DATA
    router.post('/createproducts', createProduct ); // Method GET -> READ DATA
    router.put('/updateproducts', updateProduct)// với API thì ta phải dùng đúng phương thức cho từng chức năng get, post, delete, put
    router.delete('/delete/:ProductID', deleteProducts)
    return app.use('/api/v1/', router) // tham số đầu là tiền tố ví dụ có thể dùng: /abc
}
export default initAPIRoute;
