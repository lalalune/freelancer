import { procgen } from "./procgen.js"
import { CardTypes } from "@freelancer-ccg/engine/CardTypes.mjs"
import { PositiveAbilities, NegativeAbilities } from "@freelancer-ccg/engine/CardAbilities.mjs";
import alea from 'aleaprng';

// ================== END PROCGEN

const _testHash = "QmaBDgByQgwTuCBFdnRzRESYd5puE9SwE5u6sSZ7vVSjvE";
const testDeckSize = 40;

const cardLevel = [1, 2, 3, 4, 5];
const cardLevelFactors = [15, 25, 25, 20, 10].map(n => n / 100);

const cardTypes = [CardTypes.Hire, CardTypes.Lead, CardTypes.Hustle, CardTypes.Wares, CardTypes.Circumstance]
const cardTypeFactors = [27, 22, 22, 17, 12].map(n => n / 100);

const numberOfPositiveAbilitiesTable = [1, 2, 3];
const numberOfPositiveAbilitiesFactors = [90, 9, 1].map(n => n / 100);

const numberOfNegativeAbilitiesTable = [1, 2, 3];
const numberOfNegativeAbilitiesFactors = [95, 4.5, .5].map(n => n / 100);

// const alignments = ['evil', 'bad', 'neutral', 'good', 'heroic'];
// const alignmentColors = ['black', 'red', 'purple', 'blue', 'white'];
// const alignmentEffects = [-.2, -.1, 0, .1, .2];
// const alignmentFactors = [2.5, 22.5, 50, 22.5, 2.5];

const getTableOutput = ((randomNumber, table, factors) => {
  let totalFactor = 0;
  for (let i = 0; i < factors.length; i++) {
    totalFactor += factors[i];
    if (randomNumber <= totalFactor) {
      return table[i];
    }
  }
  return table[table.length-1];
});

const rarities = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
];

function findAppropriateAbility(abilitySlot, increment, numberOfPoints, abilityCoefs, abilities){
  console.log("Looking for ability that is", numberOfPoints, "points")
  const rng = increment > 0 ? alea(increment) : null;
  const abilityCoef = abilityCoefs[abilitySlot];
  const abilityCoefficient = increment === 0 ? abilityCoef : (abilityCoef + rng()) / 2.0;


  console.log("Ability coefficient is", abilityCoefficient);
  // Map available abilities to random number

  const table = abilities.map(ability => ability.name);
  const hasAbilities = abilities.map(ability => ability.rarityFactor).length > 0;


  // If we're too many levels deep
  if(!hasAbilities || numberOfPoints === 0 || increment > 5) {
    return {
      ability: null,
      level: 0,
      pointsRemaining: numberOfPoints
    }
  }
  const totalFactors = 100 / abilities.map(ability => ability.rarityFactor).reduce((acc, inc) => acc + inc);

  const factors = abilities.map(ability => ability.rarityFactor * totalFactors);

  const result = getTableOutput(abilityCoefficient, table, factors);

  const ability = abilities.filter(ability => ability.name === result)[0];

  const numberOfLevels = ability.levels.length;

  let foundAppropriateAbility = false;
  let level = 1;
  let pointsRemaining = numberOfPoints;
  for(let i = numberOfLevels - 1; i >= 0; i-- ){
    if(ability.levels[i].cost <= pointsRemaining){
      pointsRemaining = numberOfPoints - ability.levels[i].cost;
      foundAppropriateAbility = true;
      level = i;
      console.log("Chose level", level+1, ability.name, "for card ability slot", abilitySlot);
      console.log("foundAppropriateAbility is", foundAppropriateAbility)
      break;
    }
  }

  if(foundAppropriateAbility) {
    return {
      ability,
      level,
      pointsRemaining
    }
  }
  return findAppropriateAbility(abilitySlot, increment + 1, numberOfPoints, abilityCoefs, abilities);
}

function generateCardStats ({
  art,
  stats,
}){
  // Mappings
  const levelCoef = stats.level / 255; // Max level of card abilities
  const positiveAbilitiesNumberCoef = stats.hp / 255; // Max number of positive abilities
  const negativeAbilitiesNumberCoef = stats.mp / 255; // Max number of negative abilities
  
  const typeCoef = stats.details[0]; // Card type
  // const alignmentCoef = art.color2; // Alignment toward abilities that help or hurt

  const positiveAbilityCoefs = [stats.attack, stats.magic, stats.accuracy].map(n => n / 255); // Positive abilities
  const negativeAbilityCoefs = [stats.defense, stats.magicDefense, stats.evasion].map(n => n / 255); // Negative abilities

  // const backgroundCoef = art.color; 
  // const borderCoef = art.color; 

  // Compute card type
  const cardType = getTableOutput(typeCoef, cardTypes, cardTypeFactors);


console.log("Rarity is", stats.rarity);

  let cardRarityModifier = 0;
  for(let i = 0; i < rarities.length; i++){
    if(rarities[i] == stats.rarity){
      cardRarityModifier = i;
      break;
    }
  }

  const points = getTableOutput(levelCoef, cardLevel, cardLevelFactors);
  // Compute positive points as level + rarity
  // Compute negative points as level

  // Compute number of positive abilities
  const numberOfPositiveAbilities = getTableOutput(positiveAbilitiesNumberCoef, numberOfPositiveAbilitiesTable, numberOfPositiveAbilitiesFactors);
  // Compute number of negative abilities
  const numberOfNegativeAbilities = getTableOutput(negativeAbilitiesNumberCoef, numberOfNegativeAbilitiesTable, numberOfNegativeAbilitiesFactors);

  // Get all positive abilities that are allowed for this card type
  const allowedPositiveAbilities = PositiveAbilities.filter(ability =>
    ability.allowedCardTypes.includes(cardType)
  )

  // Get all positive abilities that are allowed for this card type
  const allowedNegativeAbilities = NegativeAbilities.filter(ability =>
    ability.allowedCardTypes.includes(cardType)
  )

  const startingPositivePoints = points + cardRarityModifier;

  let positivePoints = points + cardRarityModifier;

  let abilities = []
  
  for (let a = 0; a < numberOfPositiveAbilities; a++){
    const ability = findAppropriateAbility(a, 0, positivePoints, positiveAbilityCoefs, allowedPositiveAbilities)
    positivePoints = ability.pointsRemaining;
    if(ability.ability != null)
      abilities.push({ name: ability.ability.name, level: ability.level, ability: ability.ability })
  }
  const startingNegativePoints = points - positivePoints;

  let negativePoints = points - positivePoints; // subtract remaining positive points so negative is less

    // For # of positive abilities
  // Choose first ability allowed on this card type that is max level under available points
  // If more than one, for each next choose ability that fits card type
  // If any points left over, add to positiveScoreOffset

  // If our card has any remaining points
  if(negativePoints > 0)
    for (let a = 0; a < numberOfNegativeAbilities; a++){
      const ability = findAppropriateAbility(a, 0, negativePoints, negativeAbilityCoefs, allowedNegativeAbilities)
      negativePoints = ability.pointsRemaining;
      if(ability.ability != null)
      abilities.push({ name: ability.ability.name, level: ability.level, ability: ability.ability })
    }

  // Subtract positive score offset from negative if it exists

  // Compute # negative abilities up to max value that balances positive score
  // If more than one, for each next choose ability that fits card type

  let text = "";
  abilities.forEach(inc => {
    text = text + " " + inc.ability.description
    .replace("${AMT}", inc.ability.levels[inc.level].amount)
    .replace("(s)", inc.level > 0 ? "s" : "");
  })
  text = text.trim();

  let shortText = "";
  abilities.forEach(inc => {
    shortText = shortText + " " + inc.ability.name + " " + inc.ability.levels[inc.level].amount + " (L" + (inc.level+1) + ")";
  })
  shortText = shortText.trim();

  let name = "";
  abilities.forEach(inc => {
    name = name + " " + inc.ability.levels[inc.level].names[cardType];
  })
  name = name.trim();

  return {
    name: name,
    rarity: stats.rarity,
    text: text,
    shortText: shortText,
    type: cardType,
    abilities: abilities,
    // background: "",
    // border: ""
  }
}

const result = procgen(_testHash, testDeckSize);
const deck = [];
result.forEach(generatedCard => {
  deck.push(generateCardStats(generatedCard));
})

console.log("Made a series with", testDeckSize, "cards in it:");
console.log(deck);