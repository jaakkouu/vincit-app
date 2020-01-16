<template>
    <button v-bind:class="{ resetBtn: !enabled }" @click="press">{{ enabled ? (state ? 'Play' : 'Playing') : 'Reset' }}</button>
</template>
<script>
    export default {
        name: 'Button',
        props: ['state', 'enabled'],
        methods: {
            press() {
                this.enabled ? this.$parent.play() : this.$parent.reset() 
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
        background-color: #307433
    }
    .resetBtn {
        color: hsla(52, 100%, 20%, 1.0);
        background-color: #FFDC00
    }
    .resetBtn:hover, .resetBtn:focus {
        background-color: #d8bb07
    }
</style>    