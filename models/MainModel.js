// Models/MainModel.js
import { Schema, model } from 'mongoose';

const playerSchema = new Schema({
  playerName: String,
  playerNumber: Number,
  goals: Number
});

const Player = model('Player', playerSchema);

export default Player;
