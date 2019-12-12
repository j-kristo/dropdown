<template>
  <div class="generator">

    <form @submit.prevent="onSubmit">

      <h5 class="makeGen">Make random Array between "min" and "max" here:</h5>

      <div class="block">
        <span>Min:</span>
        <input class="select__control" type="number" name="minimum" v-model="min" min="5000">
      </div>

      <div class="block">
        <span>Max:</span>
        <input class="select__control" type="number" name="maximum" v-model="max" max="10000">
      </div>
      <hr>
      <button class="btn btn-info btn-lg jButton coolFont" type="submit">Generate new fake JSON</button>

      <hr>

    </form>

    <div class="block">
      <button @click="diver" class="btn btn-success btn-lg" :disabled='!isDisable'><strong>Include new API to DropDown element</strong></button>
      <span>{{ this.include }}</span>
    </div>
    <span>{{ this.updateMessage }}</span>
    <hr>

    <div class="min">Minimum diapason = {{ min }}</div>
    <div class="max">Maximum diapason = {{ max }}</div>
    <div class="max">New JSON length is : <strong>{{ this.items.length }}</strong></div>

    <hr>

    <div class="demo"><strong>You generated a new JSON FAKE API: </strong>
      <br> <br>
      {{ this.items }}
    </div>

  </div>
</template>

<script>

  export default {
    name: 'AppGenerator',

    props: {
      jArray: {
        type: Array
      }
    },

    data: () => ({
      include: '',
      min: '5000',
      max: '10000',
      randQuantity: '',
      items: '',
      updateMessage: ''
    }),

    computed: {
      isDisable () {
        return this.items.length > 0
      }
    },

    methods: {

      diver () {
        let diverArray = this.items
        this.$emit('diver', diverArray)
        this.include = '▲ New data included to dropdown list!'
      },

      onSubmit () {
        this.randQuantity = Math.floor(Math.random() * (+this.max - +this.min)) + +this.min
        //console.log('this.randQuantity = ' + this.randQuantity)
        console.time('test including to select time: ')
        this.loremIpsum(5, 15, this.randQuantity)
        //console.log(this.items)
        console.timeEnd('test including to select time: ')
        this.include = '◄  Press to include!'
      },

      loremIpsum (numValue, numTitle, numStrings) {

        this.items = Array.from({ length: numStrings }, (el, i) => {

          // Box-Muller transform to get a normal distribution
          function normal () {
            let u = 0, v = 0
            while (u === 0) {
              u = Math.random()
            } //Converting [0,1) to (0,1)
            while (v === 0) {
              v = Math.random()
            }
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
          }

          // int with uniform distribution between min and max
          function randInt (min, max) {
            return Math.floor(Math.random() * (max - min) + min)
          }

          // returns boolean with specified probability
          function drawWithProb (prob) {
            return Math.random() <= prob
          }

          const makeWord = (mean, std) => {
            // vowels list doubled, each time a vowel is picked, the vowel is removed
            const vowels = 'aeiouyaeiouy'.split('');
            // consonants list doubled, each consonant a vowel is picked, the consonant is removed
            const consonants = 'bcdfghjklmnpqrstvwxzbcdfghjklmnpqrstvwxz'.split('');

            // function to get a vowel
            const pickVowel = () => {
              const idx = randInt(0, vowels.length);
              const v = vowels[idx]
              vowels.slice(idx, 1)
              return v
            };
            // function to get a consonnant
            const pickConsonant = () => {
              const idx = randInt(0, consonants.length);
              const c = consonants[idx]
              consonants.slice(idx, 1)
              return c
            };

            // get a positive word length with mean and variance
            let wordLen = 0
            while (wordLen <= 0) {
              wordLen = Math.round(normal() * std + mean)
            }

            // first letter
            const startWithVowel = drawWithProb(0.5);
            let word = startWithVowel ? pickVowel() : pickConsonant()
            // following letters
            while (word.length < wordLen) {
              const nextIsVowel = drawWithProb(0.25)
              word += nextIsVowel ? pickVowel() : pickConsonant()
            }
            return word
          };

          // the sentence generator
          function generateLoremIpsum (len, meanWordLen = 5, wordLenStd = 1) {
            let totalLen = 0
            const words = []

            // accumulate enough words
            while (totalLen < len) {
              const word = makeWord(meanWordLen, wordLenStd)
              totalLen += word.length
              words.push(word)
            }

            // join and cut to desired length
            return words.join(' ').slice(0, len)
          }

          // Make string with random title and value
          return JSON.parse('{ ' + '"value"' + ': ' + '"' + generateLoremIpsum(numValue) + '"' + ', ' + '"title"' + ': ' + '"' + generateLoremIpsum(numTitle) + '"' + ' }')

        });
      }
    }
  };
</script>

<style scoped>

  .block {
    display: inline-block;
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
    padding-right: 12px;
    transition: all 0.2s ease-in-out;
    user-select: none;
    white-space: nowrap;
  }

  .jButton {
    position: relative;
    top: -1px;
  }

  .coolFont {
    font-weight: 600;
  }

  .makeGen {
    font-size: 1.25rem;
    text-decoration: overline;
    color: #414b4e
  }
</style>
