import React, { useState } from 'react';
import './builder.css';

export function Builder() {
  const [selectedBuild, setSelectedBuild] = useState('saved-builds');
  const [stats, setStats] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  const [equipment, setEquipment] = useState({
    weaponOne: '',
    weaponTwo: '',
    armor: '',
    helmet: '',
    accessoryOne: '',
    accessoryTwo: ''
  });

  const showTab = (tab) => {
    setSelectedBuild(tab);
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setStats((prevStats) => ({
      ...prevStats,
      [name]: parseInt(value, 10),
    }));
  };

  const calculateValues = () => {
    // weapon damage + weapon damage * (stat modifier + skill modifier)
    const damage = stats.strength * 2;
    // Armor values are a flat percentage based on armor type
    const armor = stats.dexterity * 1.5;
    // stat modifier (1 + .05 * (int - 10)) + item modifier
    const castingSpeedModifier = stats.intelligence * 0.5;
    // stat modifier (1 + .05 * (wis - 10) + item modifier)
    const manaUsageModifier = 3
    const health = stats.constitution * 10;
    const perception = stats.wisdom * 1.2;
    const persuasion = stats.charisma * 1.5;

    return { damage, armor, castingTime, health, perception, persuasion };
  };

  const calculatedValues = calculateValues();

  return (
    <main>
      <section id="saved-builds">
        <div className="tabs">
          <button className="tab-button" onClick={() => showTab('saved-builds')}>Saved Builds</button>
          <button className="tab-button" onClick={() => showTab('new-build')}>New Build</button>
        </div>
        {selectedBuild === 'saved-builds' && (
          <div className="saved-builds-interior">
            <div className="build">
              <p>Build: Battle Priest</p>
              <p>Class: Cleric</p>
              <p>Creator: Sanctus</p>
              <p>Upvotes: 5</p>
              <button>View</button>
            </div>
            <div className="build">
              <p>Build: Shieldwall</p>
              <p>Class: Fighter</p>
              <p>Creator: Elmer</p>
              <p>Upvotes: 13</p>
              <button>View</button>
            </div>
            <div className="build">
              <p>Build: Immolator</p>
              <p>Class: Mage</p>
              <p>Creator: Romegypt</p>
              <p>Upvotes: 9</p>
              <button>View</button>
            </div>
          </div>
        )}
        {selectedBuild === 'new-build' && (
          <div className="new-build-interior">
            <h2>New Build</h2>
            <form>
              <label>
                Strength:
                <input type="number" name="strength" value={stats.strength || 0} onChange={handleOptionChange} />
              </label>
              <label>
                Dexterity:
                <input type="number" name="dexterity" value={stats.dexterity || 0} onChange={handleOptionChange} />
              </label>
              <label>
                Constitution:
                <input type="number" name="constitution" value={stats.constitution || 0} onChange={handleOptionChange} />
              </label>
              <label>
                Intelligence:
                <input type="number" name="intelligence" value={stats.intelligence || 0} onChange={handleOptionChange} />
              </label>
              <label>
                Wisdom:
                <input type="number" name="wisdom" value={stats.wisdom || 0} onChange={handleOptionChange} />
              </label>
              <label>
                Charisma:
                <input type="number" name="charisma" value={stats.charisma || 0} onChange={handleOptionChange} />
              </label>
            </form>
            <div className="calculated-values">
              <p>Damage: {calculatedValues.damage}</p>
              <p>Armor: {calculatedValues.armor}</p>
              <p>Casting Time: {calculatedValues.castingTime}</p>
              <p>Health: {calculatedValues.health}</p>
              <p>Perception: {calculatedValues.perception}</p>
              <p>Persuasion: {calculatedValues.persuasion}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}