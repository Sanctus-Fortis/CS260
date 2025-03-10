

export const fetchData = async () => {
    try {
      const racesResponse = await fetch('/api/races');
      const classesResponse = await fetch('/api/classes');
      const weaponsResponse = await fetch('/api/weapons');
      const armorResponse = await fetch('/api/armor');
  
      const racesData = await racesResponse.json();
      const classesData = await classesResponse.json();
      const weaponsData = await weaponsResponse.json();
      const armorData = await armorResponse.json();
  
      return {
        races: racesData,
        classes: classesData,
        weapons: weaponsData,
        armor: armorData,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  };

// Runs each time the sheet is changed to recalculate the adventurer build.
// Add a calculate button? More use friendly?
// Logic:
// Grab attributes from each field
// Grab race from field

// Apply race attributes to total attributes
  // strength += race.strengthmod
  // dexterity += race.dexteritymod
  // constitution += race.constitutionmod
  // intelligence += race.intelligencemod
  // wisdom += race.wisdommod
  // charisma += race.charismamod

// Get class from field
// Add each proficiency to the skills list
// Get weapon from field
// Add weapon damage to total damage
// Modify total damage based on proficiencies and attributes
// If the weapons is a shield add armor value to total armor
// Get armor from field
// Add armor value to total armor

export const calculateStats = (adventurer) => {
    const totalAttributes = Object.values(adventurer.attributes).reduce((acc, value) => acc + value, 0);
    return {
      totalAttributes,
    };
  };