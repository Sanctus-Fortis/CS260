import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './builder.css';
import axios from 'axios';

export function Builder() {

  const ProtectedPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const verifyToken = async () => {
        try {
          const response = await fetch('/api/validate', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            navigate('/login');
          }
        } catch (err) {
          console.error('tokin brokin', err);
          navigate('/login');
        }
      };
      verifyToken();
    }, [navigate]);
  
    return (
      <div>
        <h1>You Aren't Supposed To Be Here</h1>
        <p>Login first.</p>
      </div>
    );
  };
  ProtectedPage();

  const [selectedBuild, setSelectedBuild] = useState('new-build');
  const [adventurer, setAdventurer] = useState({
    name: '',
    race: {
      name: '',
      strengthmod: 0,
      dexteritymod: 0,
      constitutionmod: 0,
      intelligencemod: 0,
      wisdommod: 0,
      charismamod: 0,
    },
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
    proficiencies: [],
    equipment: {
      primaryWeapon: '',
      secondaryWeapon: '',
      armor: 'Common Clothing',
    },
  });
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [armor, setArmor] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);
  const [classProficiencies, setClassProficiencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const racesResponse = await fetch('/api/races');
        const classesResponse = await fetch('/api/classes');
        const weaponsResponse = await fetch('/api/weapons');
        const armorResponse = await fetch('/api/armor');
        const classProfResponse = await fetch('/api/classprof');
        const profResponse = await fetch('/api/proficiencies');

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

  const saveAdventurer = async (event) => {
    event.preventDefault();

    const { name } = adventurer;
    const data = JSON.stringify(adventurer);
    const associated_user = JSON.parse(localStorage.getItem('user'))?.username;
    const token = localStorage.getItem('token');

    console.log(token);

    try {
      const response = await axios.post('/api/saveadventurer', { 
        name,
        data,
        associated_user 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Uhh, something went wrong. Try again in incognito mode?');
    }
  };

  const loadBuild = (savedAdventurer) => {
    setAdventurer(savedAdventurer);
    setSelectedBuild('new-build');
  };

  const deleteBuild = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/deleteadventurer', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Name': id,
          'Username': JSON.parse(localStorage.getItem('user'))?.username
        }
      });
      const data = await response.json();
      if (response.ok) {
        getSavedBuilds();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('beepbeepboopboop');
    }
  };

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

  const raceChange = (event) => {
    const { value } = event.target;
    const selectedRace = races.find((race) => race.name === value);
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      race: selectedRace,
    }));
  }

  const calculateModifier = (abilityScore, abilityName) => {
    const raceModifier = adventurer.race[`${abilityName}mod`] || 0;
    const totalScore = abilityScore + raceModifier;
    return 1 + (totalScore - 10) * 0.05;
  };

  const proficiencyChange = (index, event) => {
    const { value } = event.target;
    const selectedProficiency = proficiencies.find((prof) => prof.id === parseInt(value, 10));
    setAdventurer((prevAdventurer) => {
      const newProficiencies = [...prevAdventurer.proficiencies];
      newProficiencies[index] = selectedProficiency;
      return { ...prevAdventurer, proficiencies: newProficiencies };
    });
  };

  const addProficiency = () => {
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      proficiencies: [...prevAdventurer.proficiencies, { id: '', name: '' }],
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

  const getProficiency = (proficiencyId) => {
    return adventurer.proficiencies.some((prof) => prof.id === proficiencyId) ? 1.2 : 1;
  };

  const getWeaponDamage = (weaponName) => {
    const weapon = weapons.find((w) => w.name === weaponName);
    const proficiencyModifier = weapon ? getProficiency(weapon.proficiency_id) : 1;
    return weapon ? weapon.damage * proficiencyModifier : 0;
  };

  const getWeaponArmorValues = (weaponName) => {
    const weaponItem = weapons.find((w) => w.name === weaponName);
    const proficiencyModifier = weaponItem ? getProficiency(weaponItem.proficiency_id) : 1;
    return weaponItem ? {
      reductionMod: weaponItem.reductionmod * proficiencyModifier,
      castingSpeedMod: weaponItem.castingspeedmod,
      castingCostMod: weaponItem.castingcostmod,
    } : {
      reductionMod: 0,
      castingSpeedMod: 1,
      castingCostMod: 1,
    };
  };

  const getArmorValues = (armorName) => {
    const armorItem = armor.find((a) => a.name === armorName);
    const proficiencyModifier = armorItem ? getProficiency(armorItem.proficiency_id) : 1;
    return armorItem ? {
      reductionMod: armorItem.reductionmod * proficiencyModifier,
      castingSpeedMod: armorItem.castingspeedmod,
      castingCostMod: armorItem.castingcostmod,
    } : {
      reductionMod: 0,
      castingSpeedMod: 1,
      castingCostMod: 1,
    };
  };

  const [savedBuilds, setSavedBuilds] = useState([]);
  const [error, setError] = useState('');

  const getSavedBuilds = async () => {
    const token = localStorage.getItem('token');
    console.log(JSON.parse(localStorage.getItem('user'))?.username)
    try {
      console.log('one');
      const response = await fetch('/api/adventurers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Username': JSON.parse(localStorage.getItem('user'))?.username
          }
      });
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        
        setSavedBuilds(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
        setError('beepbeepboopboop');
    }
  }


  const armorReductionValue = (getArmorValues(adventurer.equipment.armor).reductionMod + getWeaponArmorValues(adventurer.equipment.primaryWeapon).reductionMod + getWeaponArmorValues(adventurer.equipment.secondaryWeapon).reductionMod);
  const armorCastSpeedValue = (getArmorValues(adventurer.equipment.armor).castingSpeedMod * getWeaponArmorValues(adventurer.equipment.primaryWeapon).castingSpeedMod * getWeaponArmorValues(adventurer.equipment.secondaryWeapon).castingSpeedMod);
  const armorCastCostValue = (getArmorValues(adventurer.equipment.armor).castingCostMod * getWeaponArmorValues(adventurer.equipment.primaryWeapon).castingCostMod * getWeaponArmorValues(adventurer.equipment.secondaryWeapon).castingCostMod);
  const primaryWeaponDamage = getWeaponDamage(adventurer.equipment.primaryWeapon) || 0;
  const secondaryWeaponDamage = getWeaponDamage(adventurer.equipment.secondaryWeapon) || 0;
  const constitutionModifier = calculateModifier(adventurer.attributes.constitution, 'constitution') || 0;
  const strengthModifier = calculateModifier(adventurer.attributes.strength, 'strength') || 0;

  const hp = 100 * constitutionModifier || 0;
  const damagePrim = primaryWeaponDamage * (strengthModifier) || 0;
  const damageSec = secondaryWeaponDamage * (strengthModifier) || 0;
  const armorValue = armorReductionValue || 0;
  const castingSpeedModifier = calculateModifier(adventurer.attributes.intelligence, 'intelligence') * armorCastSpeedValue || 0;
  const manaCostModifier = calculateModifier(adventurer.attributes.wisdom, 'wisdom') * armorCastCostValue || 0;

  return (
    <main>
      <section id="saved-builds">
        <div className="tabs">
        <button className="tab-button" onClick={() => { 
          showTab('saved-builds'); 
          getSavedBuilds(); 
          }}>
          Saved Builds
        </button>
          <button className="tab-button" onClick={() => showTab('new-build')}>New Build</button>
        </div>
        {selectedBuild === 'saved-builds' && (
          <div className="saved-builds-interior">
          {savedBuilds.length > 0 ? (
            savedBuilds.map((build, index) => {
              let savedAdventurer = JSON.parse(build.data);
              console.log(savedAdventurer);
              return (
                <div key={build.id || index} className="saved-build-card">
                  <h3>{savedAdventurer.name}</h3>
                  <p className="nav">Race: {savedAdventurer.race.name}</p>
                  <p className="nav">Class: {savedAdventurer.class}</p>
                  <p className="nav">Level: {savedAdventurer.level}</p>
                  <button onClick={() => loadBuild(savedAdventurer)}>Load Build</button>
                  <button onClick={() => deleteBuild(savedAdventurer.name)}>Delete</button>
                </div>
              );
            })
          ) : (
            <p>Click "New Build" to start your first build</p>
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
                  <select name="race" value={adventurer.race.name} onChange={raceChange}>
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
                  + {adventurer.race.strengthmod}
                </label>
                <label>
                  Dexterity:
                  <input type="number" name="dexterity" value={adventurer.attributes.dexterity} onChange={attributeChange} />
                  + {adventurer.race.dexteritymod}
                </label>
                <label>
                  Constitution:
                  <input type="number" name="constitution" value={adventurer.attributes.constitution} onChange={attributeChange} />
                  + {adventurer.race.constitutionmod}
                </label>
                <label>
                  Intelligence:
                  <input type="number" name="intelligence" value={adventurer.attributes.intelligence} onChange={attributeChange} />
                  + {adventurer.race.intelligencemod}
                </label>
                <label>
                  Wisdom:
                  <input type="number" name="wisdom" value={adventurer.attributes.wisdom} onChange={attributeChange} />
                  + {adventurer.race.wisdommod}
                </label>
                <label>
                  Charisma:
                  <input type="number" name="charisma" value={adventurer.attributes.charisma} onChange={attributeChange} />
                  + {adventurer.race.charismamod}
                </label>
              </div> 
              <h3>Proficiencies</h3>
              {adventurer.proficiencies.map((proficiency, index) => (
                <label className='skill-row' key={index}>
                  Proficiency {index + 1}:
                  <select name={`proficiency-${index}`} value={proficiency.id} onChange={(event) => proficiencyChange(index, event)}>
                    <option value="">Select Proficiency</option>
                    {proficiencies.map((prof) => (
                      <option key={prof.id} value={prof.id}>{prof.name}</option>
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
              <div className='equipment-row'>
                <label>HP: {hp.toFixed(2)}</label>
                <label>Primary Damage: {damagePrim.toFixed(2)}</label>
                <label>Secondary Damage: {damageSec.toFixed(2)}</label>
                <label>Armor Value: {armorValue.toFixed(2)}</label>
                <label>Casting Speed Modifier: {castingSpeedModifier.toFixed(2)}x</label>
                <label>Mana Cost Reduction: {manaCostModifier.toFixed(2)}x</label>
              </div>
            </form>
            <button className='save-adventurer' onClick={saveAdventurer}>Save Adventurer</button>
          </div>
        )}
      </section>
    </main>
  );
}