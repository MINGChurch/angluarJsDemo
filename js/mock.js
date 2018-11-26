//调用mock方法模拟数据
Mock.mock(
    '/weiLogin/queryAll', {
        data : {
            user:"Yimi",
            items:[{action:"练车",done:true},
                {action:"看课外书",done:false},
                {action:"学习angular",done:true}]
        }
    });