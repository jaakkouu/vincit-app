<template>
    <button @click="play">{{ state ? 'Play' : 'Playing...' }}</button>
</template>
<script>
    export default {
        name: 'Button',
        props: ['state'],
        methods: {
            play() {
                this.$parent.play();
            }
        }
    }
</script>
<style scoped>
    button {
        outline: none;
        cursor: pointer;
        font-family: 'Quicksand', sans-serif;
        letter-spacing: 3px;
        text-transform: uppercase;
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 17px 36px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        border-radius: 25px
    }
    button:hover, button:focus {
        background-color: #307433;
    }
</style>    