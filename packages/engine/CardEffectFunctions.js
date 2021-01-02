// EFFECT FUNCTIONS

export const Recruit = (card) => {
    // Get context -- who owns this card?
    // Owning player selects cards from opponent
    // Call changeOwner
}

export const Remove = (card) => {
    // Get context -- who owns this card?
    // Owning player selects cards from opponent
    // Call moveFromAreaToArea, send from in play to out of play
}

export const Subcontract = () => {
    // Get context -- who owns this card?
    // Owning player gives amount to other player
    // Call addOrSubtractCoin on self, then on opponet
}

// BASE MECHANICS

export const addOrSubtractCoin = (amount, player) => {

}

export const drawCards = (amount, player) => {

}

export const discardFromHand = (amount, player) => {

}

export const discardFromDeck = (amount, player) => {

}

export const destroyCard = (card) => {

}

export const changeOwner = (cards, sourcePlayer, targetPlayer) => {

}

export const transferCards = (cards, sourcePlayer, targetPlayer) => {

}

export const moveFromAreaToArea = (card, player, sourceArea, targetArea) => {

}

export const shuffle = (player) => {

}

export const setCounters = (counters, card) => {

}

export const addOrSubtractCounter = (amount, card) => {

}

export const setMaxCoinPerTurn = (amount) => {

}