import { mount } from '@vue/test-utils';
import AppSelect from '@/components/AppGenerator';

describe('AppDropdown.vue', () => {
  test('Setup correctly', () => {
    expect(true).toBe(true);
  });
});

describe('AppSelect', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(AppSelect);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe('AppHome', () => {
  test('Клик по кнопке и результат', () => {
    const wrapper = mount(AppSelect);

    expect(wrapper.text()).toContain('0');
    wrapper.find('input').trigger('click');
    wrapper.find('input').trigger('keydown');
    wrapper.find('input').trigger('keydown');
    wrapper.find('input').trigger('keydown');
    wrapper.find('input').trigger('enter');
    expect(wrapper.text()).toContain('1');

  });
});
