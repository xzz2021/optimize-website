// eventBus.ts
import mitt from "mitt"

type Events = {
  openModal: string
  openAddModal: string
}

const emitter = mitt<Events>()

export default emitter
