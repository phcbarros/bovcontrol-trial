import {Realm} from '@realm/react'
import {ObjectSchema} from 'realm'

type GenerateProps = {
  _id: string
  type: string
  amount_of_milk_produced: number
  farmer: {
    name: string
    city: string
  }
  from: {
    name: string
  }
  to: {
    name: string
  }
  location: {
    latitude: number
    longitude: number
  }
  number_of_cows_head: number
  had_supervision: boolean
  created_at: string
  updated_at: string
  sync: boolean
}

export class FarmSchema extends Realm.Object<FarmSchema> {
  name!: string
  city!: string

  static schema: ObjectSchema = {
    name: 'Farm',
    properties: {
      name: 'string',
      city: 'string',
    },
  }
}

export class LocationSchema extends Realm.Object<LocationSchema> {
  latitude!: number
  longitude!: number

  static schema: ObjectSchema = {
    name: 'Location',
    properties: {
      latitude: 'double',
      longitude: 'double',
    },
  }
}

export class FarmerSchema extends Realm.Object<FarmerSchema> {
  name!: string

  static schema: ObjectSchema = {
    name: 'Farmer',
    properties: {
      name: 'string',
    },
  }
}

export class SupervisorSchema extends Realm.Object<SupervisorSchema> {
  name!: string

  static schema: ObjectSchema = {
    name: 'Supervisor',
    properties: {
      name: 'string',
    },
  }
}

export class ChecklistSchema extends Realm.Object<ChecklistSchema> {
  _id!: string
  type!: string
  amount_of_milk_produced!: number
  number_of_cows_head!: number
  had_supervision!: boolean
  farmer!: {
    name: string
    city: string
  }
  from!: {
    name: string
  }
  to!: {
    name: string
  }
  location!: {
    latitude: number
    longitude: number
  }
  created_at!: string
  updated_at!: string
  sync!: boolean

  static generate({
    _id,
    type,
    amount_of_milk_produced,
    farmer,
    from,
    to,
    location,
    number_of_cows_head,
    had_supervision,
    created_at,
    updated_at,
    sync,
  }: GenerateProps) {
    return {
      _id,
      type,
      amount_of_milk_produced,
      farmer,
      from,
      to,
      location,
      number_of_cows_head,
      had_supervision,
      created_at,
      updated_at,
      sync,
    }
  }

  static schema: ObjectSchema = {
    name: 'Checklist',
    primaryKey: '_id',

    properties: {
      _id: 'string',
      type: 'string',
      amount_of_milk_produced: 'double',
      number_of_cows_head: 'int',
      had_supervision: 'bool',
      farmer: 'Farm',
      from: 'Farmer',
      to: 'Supervisor',
      location: 'Location',
      created_at: 'date',
      updated_at: 'date',
      sync: 'bool',
    },
  }
}
