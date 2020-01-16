<template>
    <div ref="game">
        <div class="statusBar">People playing: {{ clientCount }}</div>
        <div class="game">
            <h1>{{ points }}</h1>
            <p class="points">points</p>
            <Button :state="loadingState" :enabled="points ? true : false" />
            <p class="info">{{ points ? `You will win in ${nextPossiblePrice} presses` : 'Press Reset to Start Over' }}</p>
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
                loadingState: false, // true means waiting for update points
                clientCount: 0,
                nextPossiblePrice: 0 // how many clicks to next price
            }
        },
        created() {
            this.socket = io('http://localhost:3000');
            this.socket.on('update points', data => {
                this.loadingState = true;
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
            this.socket.on('notify possibilty', data => {
                this.nextPossiblePrice = data;
            });
        },
        methods: {
            play() {
                this.loadingState = false;
                this.socket.emit('play', this.points);
            },
            reset() {
                this.socket.emit('reload');
            }
        }
    }
</script>
<style scoped>
    h1 {
        font-size: 130px;
        font-variant-numeric: normal;
        border: 15px solid #2c3e50;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        padding: 25px;
        display: inline-block
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
    .game p.points {
        position: relative;
        top: -66px;
        font-size: 17px
    }
    .game p.info {
        font-size: 12px;
        padding: 10px
    }
</style>