<template>
  <div>

    <h1 class="coolFont">Dropdown element:</h1>
    <hr>

    <div class="block">
      <div>
        Here is the “Value” of the option you selected:
        <span class="result">{{ values }}</span>
      </div>
      <app-dropdown :options="jArray" v-model="values" :searchable="true" placeholder="Choose you property"></app-dropdown>
    </div>

    <hr>

    <app-generator :jArray="jArray" @diver="diverSay"></app-generator>

  </div>
</template>

<script>

  import AppDropdown from '@/components/AppDropdown';
  import AppLoremIpsum from '@/components/AppLoremIpsum';
  import AppGenerator from '@/components/AppGenerator';

  export default {
    name: 'AppHome',
    data () {
      return {
        max: 10000,
        min: 5000,
        randomEndArray: 0,
        values: 'Empty',
        requestURl: 'https://api.jsonbin.io/b/5de0ce10264e8f39a7be1605',
        jArray: [],
        testNumber: 0
      };
    },
    components: {
      AppDropdown,
      AppGenerator,
      AppLoremIpsum,
    },
    methods: {

      loadData () {
        let xhr = new XMLHttpRequest();
        let self = this;
        xhr.open('GET', this.requestURl);
        xhr.onload = function () {
          // Cut the array with help of 'randomEndArray'
          self.jArray = JSON.parse(xhr.responseText).slice(0, self.randomEndArray);
          //console.log("!!!" + self.jArray)
        };
        xhr.send();
      },

      updateFunc (number) {
        this.jArray = number;
        //console.log('this.jArray = ' + this.jArray)
        //console.log('number = ' + number)
      },

      diverSay (diverArray) {
        //console.log('йа дайвер!')
        this.jArray = diverArray;
      }

    },

    created: function () {
      // Calculate end for first array on load
      this.randomEndArray = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      this.loadData();
    },

    mounted () {
    }
  };
</script>

<style lang="scss" scoped>

  .coolFont {
    font-weight: 800;
  }

  .result {
    font-weight: bold;
    font-style: italic;
    text-transform: capitalize;
    color: orangered;
  }

  h1 {
    margin-top: 30px;
  }

</style>
