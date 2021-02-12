import { procgen } from "./procgen.js"
import alea from './alea.js';

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

// =================== END TEST STUFF

// ================== CARD ABILITIES

const CardTypes = {
  Hire: "Hire",
  Circumstance: "Circumstance",
  Hustle: "Hustle",
  Lead: "Lead",
  Wares: "Wares"
}

const EffectTypes = {
  WhenPlayed: "WhenPlayed",
  WhenDestroyed: "WhenDestroyed",
  OnPlayerTurn: "OnPlayerTurn",
  OnOpponentTurn: "OnOpponentTurn",
  OnActivate: "OnActivate",
};

const AbilityTypes = {
  Coin: "Coin",
  Draw: "Draw",
  Discard: "Discard",
  Permanent: "Permanent"
};

const PositiveAbilities = [
  {
    name: "Draw",
    abilityType: AbilityTypes.Draw,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
    levels: [
      {
        amount: 1, cost: 0,
        names: {
          [CardTypes.Lead]: "Lead1Draw",
          [CardTypes.Hire]: "Hire1Draw",
          [CardTypes.Wares]: "Wares1Draw",
          [CardTypes.Circumstance]: "Circ1Draw",
          [CardTypes.Hustle]: "Hustle1Draw"
        }
      }, // 1
      {
        amount: 2, cost: 2,
        names: {
          [CardTypes.Lead]: "Lead2Draw",
          [CardTypes.Hire]: "Hire2Draw",
          [CardTypes.Wares]: "Wares2Draw",
          [CardTypes.Circumstance]: "Circ2Draw",
          [CardTypes.Hustle]: "Hustle2Draw"
        }
      }, // 2
      {
        amount: 3, cost: 4,
        names: {
          [CardTypes.Lead]: "Lead3Draw",
          [CardTypes.Hire]: "Hire3Draw",
          [CardTypes.Wares]: "Wares3Draw",
          [CardTypes.Circumstance]: "Circ3Draw",
          [CardTypes.Hustle]: "Hustle3Draw"
        }
      } // 3
    ],
    synergy: 1,
    description: "Draw ${AMT} card(s).",
    function: (amount, player) => {
      // Draw amount cards for player, no interaction from user required
    }
  },
  {
    name: "Profit",
    abilityType: AbilityTypes.Coin,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
    levels: [
      {
        amount: 1, cost: 1, names: {
          [CardTypes.Lead]: "Lead1Profit",
          [CardTypes.Hire]: "Hire1Profit",
          [CardTypes.Hustle]: "Hustle1Profit"
        }
      }, // 1
      {
        amount: 2, cost: 3, names: {
          [CardTypes.Lead]: "Lead2Profit",
          [CardTypes.Hire]: "Hire2Profit",
          [CardTypes.Wares]: "Wares2Profit",
          [CardTypes.Circumstance]: "Circ2Profit",
          [CardTypes.Hustle]: "Hustle2Profit"
        }
      }, // 2
      {
        amount: 3, cost: 5, names: {
          [CardTypes.Lead]: "Lead3Profit",
          [CardTypes.Hire]: "Hire3Profit",
          [CardTypes.Wares]: "Wares3Profit",
          [CardTypes.Circumstance]: "Circ3Profitw",
          [CardTypes.Hustle]: "Hustle3Profit"
        }
      } // 3
    ],
    synergy: 1,
    description: "Gain ${AMT} coin(s).",
    function: (amount, player) => {
      // Give amount coins to player
    }
  },
  {
    name: "Steal",
    abilityType: AbilityTypes.Coin,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Hire, CardTypes.Wares],
    effectType: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
    levels: [
      {
        amount: 1, cost: 3, names: {
          [CardTypes.Hire]: "Hire1Steal",
          [CardTypes.Wares]: "Wares1Steal"
        }
      }, // 1
      {
        amount: 2, cost: 6, names: {
          [CardTypes.Hire]: "Hire2Steal",
          [CardTypes.Wares]: "Wares2Steal",
        }
      } // 2
    ],
    synergy: 1,
    description: "Opponent loses ${AMT} coin(s) and you gain ${AMT} coin(s).",
    function: (amount, player) => {
      // Take amount coins from opponent and give to this player
    }
  },
  {
    name: "Recruit",
    abilityType: AbilityTypes.Permanent,
    rarityFactor: 0.5,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares],
    effectType: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
    levels: [
      {
        amount: 1, cost: 3, names: {
          [CardTypes.Lead]: "Lead1Recruit",
          [CardTypes.Hire]: "Hire1Recruit",
          [CardTypes.Wares]: "Wares1Recruit"
        }
      }, // 1
      {
        amount: 2, cost: 6, names: {
          [CardTypes.Lead]: "Lead2Recruit",
          [CardTypes.Hire]: "Hire2Recruit",
          [CardTypes.Wares]: "Wares2Recruit"
        }
      } // 2
    ],
    synergy: 1,
    description: "Transfer ownership of up to ${AMT} permanents from your opponent to you.",
    function: (amount, player) => {
      // Owning player selects up to amount hires from opponent (they are always going to take as many as are avaiable)
      // Change over and move cards onto player's side
    }
  },
]

const NegativeAbilities = [
  {
    name: "Discard",
    abilityType: AbilityTypes.Discard,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate,
    levels: [
      {
        amount: 1, cost: 2, names: {
          [CardTypes.Lead]: "Lead1Discard",
          [CardTypes.Hire]: "Hire1Discard",
          [CardTypes.Wares]: "Wares1Discard",
          [CardTypes.Circumstance]: "Circ1Discard",
          [CardTypes.Hustle]: "Hustle1Discard"
        }
      }, // 1
      {
        amount: 2, cost: 4, names: {
          [CardTypes.Lead]: "Lead2Discard",
          [CardTypes.Hire]: "Hire2Discard",
          [CardTypes.Wares]: "Wares2Discard",
          [CardTypes.Circumstance]: "Circ2Discard",
          [CardTypes.Hustle]: "Hustle2Discard"
        }
      }, // 2
      {
        amount: 3, cost: 6, names: {
          [CardTypes.Lead]: "Lead3Discard",
          [CardTypes.Hire]: "Hire3Discard",
          [CardTypes.Wares]: "Wares3Discard",
          [CardTypes.Circumstance]: "Circ3Discard",
          [CardTypes.Hustle]: "Hustle3Discard"
        }
      } // 3
    ],
    synergy: 1,
    description: "Discard ${AMT} card(s).",
    function: (amount, player) => {
      // ask player to select amount cards from their hand
      // call discardFromHand on these cards
    }
  },
  {
    name: "Spend",
    abilityType: AbilityTypes.Coin,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
    levels: [
      {
        amount: 1, cost: 1, names: {
          [CardTypes.Lead]: "Lead1Spend",
          [CardTypes.Hire]: "Hire1Spend",
          [CardTypes.Wares]: "Wares1Spend",
          [CardTypes.Hustle]: "Hustle1Spend"
        }
      }, // 1
      {
        amount: 2, cost: 4, names: {
          [CardTypes.Lead]: "Lead2Spend",
          [CardTypes.Hire]: "Hire2Spend",
          [CardTypes.Wares]: "Wares2Spend",
          [CardTypes.Hustle]: "Hustle2Spend"
        }
      }, // 2
      {
        amount: 3, cost: 6, names: {
          [CardTypes.Lead]: "Lead3Spend",
          [CardTypes.Hire]: "Hire3Spend",
          [CardTypes.Wares]: "Wares3Spend",
          [CardTypes.Hustle]: "Hustle3Spend"
        }
      } // 3
    ],
    synergy: 1,
    description: "Lose ${AMT} coin(s).",
    function: (amount, player) => {
      // Player loses amount coins
    }
  },
  {
    name: "Fine",
    abilityType: AbilityTypes.Coin,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
    levels: [
      {
        amount: 1, cost: 1, names: {
          [CardTypes.Wares]: "Wares1Fine",
          [CardTypes.Circumstance]: "Circ1Fine",
          [CardTypes.Hustle]: "Hustle1Fine"
        }
      }, // 1
      {
        amount: 2, cost: 2, names: {
          [CardTypes.Wares]: "Wares2Fine",
          [CardTypes.Circumstance]: "Circ2Fine",
          [CardTypes.Hustle]: "Hustle2Fine"
        }
      }, // 2
      {
        amount: 3, cost: 3, names: {
          [CardTypes.Wares]: "Wares3Fine",
          [CardTypes.Circumstance]: "Circ3Fine",
          [CardTypes.Hustle]: "Hustle3Fine"
        }
      } // 3
    ],
    synergy: 1,
    description: "Lose ${AMT} coin(s).",
    function: (amount, player) => {
      // Player loses amount coins
    }
  },
]

// =================== END CARD ABILITIES

const cardLevels = [1, 2, 3];
const cardLevelFactors = [45, 35, 20].map(n => n / 100);

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
  for (let i = 0; i < rarities.length; i++) {
    if (rarities[i] == stats.rarity) {
      cardRarityModifier = i;
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
  let startingNegativePoints = numberOfPoints - cardRarityModifier; // subtract remaining positive points so negative is less
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
  abilities.forEach(inc => {
    name = name + " " + inc.ability.levels[inc.level].names[cardType];
  })
  name = name.trim();

  const alreadyExists = createdCardArray.filter(card => name == card.name || shortText == card.shortText).length > 0;

  const card = {
    name: name,
    rarity: stats.rarity,
    numberOfPositiveAbilities: numberOfPositiveAbilities,
    numberOfNegativeAbilities: numberOfNegativeAbilities,
    chosenPositiveAbilities,
    chosenNegativeAbilities,
    pointValue: numberOfPoints - startingNegativePoints,
    positivePoints: numberOfPoints,
    negativePoints: startingNegativePoints,
    cardLevel: cardLevel,
    text: text,
    shortText: shortText,
    type: cardType,
    abilities: abilities,
    duplicate: alreadyExists
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
  if (!hasAbilities || increment >= 10) {
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
    if (chosenPositiveAbilities.length > 0
      && chosenPositiveAbilities.filter(abi => abi.name == ability.name || abi.abilityType === ability.abilityType).length > 0) {
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
    if (chosenNegativeAbilities.filter(abi => abi.name === ability.name ||
        abi.abilityType === ability.abilityType).length > 0 ||
        chosenPositiveAbilities.filter(abi => abi.abilityType === ability.abilityType).length > 0
    ) {
      foundAppropriateAbility = false;
    }
    else{
      console.log(ability.abilityType);
      for (let i = ability.levels.length - 1; i >= 0; i--) {
        if (ability.levels[i].cost <= points) {
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

console.log(deck);
console.log("Made a series with", testDeckSize, "attempted. Generated", deck.length, "cards");
if (createdCardArray.length < testDeckSize) {
  console.log("Try adding more unique card effects to increase likelihood of successful generation");
}
console.log(deck.map(d => d.name));