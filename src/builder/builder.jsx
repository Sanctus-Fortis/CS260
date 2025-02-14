import React from 'react';
import './builder.css';

export function Builder() {
  return (
    <main>
      <section id="saved-builds">
        <div className="tabs">
          <button className="tab-button" onclick="showTab('saved-builds')">Saved Builds</button>
          <button className="tab-button" onclick="showTab('new-build')">New Build</button>
        </div>
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
      </section>
    </main>
  );
}