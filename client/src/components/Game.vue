<template>
    <div ref="game">
        <div id="header">
            <div id="player1">
                <div class="playerName">Player 1</div>
                <div class="playerScore">20</div>
            </div>
            <div id="divider">{{ game.score }}</div>
            <div id="player2">
                <div class="playerName">Player 2</div>
                <div class="playerScore">20</div>
            </div>
        </div>
        <div id="content">
            <button v-on:click="play">Play</button>
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
                game: {
                    score: 20
                }
            }
        },
        created() {
            this.socket = io('http://localhost:3000');
        },
        mounted() {
            this.context = this.$refs.game;
            this.socket.on('game', data => {
                this.game = data;
            });
        },
        methods: {
            play() {
                this.socket.emit('play');
            }
        }
    }
</script>
<style scoped></style>