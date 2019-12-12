<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">[Elixirator]
        <div class="descriptionLogo">Test Task</div>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" href="#">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" href="#">Information</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>

  </div>
</template>

<style lang="scss">
  body {
    font-family: 'Nunito', sans-serif;
  }

  .bg-dark {
    background: #31475d !important;
  }

  .descriptionLogo {
    text-align: center;
    font-size: 10px;
    line-height: 0px;
    font-weight: 100 !important;
  }

</style>
