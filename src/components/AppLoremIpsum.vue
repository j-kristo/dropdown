<template>
  <div class="jack">

    <p>Generate your ~10k Fake JSON and add it to array in SelectElement</p>

    <form @submit.prevent="onSubmit">
      <label>
        Component type:
        <select v-model="component">
          <option value="StatefulLi">Stateful</option>
          <option value="FunctionalLi">Functional</option>
        </select>
      </label>

      <br>
      <br>
      <button type="submit">Add Items</button>
    </form>

    <br>
    <button @click="makeArray">jFunc</button>

    <br>
    <label>
      <select>
        <option value="" v-for="(item, index) in items" :key="item.id">{{ index + 1}}. {{ item }}</option>
      </select>
    </label>

    <ol>
      <component :is="component" v-for="(item) in items" :key="item" :index="item">{{ item }}</component>
    </ol>
  </div>
</template>

<script>

  export default {

    props: {
      jArray: {
        type: Array
      }
    },

    components: {
    },

    data: () => ({
      component: 'StatefulLi',
      items: [],
    }),

    beforeUpdate () {
      console.time();
    },

    updated () {
      console.log('Time for render:');
      console.timeEnd();
    },

    methods: {

      makeArray () {

        console.log(this.items)

        let newArray = [
          { value: 'jack', title: 'Jack' },
          { value: 'lera', title: 'Lera' },
          { value: 'poly', title: 'Poly' },
        ];
        this.$emit('upFromChild', newArray);
      },

      onSubmit () {
        this.items = Array.from({ length: 40 }, (el, i) => {

          // Box-Muller transform to get a normal distribution
          function normal () {
            let u = 0, v = 0;
            while (u === 0) {
              u = Math.random();
            } //Converting [0,1) to (0,1)
            while (v === 0) {
              v = Math.random();
            }
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
          }

          // int with uniform distribution between min and max
          function randInt (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }

          // returns boolean with specified probability
          function drawWithProb (prob) {
            return Math.random() <= prob;
          }

          const makeWord = (mean, std) => {
            // vowels list doubled, each time a vowel is picked, the vowel is removed
            const vowels = 'aeiouyaeiouy'.split('');
            // consonants list doubled, each consonant a vowel is picked, the consonant is removed
            const consonants = 'bcdfghjklmnpqrstvwxzbcdfghjklmnpqrstvwxz'.split('');

            // function to get a vowel
            const pickVowel = () => {
              const idx = randInt(0, vowels.length);
              const v = vowels[idx];
              vowels.slice(idx, 1);
              return v;
            };
            // function to get a consonnant
            const pickConsonant = () => {
              const idx = randInt(0, consonants.length);
              const c = consonants[idx];
              consonants.slice(idx, 1);
              return c;
            };

            // get a positive word length with mean and variance
            let wordLen = 0;
            while (wordLen <= 0) {
              wordLen = Math.round(normal() * std + mean);
            }

            // first letter
            const startWithVowel = drawWithProb(0.5);
            let word = startWithVowel ? pickVowel() : pickConsonant();
            // following letters
            while (word.length < wordLen) {
              const nextIsVowel = drawWithProb(0.25);
              word += nextIsVowel ? pickVowel() : pickConsonant();
            }
            return word;
          };

          // the sentence generator
          function loremIpsum (len, meanWordLen = 5, wordLenStd = 1) {
            let totalLen = 0;
            const words = [];

            // accumulate enough words
            while (totalLen < len) {
              const word = makeWord(meanWordLen, wordLenStd);
              totalLen += word.length;
              words.push(word);
            }

            // join and cut to desired length
            return words.join(' ').slice(0, len);
          }

          //return '{ ' + 'value' + ': ' + '"' + loremIpsum(5) + '"' + ' }';
          return loremIpsum(10);

      });
      }
    }
  };
</script>

<style scoped>
  .jack {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
