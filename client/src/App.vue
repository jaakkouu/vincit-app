<template>
  <div id="app">
    <Game />
  </div>
</template>
<script>
import Game from './components/Game.vue';
export default {
  name: 'app',
  components: {
    Game
  }
}
</script>
<style>
	@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0
	}
	#app {
		font-family: 'Quicksand', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50
	}
	.toasted.outline {
        font-family: 'Quicksand', sans-serif;
		font-size: 13px
    }
</style>