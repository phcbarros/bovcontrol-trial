import {api} from './axios'

describe('Api', () => {
  test('DEVE retornar a "url base"', () => {
    expect(api.defaults).toHaveProperty(
      'baseURL',
      'http://challenge-front-end.bovcontrol.com/v1',
    )
  })
})
