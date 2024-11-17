import {createRealmContext} from '@realm/react'
import {
  FarmSchema,
  FarmerSchema,
  SupervisorSchema,
  LocationSchema,
  ChecklistSchema,
} from './schemas/checklist'

export const {
  RealmProvider,
  useObject,
  useRealm,
  useQuery: useQueryRealm,
} = createRealmContext({
  schema: [
    ChecklistSchema,
    FarmSchema,
    LocationSchema,
    FarmerSchema,
    SupervisorSchema,
  ],
  deleteRealmIfMigrationNeeded: true,
})
