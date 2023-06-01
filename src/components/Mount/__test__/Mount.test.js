import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
// import Component from '@/components/Mount.vue'


const Component = {
  template: '<div>Hello world</div>'
}

describe('mount', () => {
  test('attrs', () => {
    const wrapper = mount(Component, {
      attrs: {
        id: 'hello',
        disabled: 'true'
      }
    })
    expect(wrapper.attributes()).toEqual({
      id: 'hello',
      disabled: 'true'
    })
  })

})



