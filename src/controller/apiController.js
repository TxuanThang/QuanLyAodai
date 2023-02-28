
import pool from "../configs/ConnectDB.js";
export const getAllProducts = async (req ,res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `products`');
    return res.status(200).json({ // trả tra trạng thái status để biết được sever như thế nào
        Message: 'Products', // giá trị sau dấu : là giá trị trả về từ database
        data: rows
    })
}
export const createProduct = async (req ,res) =>{
    let {NameProduct,Image,Price,Description} = req.body;
   
    if(!NameProduct || !Image || !Price || !Description)
    {
        return res.status(200).json({
            message:"Not Found",
        })
    }
    await pool.execute("insert into products(NameProduct,Image,Price,Description) values (?,?,?,?)", [NameProduct, Image, Price,Description])
    return res.status(200).json({message: "successMessage"})
}
export const updateProduct = async (req, res) =>{
    let {NameProduct,Image,Price,Description,id} = req.body;
    if(!NameProduct || !Image || !Price || !Description || !id)
    {
        return res.status(200).json({
            message:"Not Found",
        })
    }
    await pool.execute("update products set NameProduct=?,Image=?,Price=?,Description=? where ProductID=?", [NameProduct, Image, Price,Description,id])
    return res.status(200).json({
        message:"Updated successfully!!!",
    })
}
export const deleteProducts = async (req, res) =>{
    // let ID = `${req.body.ID}` // ID được lấy từ input 
    let ID = req.params.ProductID
    if(!ID){
        return res.status(200).json({
            message:"Not Found",
        })
    }
    await pool.execute('DELETE FROM `products` WHERE `ProductID` =?', [ID])
    return res.status(200).json({
        message:"Deleted successfully!!!",
    })
}
export default {getAllProducts, createProduct,updateProduct,deleteProducts}