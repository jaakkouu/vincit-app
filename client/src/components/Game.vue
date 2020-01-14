<template>
    <div ref="game">
        <div class="statusBar">People playing: {{ clientCount }}</div>
        <div class="game">
            <h1>{{ points }}</h1>
            <p>points</p>
            <button v-on:click="play()">Play</button>
        </div>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    export default {
        name: 'Game',
        data() {
            return {
                socket: {},
                context: {},
                points: 0,
                clientCount: 0
            }
        },
        created() {
            this.socket = io('http://localhost:3000');
            this.socket.on('update points', data => {
                this.points = data;
            })
            this.socket.on("client count", data => {
                this.clientCount = data;
            })
        },
        mounted() {
            this.context = this.$refs.game;
        },
        methods: {
            play() {
                this.socket.emit('play', this.points);
            }
        }
    }
</script>
<style scoped>
    h1 {
        font-size: 175px;
        font-variant-numeric: normal
    }
    .statusBar {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        position: fixed;
        width: 100%;
        background-color: #eeeeee;
        border-bottom: 1px solid #ccc 
    }
    .game {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .game p {
        position: relative;
        top: -29px;
        letter-spacing: 6px;
        font-size: 23px
    }
    button {
        letter-spacing: 3px;
        text-transform: uppercase;
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 14px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 15px
    }
</style>