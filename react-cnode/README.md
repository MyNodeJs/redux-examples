#react-cnode

学习了一段时间rect，基本写完了一个项目。
项目用到的技术栈有`react redux react-router es6,7 fetch
从一开始不知道从哪儿下手到现在基本完成一个项目，经历了很多困难，在这里要感谢一位大牛，参考了他的项目才能比较顺利的完成了，他项目地址是
<a href="http://react-china.org/t/webpack-react-react-router-redux-less-flex-css-es6-react-cnode/6332/117"></a>

项目还有许多要优化的地方，以后再写
在写的过程中遇到一些问题
redux是状态管理的一个框架，默认都得给它一个初始值，比如{}或者[],
但是我们在给组件用PropTypes写验证的时候，如果写一个对象里面必须有一个值，但是,redux开始默认是{}或者[],数据还没有异步加载过来，开始执行就会提出警告，当请求到数据警告就没有了，不知道这个问题怎么解决

connet是把组件和redux联系在一起的方法，在写的过程中，发现上层数据流经用connect包装过的组件的地方就会终止，也就是流不到connect包装后组件的子组件了，不知道大家遇到过没有

