import zhihu from "./zhihu"
import bilibili from "./bilibili"
import csdn from "./csdn"
import juejin from "./juejin"

type PlatFormObj = {
  [key: string]: () => JSX.Element
}
export const platFormObj: PlatFormObj = { zhihu, bilibili, juejin, csdn }
// export default { zhihu, bilibili }
