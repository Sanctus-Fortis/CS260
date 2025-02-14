import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  return (
    <main>
            <p>Leaderboard</p>
            <table>
                <thead>
                <tr>
                    <th>Adventurer</th>
                    <th>Class</th>
                    <th>User</th>
                    <th>Survivals</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Belrim Langolir</td>
                    <td>Fighter</td>
                    <td>Elmer</td>
                    <td>13</td>
                </tr>
                <tr>
                    <td>Anae Mirdral</td>
                    <td>Cleric</td>
                    <td>Sanctus</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>Locust Daggerhand</td>
                    <td>Thief</td>
                    <td>SuedeLeather</td>
                    <td>6</td>
                </tr>
                </tbody>
            </table>
        </main>
  );
}