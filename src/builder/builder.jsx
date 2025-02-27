import React, { useState } from 'react';
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
    skills: ['', '', '', ''],
    equipment: {
      rightWeapon: '',
      leftWeapon: '',
      armor: '',
      accessoryOne: '',
      accessoryTwo: '',
      accessoryThree: '',
    },
    inventory: [
      { name: '', quantity: 0 },
      { name: '', quantity: 0 },
      { name: '', quantity: 0 },
      { name: '', quantity: 0 },
    ],
  });

  const showTab = (tab) => {
    setSelectedBuild(tab);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      [name]: value,
    }));
  };

  const handleAttributeChange = (event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      attributes: {
        ...prevAdventurer.attributes,
        [name]: parseInt(value, 10),
      },
    }));
  };

  const handleSkillChange = (index, event) => {
    const { value } = event.target;
    setAdventurer((prevAdventurer) => {
      const newSkills = [...prevAdventurer.skills];
      newSkills[index] = value;
      return { ...prevAdventurer, skills: newSkills };
    });
  };

  const handleEquipmentChange = (event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => ({
      ...prevAdventurer,
      equipment: {
        ...prevAdventurer.equipment,
        [name]: value,
      },
    }));
  };

  const handleInventoryChange = (index, event) => {
    const { name, value } = event.target;
    setAdventurer((prevAdventurer) => {
      const newInventory = [...prevAdventurer.inventory];
      newInventory[index] = { ...newInventory[index], [name]: value };
      return { ...prevAdventurer, inventory: newInventory };
    });
  };

  const saveAdventurer = () => {
    const adventurerJSON = JSON.stringify(adventurer, null, 2);
    const blob = new Blob([adventurerJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${adventurer.name}.json`;
    link.click();
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
            {/* Add your saved builds here */}
          </div>
        )}
        {selectedBuild === 'new-build' && (
          <div className="new-build-interior">
            <h2>New Build</h2>
            <form>
              <label>
                Name:
                <input type="text" name="name" value={adventurer.name} onChange={handleInputChange} />
              </label>
              <label>
                Race:
                <input type="text" name="race" value={adventurer.race} onChange={handleInputChange} />
              </label>
              <label>
                Class:
                <input type="text" name="class" value={adventurer.class} onChange={handleInputChange} />
              </label>
              <label>
                Level:
                <input type="number" name="level" value={adventurer.level} onChange={handleInputChange} />
              </label>
              <h3>Attributes</h3>
              <label>
                Strength:
                <input type="number" name="strength" value={adventurer.attributes.strength} onChange={handleAttributeChange} />
              </label>
              <label>
                Dexterity:
                <input type="number" name="dexterity" value={adventurer.attributes.dexterity} onChange={handleAttributeChange} />
              </label>
              <label>
                Constitution:
                <input type="number" name="constitution" value={adventurer.attributes.constitution} onChange={handleAttributeChange} />
              </label>
              <label>
                Intelligence:
                <input type="number" name="intelligence" value={adventurer.attributes.intelligence} onChange={handleAttributeChange} />
              </label>
              <label>
                Wisdom:
                <input type="number" name="wisdom" value={adventurer.attributes.wisdom} onChange={handleAttributeChange} />
              </label>
              <label>
                Charisma:
                <input type="number" name="charisma" value={adventurer.attributes.charisma} onChange={handleAttributeChange} />
              </label>
              <h3>Skills</h3>
              {adventurer.skills.map((skill, index) => (
                <label key={index}>
                  Skill {index + 1}:
                  <input type="text" value={skill} onChange={(event) => handleSkillChange(index, event)} />
                </label>
              ))}
              <h3>Equipment</h3>
              <label>
                Right Weapon:
                <select name="rightWeapon" value={adventurer.equipment.rightWeapon} onChange={handleEquipmentChange}>
                  <option value="">Select Right Weapon</option>
                  <option value="sword">Sword</option>
                  <option value="axe">Axe</option>
                  <option value="bow">Bow</option>
                </select>
              </label>
              <label>
                Left Weapon:
                <select name="leftWeapon" value={adventurer.equipment.leftWeapon} onChange={handleEquipmentChange}>
                  <option value="">Select Left Weapon</option>
                  <option value="dagger">Dagger</option>
                  <option value="shield">Shield</option>
                  <option value="staff">Staff</option>
                </select>
              </label>
              <label>
                Armor:
                <select name="armor" value={adventurer.equipment.armor} onChange={handleEquipmentChange}>
                  <option value="">Select Armor</option>
                  <option value="leather">Leather</option>
                  <option value="chainmail">Chainmail</option>
                  <option value="plate">Plate</option>
                </select>
              </label>
              <label>
                Accessory One:
                <select name="accessoryOne" value={adventurer.equipment.accessoryOne} onChange={handleEquipmentChange}>
                  <option value="">Select Accessory One</option>
                  <option value="ring">Ring</option>
                  <option value="amulet">Amulet</option>
                  <option value="bracelet">Bracelet</option>
                </select>
              </label>
              <label>
                Accessory Two:
                <select name="accessoryTwo" value={adventurer.equipment.accessoryTwo} onChange={handleEquipmentChange}>
                  <option value="">Select Accessory Two</option>
                  <option value="ring">Ring</option>
                  <option value="amulet">Amulet</option>
                  <option value="bracelet">Bracelet</option>
                </select>
              </label>
              <label>
                Accessory Three:
                <select name="accessoryThree" value={adventurer.equipment.accessoryThree} onChange={handleEquipmentChange}>
                  <option value="">Select Accessory Three</option>
                  <option value="ring">Ring</option>
                  <option value="amulet">Amulet</option>
                  <option value="bracelet">Bracelet</option>
                </select>
              </label>
              <h3>Inventory</h3>
              {adventurer.inventory.map((item, index) => (
                <div key={index}>
                  <label>
                    Item Name:
                    <input type="text" name="name" value={item.name} onChange={(event) => handleInventoryChange(index, event)} />
                  </label>
                  <label>
                    Quantity:
                    <input type="number" name="quantity" value={item.quantity} onChange={(event) => handleInventoryChange(index, event)} />
                  </label>
                </div>
              ))}
            </form>
            <button onClick={saveAdventurer}>Save Adventurer</button>
          </div>
        )}
      </section>
    </main>
  );
}