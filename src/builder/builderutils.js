



export const fetchData = async () => {
    try {
      const racesResponse = await fetch('/api/races');
      const classesResponse = await fetch('/api/classes');
      const weaponsResponse = await fetch('/api/weapons');
      const armorResponse = await fetch('/api/armor');
      const accessoriesResponse = await fetch('/api/accessories');
  
      const racesData = await racesResponse.json();
      const classesData = await classesResponse.json();
      const weaponsData = await weaponsResponse.json();
      const armorData = await armorResponse.json();
      const accessoriesData = await accessoriesResponse.json();
  
      return {
        races: racesData,
        classes: classesData,
        weapons: weaponsData,
        armor: armorData,
        accessories: accessoriesData,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  };

export const calculateStats = (adventurer) => {
    const totalAttributes = Object.values(adventurer.attributes).reduce((acc, value) => acc + value, 0);
    return {
      totalAttributes,
    };
  };