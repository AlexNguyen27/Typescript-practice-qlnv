var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // truyền đường dẫn file cần đóng gói vào entry
    entry: {
        // Tên đại diện, đường dẫn tới file, đặt tên tùy chọn
        bundle: './ts/index.ts'
    },
    // vị trí của các file đc đóng gói: đầu ra
    output: {
        // ở cùng cấp với webpack.config.js, tạo ra 1 folder dist để chứa file đóng gói
        path: path.resolve(__dirname,'dist'),
        // Tên file đc đóng gói
        // Bên trong folder dist, tạo ra 1 folder js, trong folder js sẽ có file 
        // bundle.js -> cùng tên với đầu vô
        filename:'js/[name].js'
    },

    module: {
        rules: [
            {
                // kiểm tra nếu trong fiel đóng gói có css
                test: /\.css$/,
                // sử dụng 2 loader này để đóng gói
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.ts$/,
                use:['ts-loader']
            }, 
            {
                test: /\.scss$/,
                loader: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                        outputPath: "img/",
                        publicPath: "img/",
                        // limit: 2000000,
                    }
                }]
            }
        ]
    },
    
    resolve:{
        extensions:['.ts','.js']
    }
}