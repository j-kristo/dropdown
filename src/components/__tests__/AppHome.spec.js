import { mount } from '@vue/test-utils';
import AppHome from '@/components/pages/AppHome';

describe('AppHome.vue', () => {
  test('Setup correctly', () => {
    expect(true).toBe(true);
  });
});

describe('AppHome', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(AppHome);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
