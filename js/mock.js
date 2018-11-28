//调用mock方法模拟数据
Mock.mock(
    '/weiLogin/queryAll', {
        data: {
            user: "Yimi",
            items: [{
                    id: 1,
                    action: "练车",
                    done: true
                },
                {
                    id: 2,
                    action: "看课外书",
                    done: false
                },
                {
                    id: 3,
                    action: "学习angular",
                    done: true
                }
            ]
        }
    });

Mock.mock(
    '/weiLogin/deleteById',{
        data: {
            user: "gakki",
        }
    });
    
Mock.mock(
    '/weiProduct/productDetail',{
        data: {
            user: "shanghai",
        }
    });