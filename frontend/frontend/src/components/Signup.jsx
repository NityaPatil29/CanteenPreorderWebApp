import React from 'react';

const Signup = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Signup</h2>
      <form>
        <input type="text" placeholder="Name" required /><br /><br />
        <input type="email" placeholder="Email" required /><br /><br />
        <input type="password" placeholder="Password" required /><br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
