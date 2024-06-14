import zhihu from "./zhihu"
import bilibili from "./bilibili"

type PlatFormObj = {
  [key: string]: () => JSX.Element
}
export const platFormObj: PlatFormObj = { zhihu, bilibili }
// export default { zhihu, bilibili }
