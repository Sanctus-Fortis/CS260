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
    skills: [''],
    equipment: {
      primaryWeapon: '',
      secondaryWeapon: '',
      primaryShield: '',
      secondaryShield: '',
      armor: '',
      accessoryOne: '',
      accessoryTwo: '',
      accessoryThree: '',
    },
  });
  const [savedBuilds, setSavedBuilds] = useState([]);

  useEffect(() => {
    if (selectedBuild === 'saved-builds') {
      loadSavedBuilds();
    }
  }, [selectedBuild]);

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

  const skillChange = (index, event) => {
    const { value } = event.target;
    setAdventurer((prevAdventurer) => {
      const newSkills = [...prevAdventurer.skills];
      newSkills[index] = value;
      return { ...prevAdventurer, skills: newSkills };
    });
  };

  const addSkill = () => {
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      skills: [...prevAdventurer.skills, ''],
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
                    <option value="Human">Human</option>
                    <option value="Elf">Elf</option>
                    <option value="Dwarf">Dwarf</option>
                    <option value="Halfling">Halfling</option>
                    <option value="Half-Orc">Half-Orc</option>
                    <option value="Half-Dwarf">Half-Dwarf</option>
                    <option value="Half-Elf">Half-Elf</option>
                  </select>
                </label>
                <label>
                  Class:
                  <select name="class" value={adventurer.class} onChange={inputChange}>
                    <option value="">Select Class</option>
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Druid">Druid</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Mage">Mage</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Thief">Thief</option>
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
              <h3>Skills</h3>
              {adventurer.skills.map((skill, index) => (
                <label className='skill-row' key={index}>
                  Skill {index + 1}:
                  <input type="text" value={skill} onChange={(event) => skillChange(index, event)} />
                </label>
              ))}
              <button className='skill-row' type="button" onClick={addSkill}>Add Skill</button>
              <h3>Equipment</h3>
              <div className='equipment-row'>
              <label>
                Primary Weapon:
                <select name="primaryWeapon" value={adventurer.equipment.primaryWeapon} onChange={equipmentChange}>
                  <option value="">Select Primary Weapon</option>
                  <option value="dagger">Dagger</option>
                  <option value="shortsword">Shortsword</option>
                  <option value="armingSword">Arming Sword</option>
                  <option value="longsword">Longsword</option>
                  <option value="greatsword">Greatsword</option>
                  <option value="handAxe">Hand Axe</option>
                  <option value="battle Axe">Battle Axe</option>
                  <option value="daneAxe">Dane Axe</option>
                  <option value="club">Club</option>
                  <option value="flangedMace">Flanged Mace</option>
                  <option value="morningstar">Morningstar</option>
                  <option value="warhammer">Warhammer</option>
                  <option value="maul">Maul</option>
                  <option value="javelin">Javelin</option>
                  <option value="shortSpear">Short Spear</option>
                  <option value="longSpear">long Spear</option>
                  <option value="quarterstaff">Quarterstaff</option>
                  <option value="shortbow">Shortbow</option>
                  <option value="recurveBow">Recurve Bow</option>
                  <option value="longbow">Longbow</option>
                  <option value="crossbow">Crossbow</option>
                  <option value="sling">Sling</option>
                  <option value="blowgun">Blowgun</option>
                  <option value="focusStaff">Focus Staff</option>
                  <option value="grimoire">Grimoire</option>
                  <option value="orb">Orb</option>
                  <option value="quartz">Quartz</option>
                  <option value="gnarledBranch">Gnarled Branch</option>
                  <option value="scripture">Scripture</option>
                  <option value="holySymbol">Holy Symbol</option>
                </select>
              </label>
              <label>
                Primary Shield:
                <select name="primaryShield" value={adventurer.equipment.primaryShield} onChange={equipmentChange}>
                  <option value="">Select Right Weapon</option>
                  <option value="">None</option>
                  <option value="round">Round</option>
                  <option value="heater">Heater</option>
                  <option value="heater">Kite</option>
                </select>
              </label>
              <label>
                Left Weapon:
                <select name="leftWeapon" value={adventurer.equipment.secondaryWeapon} onChange={equipmentChange}>
                <option value="">Select Secondary Weapon</option>
                  <option value="dagger">Dagger</option>
                  <option value="shortsword">Shortsword</option>
                  <option value="armingSword">Arming Sword</option>
                  <option value="longsword">Longsword</option>
                  <option value="greatsword">Greatsword</option>
                  <option value="handAxe">Hand Axe</option>
                  <option value="battle Axe">Battle Axe</option>
                  <option value="daneAxe">Dane Axe</option>
                  <option value="club">Club</option>
                  <option value="flangedMace">Flanged Mace</option>
                  <option value="morningstar">Morningstar</option>
                  <option value="warhammer">Warhammer</option>
                  <option value="maul">Maul</option>
                  <option value="javelin">Javelin</option>
                  <option value="shortSpear">Short Spear</option>
                  <option value="longSpear">long Spear</option>
                  <option value="quarterstaff">Quarterstaff</option>
                  <option value="shortbow">Shortbow</option>
                  <option value="recurveBow">Recurve Bow</option>
                  <option value="longbow">Longbow</option>
                  <option value="crossbow">Crossbow</option>
                  <option value="sling">Sling</option>
                  <option value="blowgun">Blowgun</option>
                  <option value="focusStaff">Focus Staff</option>
                  <option value="grimoire">Grimoire</option>
                  <option value="orb">Orb</option>
                  <option value="quartz">Quartz</option>
                  <option value="gnarledBranch">Gnarled Branch</option>
                  <option value="scripture">Scripture</option>
                  <option value="holySymbol">Holy Symbol</option>
                </select>
              </label>
              <label>
                Armor:
                <select name="armor" value={adventurer.equipment.armor} onChange={equipmentChange}>
                  <option value="">Select Armor</option>
                  <option value="commonClothing">Common Clothing</option>
                  <option value="gambeson">Gambeson</option>
                  <option value="chain">Chain</option>
                  <option value="brigandine">Brigandine</option>
                  <option value="noviceMageRobes">Novice Mage Robes</option>
                  <option value="robesOfTheIllusionist">Robes Of The Illusionist</option>
                  <option value="robesOfTheEvoker">Robes Of The Evoker</option>
                  <option value="robesOfTheDiviner">Robes Of The Diviner</option>
                  <option value="deaconRobes">Deacon Robes</option>
                  <option value="spysVestment">Spy's Vestment</option>
                  <option value="thiefsGarb">Thief's Garb</option>
                  <option value="assassinsRaiment">Assassin's Raiment</option>
                </select>
              </label>
              <label>
                Accessory One:
                <select name="accessoryOne" value={adventurer.equipment.accessoryOne} onChange={equipmentChange}>
                  <option value="">Select Accessory One</option>
                  <option value="ring">Ring</option>
                  <option value="amulet">Amulet</option>
                  <option value="bracelet">Bracelet</option>
                </select>
              </label>
              <label>
                Accessory Two:
                <select name="accessoryTwo" value={adventurer.equipment.accessoryTwo} onChange={equipmentChange}>
                  <option value="">Select Accessory Two</option>
                  <option value="ring">Ring</option>
                  <option value="amulet">Amulet</option>
                  <option value="bracelet">Bracelet</option>
                </select>
              </label>
              <label>
                Accessory Three:
                <select name="accessoryThree" value={adventurer.equipment.accessoryThree} onChange={equipmentChange}>
                  <option value="">Select Accessory Three</option>
                  <option value="ring">Ring</option>
                  <option value="amulet">Amulet</option>
                  <option value="bracelet">Bracelet</option>
                </select>
              </label>
              <h3>Statistics</h3>
                <label>
                  Primary Damage:
                </label>
                <label>
                  Secondary Damage:
                </label>
                <label>
                  Armor Reduction:
                </label>
                <label>
                  Health Points:
                </label>
                <label>
                  Casting Speed Modifier:
                </label>
                <label>
                  Mana Cost Modifier:
                </label>
                <label>
                  Price Reduction:
                </label>
                <label>
                  Movement Modifier:
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