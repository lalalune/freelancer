import { procgen } from "./procgen.js"
import alea from './alea.js';
import GameData from "./GameData.js";


const {
  PositiveAbilities,
  NegativeAbilities,
  AbilityTypes,
  CardTypes,
  EffectTypes
} = GameData;

// =================== TEST STUFF

const _testHash = "QmaBDgByQgwTuCBFdnRzRESYd5puE9SwE5u6sSZ7vVSjvE";
const testDeckSize = 1000;

const rarities = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
];

// =================== END CARD ABILITIES

const cardLevels = [1, 2, 3, 4];
const cardLevelFactors = [45, 35, 18, 2].map(n => n / 100);

const cardTypes = [CardTypes.Hire, CardTypes.Lead, CardTypes.Hustle, CardTypes.Wares, CardTypes.Circumstance]
const cardTypeFactors = [27, 22, 22, 17, 12].map(n => n / 100);

const numberOfPositiveAbilitiesTable = [1, 2];
const numberOfPositiveAbilitiesFactors = [99, 1].map(n => n / 100);

const numberOfNegativeAbilitiesTable = [1, 2];
const numberOfNegativeAbilitiesFactors = [99.5, .5].map(n => n / 100);

const getTableOutput = ((randomNumber, table, factors) => {
  let totalFactor = 0;
  for (let i = 0; i < factors.length; i++) {
    totalFactor += factors[i];
    if (randomNumber <= totalFactor) {
      return table[i];
    }
  }
  return table[table.length - 1];
});

function generateCardStats({
  art,
  stats,
}, createdCardArray = []) {
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

  let cardRarityModifier = 0;
  let cardRarity = "";
  for (let i = 0; i < rarities.length; i++) {
    if (rarities[i] == stats.rarity) {
      cardRarityModifier = i;
      cardRarity = stats.rarity;
      break;
    }
  }

  let cardLevel = getTableOutput(levelCoef, cardLevels, cardLevelFactors);
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

  let abilities = [];

  let numberOfPoints = 0;

  let remainingCardLevel = cardLevel;
  let chosenPositiveAbilities = [];
  for (let abilitySlot = 0; abilitySlot < numberOfPositiveAbilities; abilitySlot++) {
    const ability = findAppropriateAbility({
      abilitySlot,
      maxCardLevel: remainingCardLevel,
      numberOfCardLevels: numberOfPositiveAbilities,
      increment: 0,
      numberOfPoints,
      abilityCoefs: positiveAbilityCoefs,
      abilities: allowedPositiveAbilities,
      chosenPositiveAbilities,
      chosenNegativeAbilities: [],
      isPositive: true
    })
    chosenPositiveAbilities = ability.chosenPositiveAbilities;

    numberOfPoints += ability.points;
    remainingCardLevel = remainingCardLevel - ability.level;
    if (ability.ability != null)
      abilities.push({ name: ability.ability.name, level: ability.level, ability: ability.ability })
  }

  let negativePoints = numberOfPoints - cardRarityModifier; // subtract remaining positive points so negative is less
  // let startingNegativePoints = numberOfPoints - cardRarityModifier; // subtract remaining positive points so negative is less
  let chosenNegativeAbilities = [];

  remainingCardLevel = cardLevel;
  let abilitySlot = 0;
  while (abilitySlot <= 3 && negativePoints > 0) {
    abilitySlot++;
    const ability = findAppropriateAbility({
      abilitySlot,
      maxCardLevel: remainingCardLevel,
      numberOfCardLevels: numberOfNegativeAbilities,
      increment: 0,
      numberOfPoints: negativePoints,
      abilityCoefs: negativeAbilityCoefs,
      abilities: allowedNegativeAbilities,
      chosenPositiveAbilities,
      chosenNegativeAbilities,
      isPositive: false
    })
    chosenNegativeAbilities = [...ability.chosenNegativeAbilities];

    negativePoints = ability.points;
    remainingCardLevel = remainingCardLevel - ability.level;
    if (ability.ability != null)
      abilities.push({ name: ability.ability.name, level: ability.level, ability: ability.ability })
  }

  let text = "";
  abilities.forEach(inc => {
    text = text + " " + inc.ability.description
      .replace(/\$\{AMT\}/g, inc.ability.levels[inc.level].amount)
      .replace("(s)", inc.level > 0 ? "s" : "");
  })
  text = text.trim();

  let shortText = "";
  abilities.forEach(inc => {
    shortText = shortText + " " + inc.ability.name + " " + inc.ability.levels[inc.level].amount + " (L" + (inc.level + 1) + ")";
  })
  shortText = shortText.trim();

  let name = "";

  for(let i = 0; i < abilities.length; i++){
    switch(i){
      case 0:
        // If more than one ability, start with adjective, otherwise just use noun
        name += abilities.length > 1 ?
        abilities[i].ability.levels[abilities[i].level].names[cardType].adjective :
        abilities[i].ability.levels[abilities[i].level].names[cardType].noun;
        break;
      case 1:
        name = name + " " + abilities[i].ability.levels[abilities[i].level].names[cardType].noun
        break;
      case 2:
        name = name + " " + abilities[i].ability.levels[abilities[i].level].names[cardType].of
        break;
      default:
        name = name + " WARNING:extra word";
    }
  }
  
  name = name.trim();
  const alreadyExists = createdCardArray.filter(card => name == card.name || shortText == card.shortText).length > 0;
  name = name.replace(/[0-9]/g, '');

  if(cardRarity === 'legendary'){
    // Roll one of the legendaries
    const legendaryCoef = stats.luck / 255;
    const legendaryFactors = new Array(GameData.Legendaries[cardType].length).fill(0).map(n => n = 1 / GameData.Legendaries[cardType].length);
    const legendaryType = getTableOutput(legendaryCoef, GameData.Legendaries[cardType], legendaryFactors);
    name = legendaryType.name + ", " + name;
  }

  const card = {
    name: name,
    rarity: stats.rarity,
    cardLevel: cardLevel,
    text: text,
    shortText: shortText,
    type: cardType,
    abilities: abilities,
    duplicate: alreadyExists,

    // background: "",
    // border: ""
  }

  createdCardArray.push(card);

  return card;
}

function findAppropriateAbility(
  { abilitySlot,
    maxCardLevel,
    numberOfCardLevels,
    increment,
    numberOfPoints,
    abilityCoefs,
    abilities,
    chosenPositiveAbilities,
    chosenNegativeAbilities,
    isPositive = true
  }) {

  const rng = increment > 0 ? alea(increment) : null;
  const incrementCoefficient = increment > 0 ? rng() : null;
  const abilityCoef = abilityCoefs[abilitySlot];
  const abilityCoefficient = increment === 0 ? abilityCoef : (abilityCoef + incrementCoefficient) / 2.0;

  const hasAbilities = abilities && abilities.map(ability => ability.rarityFactor).length > 0;
  // If we're too many levels deep
  if (!hasAbilities || increment >= 20) {
    return {
      ability: null,
      level: 0,
      points: numberOfPoints,
      chosenPositiveAbilities,
      chosenNegativeAbilities
    }
  }

  // Map available abilities to random number
  const table = abilities.map(ability => ability.name);

  const totalFactors = 100 / abilities.map(ability => ability.rarityFactor).reduce((acc, inc) => acc + inc);

  const factors = abilities.map(ability => ability.rarityFactor * totalFactors);

  // If we're incrementing, let's add 1/4 of our increment coefficient to our ability coefficient in either direction to alter it
  const incrementCoef = increment === 0 ? 0 : incrementCoefficient / (abilityCoefficient > .5 ? -4.0 : 4.0);

  const result = getTableOutput((abilityCoefficient + incrementCoef) * 100, table, factors);

  const ability = abilities.filter(ability => ability.name === result)[0];

  let foundAppropriateAbility = false;
  let level = maxCardLevel - (numberOfCardLevels - 1);
  let points = numberOfPoints;

  if (isPositive) {
    // If our card ends up with more than one positive ability, filter out abilities that overlap with affect type
    if (chosenPositiveAbilities.filter(abi => abi.abilityType === ability.abilityType).length > 0)
      {
      foundAppropriateAbility = false;
    } else {
      const highestLevel = Math.min(maxCardLevel, ability.levels.length);
      points = ability.levels[highestLevel].cost;
      foundAppropriateAbility = true;
      level = highestLevel;
      chosenPositiveAbilities.push(ability);
    }
  }
  // Handle negative abilities
  else {
    if (chosenNegativeAbilities.filter(abi => abi.abilityType === ability.abilityType).length > 0 ||
      chosenPositiveAbilities.filter(abi => abi.abilityType === ability.abilityType).length > 0
    ) {
      foundAppropriateAbility = false;
    }
    else {
      for (let i = ability.levels.length - 1; i >= 0; i--) {
        if (ability.levels[i].cost > points) continue;
          // If this satisfies our point count perfectly, use it, otherwise look again
          // If we've looked a bunch and still can't find a good result, recurse with any point count
          // This might end up with two negative effects, which is interesting as long as it's rare
          if (increment <= 10 && numberOfPoints - ability.levels[i].cost === 0) {
            points = numberOfPoints - ability.levels[i].cost;
            chosenNegativeAbilities.push(ability);
            foundAppropriateAbility = true;
            level = i;
            break;
          }
      }
    }
  }


  if (foundAppropriateAbility) {
    return {
      ability,
      level,
      points,
      chosenPositiveAbilities,
      chosenNegativeAbilities
    }
  }
  // If we didn't find an ability, try again
  return findAppropriateAbility({
    abilitySlot,
    maxCardLevel,
    numberOfCardLevels,
    increment: increment + 1,
    numberOfPoints,
    abilityCoefs,
    abilities,
    chosenPositiveAbilities,
    chosenNegativeAbilities,
    isPositive
  });
}

const result = procgen(_testHash, testDeckSize);
const deck = [];
let createdCardArray = [];
result.forEach(generatedCard => {
  const card = generateCardStats(generatedCard, createdCardArray)
  if (!card.duplicate) deck.push(card);
})

console.log("Made a series with", testDeckSize, "attempted. Generated", deck.length, "cards");
if (createdCardArray.length < testDeckSize) {
  console.log("Try adding more unique card effects to increase likelihood of successful generation");
}
console.log(deck);
console.log(deck.map(d => d.name));