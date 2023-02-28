import express from 'express';
import {gethome} from '../controller/home.js';
import {getDetailPage} from '../controller/home.js';
import { AddProducts } from '../controller/home.js';
import {CreateProduct} from '../controller/home.js';
import {DeleteProducts} from '../controller/home.js';
import {EditProduct} from '../controller/home.js';
import {UpdateProduct} from '../controller/home.js';

let router = express.Router();
const initRoute = (app) => {
    router.get('/', gethome);
    router.get('/Products/detail/:ProductID', getDetailPage); // router parameters sử dụng để nắm bắt các giá trị được chỉ định tại vị trí của chúng trong URL
    router.get('/AddProducts', AddProducts);
    router.get('/EditProduct/:ProductID', EditProduct);
    router.post('/deleteProduct', DeleteProducts);  
    router.post('/UpdateProduct', UpdateProduct);
    router.post('/createProduct', CreateProduct);
    return app.use('/', router) // tham số đầu là tiền tố ví dụ có thể dùng: /abc
}
export default initRoute;
