import express from 'express';
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';
import {gethome} from '../controller/home.js';
import {getDetailPage} from '../controller/home.js';
import { AddProducts } from '../controller/home.js';
import {CreateProduct} from '../controller/home.js';
import {DeleteProducts} from '../controller/home.js';
import {EditProduct} from '../controller/home.js';
import {UpdateProduct} from '../controller/home.js';
import {Uploadfile} from '../controller/home.js';
import {Uploadsingle} from '../controller/home.js';
// var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({         // dùng để cho nó biết nó lưu file ở đâu
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/img/');
    },

    //  dùng để lấy tên ảnh +  thời gian hiện tại dưới dạng string + đường dẫn nơi lưu trữ
    filename: function(req, file, cb) {
        cb(null, 'Anhmoi' + '-' + Date.now() + path.extname(file.originalname));
    }
});
    
const imageFilter = function(req, file, cb) { //Khi truyền vào ta có 1 requets, 1 file and 1 callback
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) { // định dạng kiểu file image
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false); // khi có lỗi sẽ truyền vào cái lỗi là Error và truyền vào giá trị false
    }
    cb(null, true); // không có lỗi nó sẽ truyền vào null và true
};

let upload = multer({ storage: storage, fileFilter: imageFilter }).single('upload'); // storage đã được định nghĩ ở trên, single định nghĩ chỉ upload 1 file

const initRoute = (app) => {
    router.get('/', gethome);
    router.get('/Products/detail/:ProductID', getDetailPage); // router parameters sử dụng để nắm bắt các giá trị được chỉ định tại vị trí của chúng trong URL
    router.get('/AddProducts', AddProducts);
    router.get('/EditProduct/:ProductID', EditProduct);
    router.post('/deleteProduct', DeleteProducts);  
    router.post('/UpdateProduct', UpdateProduct);
    router.post('/createProduct', CreateProduct);
    // upload file
    router.get('/uploadfile', Uploadfile);
    router.post('/Uploadsingle',upload,Uploadsingle)
    return app.use('/', router) // tham số đầu là tiền tố ví dụ có thể dùng: /abc
}
export default initRoute;
