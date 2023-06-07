import { mount } from '@vue/test-utils';
import { test, expect, describe } from 'vitest';
import Component from '../Component.vue';
import Foo from '../Foo.vue';
import Data from '../Data.vue';
import Props from '../Props.vue';
import Value from '../Value.vue';
import Trigger from '../Trigger.vue';

describe('warpper methods', () => {
    /**
     * @desc attributes 获取组件的属性
     */
    test('attributes', () => {
        const wrapper = mount(Component);
        expect(wrapper.attributes('id')).toBe('foo');
        expect(wrapper.attributes('class')).toBe('bar');
    });

    /**
     * @desc classes 获取组件的类名
     */
    test('class', () => {
        const wrapper = mount(Component);

        expect(wrapper.classes()).toContain('bar');
        expect(wrapper.classes('bar')).toBe(true);
        expect(wrapper.classes('no-existing')).toBe(false);
    });

    /**
     * @desc emitted 返回组件发出的所有事件
     */
    test('emitted', () => {
        const wrapper = mount(Component);

        expect(wrapper.emitted()).toHaveProperty('greet');
        expect(wrapper.emitted('greet')).toHaveLength(2);
        expect(wrapper.emitted().greet[0]).toEqual(['hello']);
        expect(wrapper.emitted().greet[1]).toEqual(['goodbye']);
    });

    /**
     * @desc exists 判断一个元素是否存在
     */
    test('exists', () => {
        const wrapper = mount(Component);

        expect(wrapper.find('div').exists()).toBe(true);
        expect(wrapper.find('p').exists()).toBe(false);
    });

    /**
     * @desc find 查找一个元素，并且返回相应的DOMWrapper
     */
    test('find', () => {
        const wrapper = mount(Component);
        expect(wrapper.find('div').exists()).toBe(true);
        expect(wrapper.find({ ref: 'son' }).exists()).toBe(true);
    });

    /**
     * @desc findAll 查找元素，但是返回查找到的所有元素
     */
    test('findAll', () => {
        const wrapper = mount(Component);

        expect(wrapper.findAll('span')).toHaveLength(3);
    });

    /**
     * @desc findComponent 查找相应的组件并且返回vm实例
     */
    test('findComponent', () => {
        const wrapper = mount(Component);
        expect(wrapper.findComponent(Foo).html()).toContain('Foo');
        expect(wrapper.findComponent('.foo').html()).toContain('Foo');
    });

    /**
     * @desc findAllComponents 查找对应组件，并且返回对应的组件数组
     */
    test('findAllComponent', () => {
        const wrapper = mount(Component);
        expect(wrapper.findAllComponents(Foo)).toHaveLength(3);
    });

    /**
     * @desc get 方法也是查找一个实例，但是没有找到的时候会抛出一个错误
     */
    test('get', () => {
        const wrapper = mount(Component);
        wrapper.get('span');

        expect(() => wrapper.get('.not-there')).toThrowError();
    });

    /**
     * @desc getComponent 查找相应的组件实例
     */
    test('getCompontnt', () => {
        const wrapper = mount(Component);
        wrapper.getComponent(Foo);
        expect(() => wrapper.getComponent(Foo));
        expect(() => wrapper.get('.not-there')).toThrowError();
    });

    /**
     * @desc html 返回一个元素的HTML
     */
    test('html', () => {
        const wrapper = mount(Foo);
        expect(wrapper.html()).toBe(`<div class="foo">Foo</div>`);
    });

    /**
     * @desc  isVisible 判断一个元素是否可见
     * TODO: isVisible 失效
     */
    test('isVisible', () => {
        const wrapper = mount(Component);
        expect(wrapper.find('section').isVisible()).toBe(true);
    });

    /**
     * @desc setData 设置组件的数据
     * Vue 数据是异步更新的，因此需要await等待
     */
    test('setData', async () => {
        const wrapper = mount(Data);
        expect(wrapper.html()).toContain('Count: 0');

        await wrapper.setData({
            count: 2,
        });

        expect(wrapper.html()).toContain('Count: 2');
    });

    /**
     * @desc setProps 设置props
     */
    test('setProps', async () => {
        const wrapper = mount(Props, {
            props: {
                message: 'message',
            },
        });
        expect(wrapper.html()).toContain('message');

        await wrapper.setProps({
            message: 'hello',
        });

        expect(wrapper.html()).toContain('hello');
    });

    /**
     * @desc setValue 设置组件的值
     */
    // test('setValue on checkbox', async () => {
    //     const wrapper = mount(Value);

    //     await wrapper.find('input[type="checkbox"]').setValue(true);
    //     expect(wrapper.find('div')).toBe(true);

    //     await wrapper.find('input[type="checkbox"]').setValue(false);
    //     expect(wrapper.find('div')).toBe(false);
    // });

    /**
     * @desc text 返回元素的文本内容
     */
    test('test', () => {
        const warpper = mount(Foo);

        expect(warpper.find('.foo').text()).toBe('Foo');
    });

    /**
     * @desc trigger 触发组件元素的事件
     */
    test('trigger', async () => {
        const wrapper = mount(Trigger);

        await wrapper.find('button').trigger('click');

        expect(wrapper.find('span').text()).toBe('Count: 1');
    });

    /**
     * @desc unmount 取消挂载DOM
     */
    test('unmount', () => {
        const wrapper = mount(Component);

        wrapper.unmount();
        // Component is removed from DOM.
        // console.log has been called with 'unmounted!'
    });
});
