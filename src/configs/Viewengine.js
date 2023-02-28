import express from 'express';

const configViewengine = (app) => {
    app.use(express.static('./src/public')) // cho chép người dùng truy cập vào thư mục public
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
}

export default configViewengine;