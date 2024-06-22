// eventBus.ts
import mitt from "mitt"

type Events = {
  openModal: string
}

const emitter = mitt<Events>()

export default emitter
