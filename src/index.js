import express from 'express';
import path from 'path'; // dùng để nối các đường dẫn vào với nhau
import { fileURLToPath } from 'url';
import configViewengine from './configs/Viewengine.js';
import initRoute from './router/web.js';
import initAPIRoute from './router/api.js';
import * as dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000; // || 3000 sẽ chạy nếu không chạy được .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// sử dụng để phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')))

// hỗ trợ lấy dữ liệu từ client lên server được nhập dữ liệu từ form và để có thể sử dụng phương thức post
app.use(express.urlencoded({extended: true})); 
app.use(express.json())

// thiết lập viewengine
configViewengine(app);
// thiết lập router
initRoute(app);
// thiết lập router api
initAPIRoute(app);


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})