import { mount } from '@vue/test-utils';
import AppMount from '@/components/AppGenerator';

describe('AppGenerator.vue', () => {
  test('Setup correctly', () => {
    expect(true).toBe(true);
  });
});

describe('AppMount', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(AppMount);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
