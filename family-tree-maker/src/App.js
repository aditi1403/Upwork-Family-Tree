// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import FamilyMemberForm from './components/FamilyMemberForm';
import FamilyTree from './components/FamilyTree';
import './App.css';

const App = () => {
  const [members, setMembers] = useState([]);

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  return (
    <div className="App">
      <h1>Family Tree Maker</h1>
      <FamilyMemberForm addMember={addMember} />
      {members.length > 0 && <FamilyTree data={members} />}
    </div>
  );
};

export default App;
