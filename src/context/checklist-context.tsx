import {useNetInfo} from '@react-native-community/netinfo'
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react'
import {useQueryRealm, useRealm} from '../libs/realm'
import {ChecklistSchema} from '../libs/realm/schemas/checklist'
import {
  CreateChecklistBody,
  registerChecklists,
} from '../infrastructure/api/register-checklist'
import {Checklist} from '../types/checklist'
import {Alert} from 'react-native'
import {updateChecklist} from '../infrastructure/api/update-checklist'

type ChecklistContextProps = {
  syncChecklists: () => Promise<void>
}

export const ChecklistContext = createContext({} as ChecklistContextProps)

type Props = {
  children: ReactNode
}

export const ChecklistProvider = ({children}: Props) => {
  const netInfo = useNetInfo()
  const checklistsQuery = useQueryRealm(ChecklistSchema)
  const realm = useRealm()

  async function registerChecklistsFn() {
    try {
      const outOfSyncChecklists = checklistsQuery.filtered(
        "sync = false && action = 'register'",
      )

      if (outOfSyncChecklists.length === 0) {
        return
      }

      const checklists = outOfSyncChecklists.map((checklist) => {
        return {
          _id: checklist._id,
          type: checklist.type,
          amount_of_milk_produced: checklist.amount_of_milk_produced,
          farmer: {
            name: checklist.farmer.name,
            city: checklist.farmer.city,
          },
          from: {
            name: checklist.from.name,
          },
          to: {
            name: checklist.to.name,
          },
          location: {
            latitude: checklist.location.latitude,
            longitude: checklist.location.longitude,
          },
          number_of_cows_head: checklist.number_of_cows_head,
          had_supervision: checklist.had_supervision,
          created_at: checklist.created_at,
          updated_at: checklist.updated_at,
        }
      })

      console.log(JSON.stringify({checklists}))

      await registerChecklists({checklists})

      realm.write(() => {
        outOfSyncChecklists.forEach((checklist) => {
          checklist.sync = true
        })
      })
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao sincronizar os checklists criados!',
      )
    }
  }

  async function updateChecklistsFn() {
    try {
      const outOfSyncChecklists = checklistsQuery.filtered(
        "sync = false && action = 'update'",
      )

      if (outOfSyncChecklists.length === 0) {
        return
      }

      Promise.all(
        outOfSyncChecklists.map((checklist) => {
          return updateChecklist(checklist._id, {
            type: checklist.type,
            amount_of_milk_produced: checklist.amount_of_milk_produced,
            farmer: {
              name: checklist.farmer.name,
              city: checklist.farmer.city,
            },
            from: {
              name: checklist.from.name,
            },
            to: {
              name: checklist.to.name,
            },
            location: {
              latitude: checklist.location.latitude,
              longitude: checklist.location.longitude,
            },
            number_of_cows_head: checklist.number_of_cows_head,
            had_supervision: checklist.had_supervision,
            created_at: checklist.created_at,
            updated_at: checklist.updated_at,
          })
        }),
      )

      realm.write(() => {
        outOfSyncChecklists.forEach((checklist) => {
          checklist.sync = true
        })
      })
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao sincronizar os checklists atualizados!',
      )
    }
  }

  async function syncChecklists() {
    console.log('Sync checklists')

    registerChecklistsFn()
    updateChecklistsFn()
  }

  useEffect(() => {
    // if (netInfo.isConnected) {
    //   syncChecklists()
    // }
  }, [netInfo.isConnected])

  return (
    <ChecklistContext.Provider
      value={{
        syncChecklists,
      }}>
      {children}
    </ChecklistContext.Provider>
  )
}

export function useChecklistContext() {
  return useContext(ChecklistContext)
}
