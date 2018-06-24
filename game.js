//
// game logic
// 
const MAX_POS = 63;
const BRIDGE_POS = 6; // when on move to space 12
const gooseSpaces = [5, 9, 14, 18, 23, 27];
var spaces = new Array(MAX_POS);  // store players positions on the spaces
var players = [];
const colors = ["teal", "yellow", "lime", "orange darken-3", "green lighten-1", "red" ]; // player colors


class Player {
    constructor(name) {
        this.name = name;
        this.pos = 0;
        this.avatar = "static/img/1.svg"; // TODO randomize avatar icon
        this.dice = [];
        this.color = colors[(players.length) % colors.length];
    }
    // set the new position and sign on the spaces list the position of all players
    // unset the previous position occupied to untrack that old position
    setPos(newPos) {
        spaces[this.pos] = undefined;
        this.pos = newPos;
        spaces[this.pos] = this; // points to the reference of this object
        this.posPercent = this.pos / MAX_POS * 100;
    }
    // roll two dice and return the new position
    rolldice() {
        this.dice = [parseInt( (Math.random() * 6 ) + 1), parseInt( (Math.random() * 6 ) + 1 )]; // destructuring bind
        var newPos = this.pos + this.dice[0] + this.dice[1];
        window.app.writeLog(this.name, "rolls [", this.dice[0],",", this.dice[1], "]. ", this.name, "moves from ", this.pos, "to", newPos);
        return [newPos, this.dice];
    }
    // move the player, check if this movement can be done. check special spaces. check if other players are on the space we're moving on
    move(newPos) {
        // rule: bounce back if > slot 63
        if(newPos > MAX_POS) { 
            var diff = (newPos - MAX_POS);
            newPos = MAX_POS - diff;  // bounces: like 65 - 63 = 2 -> goes to: 63 - 2 = 61
            window.app.writeLog(this.name," Bounces!", this.name,"returns to ", newPos, "with a diff of", diff);
            return this.move(newPos);
        } 
    
        // rule: bridge
        if(newPos === BRIDGE_POS) {
            newPos = 12;
            window.app.writeLog(" to the bridge. ", this.name, "jumps to 12!");
            return this.move(newPos); // jump
        }

        // rule: the goose: jump the same amout as the newPos
        if( gooseSpaces.indexOf( newPos ) != -1 ) {
            var goosePos = newPos + newPos;
            window.app.writeLog(", the Goose.",this.name, "moves again and goes to ", goosePos);
            return this.move(goosePos);
        }

        // rule: check if there are other players on the new space
        if( spaces[newPos] !== undefined ) {
            
            // rule: prank - player on this space! move him on my previous position!
            // swap players position: this player get this space, other player goes to this player old position:
            var otherPlayer = spaces[newPos];  // get the reference the in that position points to the other player object
            window.app.writeLog(" on ", newPos, "there is ", otherPlayer.name, "who returns to ", this.pos);
            otherPlayer.setPos(this.pos); // move other player to my previous position
            //this.setPos(newPos); // confirm the new position for this player
            
            // confirm the new position for this player is done below...
        }

        // player wins
        if(newPos === MAX_POS) {
            window.app.writeLog(this.name, "wins!");
            window.app.playerWins(this);
        }

        // confirm the new position and exit
        this.setPos(newPos);                                
    }        
}
