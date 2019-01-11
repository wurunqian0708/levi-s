require.config({
	path:{
		jquire:"jquire-1.11.3",
		"jquire-cookie":"jquire.cookie",
		parabola:"parabola",
		index:"index"
	},

	//设置引入js文件的依赖关系
	shim:{
		"jquire-cookie":["jquire"],

		//声明不是AMD规范的模块
		"parabola":{
			exports:"_"
		}
	}
})

//调用
require(["index"],function(index){
	index.index();
})