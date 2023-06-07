import { test, expect, describe } from 'vitest';
import { mount } from '@vue/test-utils';

const Component = {
    template: `
    <div>
        hello world
    </div>
    `
}

describe('wrapper properities', () => {
    test('vm', () => {
        const wrapper = mount(Component)
        console.log(wrapper.vm)
    })
})
