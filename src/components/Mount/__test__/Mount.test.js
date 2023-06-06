import { mount } from '@vue/test-utils';
import { test, expect, describe } from 'vitest';
// import Component from '@/components/Mount.vue'

document.body.innerHTML = `
  <div>
    <h1>Non Vue App</h1>
    <div id="app"></div>
  </div>
`;

const Component = {
    template: '<div>Hello world</div>',
};

describe('mount a component', () => {
    /**
     * @desc mount 测试
     * mount 第二个参数可以设置组件相关的状态与配置
     */
    test('mount', () => {
        const wrapper = mount(Component, {});
        expect(wrapper.html()).toContain('Hello world');
    });

    /**
     * @desc attachTo 指定组件安装挂载的DOM节点,CSS选择器等
     * @type HTMLElement | string
     */
    test('attachTo', () => {
        const wrapper = mount(Component, {
            attachTo: document.getElementById('app'),
        });

        expect(document.body.innerHTML).toBe(`
  <div>
    <h1>Non Vue App</h1>
    <div id="app"><div data-v-app=""><div>Hello world</div></div></div>
  </div>
`);
    });

    /**
     * @desc attrs 测试
     */
    test('attrs', () => {
        const wrapper = mount(Component, {
            attrs: {
                id: 'hello',
                disabled: 'true',
            },
        });
        expect(wrapper.attributes()).toEqual({
            id: 'hello',
            disabled: 'true',
        });
    });

    /**
     * @desc data 组件的默认数据，必须是一个函数
     * @type: function
     */
    test('data', () => {
        const DataComponent = {
            template: `<div>Hello {{message}}</div>`,
        };
        const wrapper = mount(Component, {
            data() {
                return {
                    message: 'world',
                };
            },
        });

        expect(wrapper.html()).toContain('Hello world');
    });

    /**
     * @desc props 设置组件的props
     */
    test('props', () => {
        const PropsComponent = {
            template: `<div>{{count}}</div>`,
            props: {
                type: Number,
                default: 5,
                require: true,
            },
        };
        const wrapper = mount(PropsComponent, {
            props: {
                count: 3,
            },
        });

        expect(wrapper.html()).toContain(3);
    });

    /**
     * @desc slots 为组件设置插槽
     */
    test('slots', () => {
        const SoltComponent = {
            template: `
          <div>
            <slot name="first"></slot>
            <slot></slot>
          </div>
        `,
        };
        const DefaultSolts = {
            template: `
          <div>
            Bar
          </div>
        `,
        };

        const wrapper = mount(SoltComponent, {
            slots: {
                default: 'Default',
                first: DefaultSolts,
            },
        });

        expect(wrapper.html()).toBe(`<div>
  <div> Bar </div>Default
</div>`);
    });

    /**
    * @desc shallow 存储组件的子组件
    */
   test('shallow', () => {
    const Parent = {
      template: `<son></son>`
    }

    const wrapper = mount(Parent, {
      shallow: true
    })

    expect(wrapper.html()).toEqual('<son></son>')
   })
});
