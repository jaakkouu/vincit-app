<template>
    <div ref="game">
        <div class="statusBar">People playing: {{ clientCount }}</div>
        <div class="game">
            <h1>{{ points }}</h1>
            <p>points</p>
            <Button :state="state" />
        </div>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    import Button from './Button.vue';
    export default {
        name: 'Game',
        components: {
            Button
        },
        data() {
            return {
                socket: {},
                points: 0,
                state: false, // true means waiting for update points
                clientCount: 0
            }
        },
        created() {
            this.socket = io('http://localhost:3000');
            this.socket.on('update points', data => {
                this.state = true;
                this.points = data;
            })
            this.socket.on('client count', data => {
                this.clientCount = data;
            })
            this.socket.on('notify reward', data => {
                this.$toasted.show(`Congratulations! You just won ${data} points`, { 
                    theme: "outline", 
                    position: "top-center",
                    duration: 4000
                })
            })
        },
        methods: {
            play() {
                this.state = false;
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
</style>