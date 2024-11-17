import {Checklist} from '../types/checklist'

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      detail: {
        item: Checklist
      }
      registerChecklist: undefined
      updateChecklist: {
        item: Checklist
      }
    }
  }
}
