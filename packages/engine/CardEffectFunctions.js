// EFFECT FUNCTIONS
export const Draw = (amount, player) => {
    // Draw amount cards for player, no interaction from user required
}

export const Discard = (amount, player) => {
    // ask player to select amount cards from their hand
    // call discardFromHand on these cards
}

export const Profit = (amount, player) => {
    // Give amount coins to player
}

export const Spend = (amount, player) => {
    // Player loses amount coins
}

export const Steal = (amount, player) => {
    // Take amount coins from opponent and give to this player
}

export const Recruit = (amount, player) => {
    // Owning player selects up to amount hires from opponent (they are always going to take as many as are avaiable)
    // Change over and move cards onto player's side
}

export const Remove = (cards, player) => {
    // Get context -- who owns this card?
    // Owning player selects cards from opponent
    // These cards are sent to out of play area
}
