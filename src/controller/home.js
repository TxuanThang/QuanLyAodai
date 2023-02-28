import pool from "../configs/ConnectDB.js";
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
export default { gethome, getDetailPage, AddProducts, CreateProduct,DeleteProducts, EditProduct, UpdateProduct };
// 