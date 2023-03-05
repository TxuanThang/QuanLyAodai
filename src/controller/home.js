import pool from "../configs/ConnectDB.js";
import multer from "multer";


export const gethome = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `products`'); // để dùng await thì cần dùng async
    return res.render('sever.ejs', { dataProducts: rows });
}
export const getDetailPage = async (req, res) => {
    const id = req.params.ProductID; // biến lấy ID của sản phẩm trong DB
    const [products] = await pool.execute('SELECT * FROM `products` WHERE `ProductID` =?' , [id])
    return res.render('DetailProducts.ejs', { data: products });

}
export const AddProducts = (req, res) => {
    return res.render('AddProducts.ejs');
}
export const CreateProduct = async (req, res) => {
    let {NameProduct,Image,Price,Description} = req.body;
    await pool.execute("insert into products(NameProduct,Image,Price,Description) values (?,?,?,?)", [NameProduct, Image, Price,Description])
    return res.redirect('/'); // dùng để trả về theo đường dẫn
}

export const DeleteProducts = async (req, res) => {
    let ID = `${req.body.ID}` // ID được lấy từ input 
    await pool.execute('DELETE FROM `products` WHERE `ProductID` =?', [ID])
    return res.redirect('/'); 
}
export const EditProduct = async (req, res) => {
    const id = req.params.ProductID;
    const [product] = await pool.execute('SELECT * FROM `products` WHERE `ProductID` =?', [id])
    return res.render('EditProducts.ejs', { data: product });
}
export const UpdateProduct = async (req, res) => {
    let {NameProduct,Image,Price,Description,id} = req.body;
    await pool.execute("update products set NameProduct=?,Image=?,Price=?,Description=? where ProductID=?", [NameProduct, Image, Price,Description,id])
    return res.redirect('/');
}
export const Uploadfile = async (req, res) => {
    return res.render('Upload.ejs')
}

// const upload = multer().single('upload');  // upload biết đang dùng multer và nói cho nó 1 cái tên

// const upload_mutiple = multer().array('uploads', 4);
export const Uploadsingle = async (req, res) => {
    // 'upload' nó sẽ map với tên của ô input ở uploadfile
  //  upload(req, res, function(err) {
        // req.file dùng để chưa thông tin file đã tải lên
        // req.body chưa thông tin bất kì của văn nếu có

        if (req.fileValidationError) {
            return res.send("Chỉ được upload File ảnh <a href='./uploadfile'>Upload another image</a>");
        }
        // nếu không gửi file nó sẽ báo lỗi
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // nếu có lỗi của thư viện multer thì nó sẽ gửi luôn lỗi của thư viện
        // else if (err instanceof multer.MulterError) {
        //     return res.send(err);
        // }
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="100"><hr /><a href="./uploadfile">Upload another image</a>`);
  //  });
}

export const Uploadmutiple = async (req, res) =>{
   // upload_mutiple(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        if (req.fileValidationError) {
            return res.send("Chỉ được upload File ảnh <a href='./uploadfile'>Upload another image</a>");
        }
        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;
        
        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/img/${files[index].filename}" width="100" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./uploadfile">Upload more images</a>';
        res.send(result);
  //  });

}
export default { gethome, getDetailPage, AddProducts, CreateProduct,DeleteProducts, EditProduct, UpdateProduct, Uploadfile, Uploadsingle, Uploadmutiple };
// 