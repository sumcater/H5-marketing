
module.exports = {
	devServer: {
		// 代理
		proxy: {
			"/api": {
				target: process.env.VUE_APP_USE_IP,
				changeOrigin: true,
				pathRewrite: {
					// "^/api": "",
				},
			},
		},
	},
};
