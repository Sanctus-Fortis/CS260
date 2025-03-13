import React, { useState, useEffect } from 'react';
import './builder.css';

export function Builder() {
  const [selectedBuild, setSelectedBuild] = useState('saved-builds');
  const [adventurer, setAdventurer] = useState({
    name: '',
    race: '',
    class: '',
    level: 1,
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    proficiencies: [''],
    equipment: {
      primaryWeapon: '',
      secondaryWeapon: '',
      armor: '',
    },
  });
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [armor, setArmor] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);
  const [classProficiencies, setClassProficiencies] = useState([]);

  useEffect(() => {
    if (selectedBuild === 'saved-builds') {
      loadSavedBuilds();
    }
  }, [selectedBuild]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const racesResponse = await fetch('http://localhost:5000/api/races');
        const classesResponse = await fetch('http://localhost:5000/api/classes');
        const weaponsResponse = await fetch('http://localhost:5000/api/weapons');
        const armorResponse = await fetch('http://localhost:5000/api/armor');
        const classProfResponse = await fetch('http://localhost:5000/api/classprof');
        const profResponse = await fetch('http://localhost:5000/api/proficiencies');

        if (!racesResponse.ok) throw new Error('Failed to fetch races');
        if (!classesResponse.ok) throw new Error('Failed to fetch classes');
        if (!weaponsResponse.ok) throw new Error('Failed to fetch weapons');
        if (!armorResponse.ok) throw new Error('Failed to fetch armor');
                
        const racesData = await racesResponse.json();
        const classesData = await classesResponse.json();
        const weaponsData = await weaponsResponse.json();
        const armorData = await armorResponse.json();
        const profData = await profResponse.json();
        const classProfData = await classProfResponse.json();

        setRaces(racesData);
        setClasses(classesData);
        setWeapons(weaponsData);
        setArmor(armorData);
        setProficiencies(profData);
        setClassProficiencies(classProfData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showTab = (tab) => {
    setSelectedBuild(tab);
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      [name]: value,
    }));
  };

  const attributeChange = (event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      attributes: {
        ...prevAdventurer.attributes,
        [name]: parseInt(value, 10),
      },
    }));
  };

  const proficiencyChange = (index, event) => {
    const { value } = event.target;
    setAdventurer((prevAdventurer) => {
      const newProficiencies = [...prevAdventurer.proficiencies];
      newProficiencies[index] = value;
      return { ...prevAdventurer, proficiencies: newProficiencies };
    });
  };

  const addProficiency = () => {
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      proficiencies: [...prevAdventurer.proficiencies, ''],
    }));
  };

  const equipmentChange = (event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      equipment: {
        ...prevAdventurer.equipment,
        [name]: value,
      },
    }));
  };

  const saveAdventurer = () => {
    const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
    savedBuilds.push(adventurer);
    localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
    alert('Adventurer saved!');
  };

  const loadSavedBuilds = () => {
    const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
    setSavedBuilds(savedBuilds);
  };

  return (
    <main>
      <section id="saved-builds">
        <div className="tabs">
          <button className="tab-button" onClick={() => showTab('saved-builds')}>Saved Builds</button>
          <button className="tab-button" onClick={() => showTab('new-build')}>New Build</button>
        </div>
        {selectedBuild === 'saved-builds' && (
          <div className="saved-builds-interior">
            {savedBuilds.length > 0 ? (
              savedBuilds.map((build, index) => (
                <div key={index} className="build">
                  <p>Build: {build.name}</p>
                  <p>Class: {build.class}</p>
                  <p>Race: {build.race}</p>
                  <p>Level: {build.level}</p>
                  <button onClick={() => setAdventurer(build)}>Load</button>
                </div>
              ))
            ) : (
              <p>No saved builds found.</p>
            )}
          </div>
        )}
        {selectedBuild === 'new-build' && (
          <div className="new-build-interior">
            <h2>New Build</h2>
            <form>
              <div className="head-row">
                <label>
                  Name:
                  <input type="text" name="name" value={adventurer.name} onChange={inputChange} />
                </label>
                <label>
                  Race:
                  <select name="race" value={adventurer.race} onChange={inputChange}>
                    <option value="">Select Race</option>
                    {races.map((race) => (
                      <option key={race.name} value={race.name}>{race.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Class:
                  <select name="class" value={adventurer.class} onChange={inputChange}>
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.name} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Level:
                  <input type="number" name="level" value={adventurer.level} onChange={inputChange} />
                </label>
              </div>
              <h3>Attributes</h3>
              <div className="attributes-row">
                <label>
                  Strength:
                  <input type="number" name="strength" value={adventurer.attributes.strength} onChange={attributeChange} />
                </label>
                <label>
                  Dexterity:
                  <input type="number" name="dexterity" value={adventurer.attributes.dexterity} onChange={attributeChange} />
                </label>
                <label>
                  Constitution:
                  <input type="number" name="constitution" value={adventurer.attributes.constitution} onChange={attributeChange} />
                </label>
                <label>
                  Intelligence:
                  <input type="number" name="intelligence" value={adventurer.attributes.intelligence} onChange={attributeChange} />
                </label>
                <label>
                  Wisdom:
                  <input type="number" name="wisdom" value={adventurer.attributes.wisdom} onChange={attributeChange} />
                </label>
                <label>
                  Charisma:
                  <input type="number" name="charisma" value={adventurer.attributes.charisma} onChange={attributeChange} />
                </label>
              </div> 
              <h3>Proficiencies</h3>
              <h3>Proficiencies</h3>
              {adventurer.proficiencies.map((proficiency, index) => (
                <label className='skill-row' key={index}>
                  Proficiency {index + 1}:
                  <select name={`proficiency-${index}`} value={proficiency} onChange={(event) => proficiencyChange(index, event)}>
                    <option value="">Select Proficiency</option>
                    {proficiencies.map((prof) => (
                      <option key={prof.name} value={prof.name}>{prof.name}</option>
                    ))}
                  </select>
                </label>
              ))}
              <button className='skill-row' type="button" onClick={addProficiency}>Add Skill</button>
              <h3>Equipment</h3>
              <div className='equipment-row'>
                <label>
                  Primary Weapon:
                  <select name="primaryWeapon" value={adventurer.equipment.primaryWeapon} onChange={equipmentChange}>
                    <option value="">Select Primary Weapon</option>
                    {weapons.map((weapon) => (
                      <option key={weapon.name} value={weapon.name}>{weapon.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Secondary Weapon:
                  <select name="secondaryWeapon" value={adventurer.equipment.secondaryWeapon} onChange={equipmentChange}>
                    <option value="">Select Secondary Weapon</option>
                    {weapons.map((weapon) => (
                      <option key={weapon.name} value={weapon.name}>{weapon.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Armor:
                  <select name="armor" value={adventurer.equipment.armor} onChange={equipmentChange}>
                    <option value="">Select Armor</option>
                    {armor.map((arm) => (
                      <option key={arm.name} value={arm.name}>{arm.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </form>
            <button className='save-adventurer' onClick={saveAdventurer}>Save Adventurer</button>
          </div>
        )}
      </section>
    </main>
  );
}