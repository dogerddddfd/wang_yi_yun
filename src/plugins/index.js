import{Swipe,SwipeItem,Buttom} from 'vant'

const plugins=[
   Swipe,SwipeItem,Buttom
]
// 自动导入
export default function getVant(app){
   plugins.forEach((item)=>{
      return app.use(item)
   })
}