<template>
  <div>

    <div v-if="this.isOpened == false">
      Here is the “Title” of the option you selected:
      <span class="result">{{ this.filterKey }}</span>
    </div>

    <div v-else>
      Here is the “Title” of the option you selected:
      <span class="result">{{ this.filterKeyPlaceholder }}</span>
    </div>

    <div class="select" :class="{ 'is-open': isOpened }">

      <input
        type="text"
        class="select__control"
        :placeholder="placeholder"
        v-if="searchable"
        v-model="filterKey"
        @click="open"
        @input="onInput"
        @keydown="onKeyDown"
      >

      <div
        class="select__control"
        v-if="!searchable"
        @click="toggle"
      >{{ selectedTitle }}
      </div>

      <div class="select__menu">
        <div
          class="select__menu-item"
          v-for="(item, index) in filteredOptions"
          :class="{
					'is-selected': item.value === value,
					'is-disabled': item.disabled,
					'is-choosed': virtualIndex === index
				}"
          :data-item-id="index + 1 + '. '"
          @click="select(item)"
          @mouseover="removeVirtualIndex"
        >{{ item.title }}
        </div>
      </div>

    </div>

    <div>
      <span class="countForTest">{{ testNumber }}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'AppDropdown',
    data () {
      return {
        isOpened: false,
        selectedItem: null,
        filterKey: 'Empty',
        testNumber: 0,
        filterKeyPlaceholder: '',
        virtualIndex: 0,
      };
    },

    props: {
      options: Array,
      value: [ String, Number ],
      searchable: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      test: String,
    },

    methods: {
      open () {
        this.isOpened = true;
        this.filterKeyPlaceholder = this.filterKey;
        this.filterKey = '';
      },

      close () {
        this.isOpened = false;

        if (this.filterKeyPlaceholder) {
          this.filterKey = this.filterKeyPlaceholder;
        }

        let control = this.$el.querySelector('input.select__control');

        if (control) {
          control.blur();
        }
      },

      onInput () {
        this.filterKeyPlaceholder = '';
        this.virtualIndex = 0;
      },

      toggle () {
        if (this.isOpened) {
          this.close();
        } else {
          this.open();
        }
      },

      select (item) {
        if (!item || (item && item.disabled)) {
          return;
        }

        this.$emit('input', item.value);
        this.selectedItem = item;
        this.filterKey = item.title;
        this.filterKeyPlaceholder = '';
        this.virtualIndex = 0;

        this.close();
      },

      updateValue () {
        for (let i = 0, len = this.options.length; i < len; i++) {
          let item = this.options[i];

          if (item.value === this.value) {
            this.selectedItem = item.title;
            this.filterKey = item.title;
            this.filterKeyPlaceholder = '';
            return;
          }
        }
      },

      onKeyDown (e) {

        let keyCodes = {
          38: 'up',
          40: 'down',
          13: 'enter'
        };

        let keyAlias = keyCodes[e.keyCode];
        let vm = this;

        if (keyAlias) {
          e.preventDefault();
        }

        switch (keyAlias) {
          case 'up': {
            moveUp();
            break;
          }

          case 'down': {
            moveDown();
            break;
          }

          // enter
          case 'enter': {
            this.testNumber = 1;
            onEnter();
            break;
          }
        }

        function moveUp () {
          let optsLength = vm.filteredOptions.length;

          if (!optsLength) {
            return;
          }

          if (vm.virtualIndex <= 0 || vm.virtualIndex > optsLength) {
            // move to last
            vm.virtualIndex = optsLength - 1;
          } else {
            vm.virtualIndex--;
          }

          scrollToVisible(vm.virtualIndex);
        }

        function moveDown () {
          let optsLength = vm.filteredOptions.length;

          if (!optsLength) {
            return;
          }

          if (vm.virtualIndex < 0 || vm.virtualIndex >= optsLength - 1) {
            // move to first
            vm.virtualIndex = 0;
          } else {
            vm.virtualIndex++;
          }

          scrollToVisible(vm.virtualIndex);
        }

        function onEnter () {
          vm.select(vm.filteredOptions[vm.virtualIndex]);
        }

        function scrollToVisible (index) {
          if (index < 0) {
            return;
          }

          let item = vm.$el.querySelector(`.select__menu-item[data-item-id="${index}"]`);

          if (!item) {
            return;
          }

          // new
          if (typeof item.scrollIntoViewIfNeeded !== 'undefined') {
            item.scrollIntoViewIfNeeded();
          } else {
            item.scrollIntoView();
          }
        }
      },

      removeVirtualIndex () {
        this.virtualIndex = -1;
      }
    },

    computed: {
      selectedTitle () {

        for (let i = 0, len = this.options.length; i < len; i++) {
          let item = this.options[i];

          if (item.value === this.value) {
            return item.title;
          }
        }

        return this.selectedItem.title;
      },

      filteredOptions () {
        let vm = this;

        if (!vm.searchable) {
          return vm.options;
        }

        return vm.options.filter(function (val) {
          // starts with key
          if (!vm.filterKey || val.title.toLowerCase().search(vm.filterKey.toLowerCase()) === 0) {
            return val;
          }
        });
      }
    },

    mounted () {
      let vm = this;
      vm.updateValue();
      vm.$el.addEventListener('click', function (e) {
        e._targetSelect = vm;
      });

      document.body.addEventListener('click', function (e) {
        if (e._targetSelect !== vm) {
          vm.close();
        }
      });

    },

    watch: {
      value () {
        this.updateValue();
      }
    }

  };
</script>

<style scoped>
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    font: 16px/1.4 'Open Sans', sans-serif;
    text-align: center;
  }

  body {
    background-color: #f6f7f9;
    padding: 40px;
    margin: 0;
    color: #445870;
    min-height: 100vh;
    width: auto;
    display: inline-block;
    text-align: left;
  }

  .block {
    display: inline-block;
    margin-right: 40px;
    width: 300px;
    vertical-align: top;
  }

  .select {
    position: relative;
  }

  .select__control {
    -webkit-tap-highlight-color: transparent;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e0e7ee;
    cursor: pointer;
    display: block;
    font-weight: normal;
    height: 42px;
    line-height: 40px;
    outline: none;
    padding-left: 18px;
    padding-right: 30px;
    margin-top: 20px;
    transition: all 0.2s ease-in-out;
    user-select: none;
    white-space: nowrap;
    text-transform: capitalize;
    width: 100%;
  }

  .select:after {
    content: '';
    border-bottom: 2px solid #90a1b5;
    border-right: 2px solid #90a1b5;
    display: block;
    height: 7px;
    width: 7px;
    margin-top: -4px;
    pointer-events: none;
    position: absolute;
    right: 12px;
    top: 50%;
    transform-origin: 66% 66%;
    transform: rotate(45deg);
    transition: transform 0.15s ease-in-out;
  }

  .select.is-open .select__control {
    border-color: #88bfff;
  }

  .select.is-open:after {
    transform: rotate(-135deg);
  }

  .select__menu {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 0 1px rgba(68, 88, 112, 0.11);
    margin-top: 4px;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    pointer-events: none;
    position: absolute;
    top: 100%;
    left: 0;
    transform-origin: 50% 0;
    transform: scale(0.75) translateY(-21px);
    transition: transform 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out;
    z-index: 9;
    min-width: 100%;
    overflow: auto;
    max-height: 370px;
  }

  .select.is-open .select__menu {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
  }

  .select__menu-item {
    cursor: pointer;
    font-weight: 400;
    text-transform: capitalize;
    outline: none;
    padding: 7px 18px 7px 30px;
    text-align: left;
    transition: background-color .2s;
    min-height: auto;
    line-height: 20px;
    user-select: none;
  }

  .select__menu-item:before {
    content: attr(data-item-id);
  }


  .select__menu-item.is-selected {
    font-weight: 700;
    color: #235;
  }

  .select__menu-item.is-choosed,
  .select__menu-item:hover,
  .select__menu-item:focus {
    background-color: #f6f7f9;
  }

  .select__menu-item.is-disabled {
    background-color: transparent;
    color: #90a1b5;
    cursor: default;
  }

  .result{
    font-weight: bold;
    font-style: italic;
    text-transform: capitalize;
    color: orangered;
  }

  .countForTest{
    opacity: 0;
  }

</style>
