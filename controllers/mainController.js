import Player from '../Models/MainModel.js';
let sortingByName = 0;
let sortingByNumber = 0;
let sortingByGoals = 0;

export const loadCRUD = async (req, res) => {
  try {
    const players = await Player.find();
    res.render('crud', { title: "CRUD", players, sortingByName, sortingByNumber, sortingByGoals });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Handle user creation via a form
export const createPlayer = async (req, res) => {
  try {
    const newPlayer = new Player({
      playerName: req.body.playerName,
      playerNumber: req.body.playerNumber,
      goals: 0
    });

    await newPlayer.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};


export const editPlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).send('User not found');
    }

    res.render('edit', { player, title: `Editing ${player.playerName}` });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

export const updatePlayer = async (req, res) => {
  console.log(req.params.id);
  try {
    const playerId = req.params.id;
    const updateData = {
      playerName: req.body.playerName,
      playerNumber: req.body.playerNumber,
      goals: req.body.goals
    };

    await Player.findOneAndUpdate({_id: playerId}, updateData);
    res.redirect('/'); // Redirect back to the CRUD route
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const score = async (req, res) => {
  try {
    const playerId = req.params.id;
    
    // Retrieve the current player's data
    const player = await Player.findOne({ _id: playerId });
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    // Increment the player's goals
    player.goals++; // Increment the goals by 1
    
    // Update the player's record in the database
    await player.save();
    
    res.redirect('/'); // Redirect back to the CRUD route
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};


export const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedUser = await Player.deleteOne({ _id: playerId });

    if (deletedUser.deletedCount === 0) {
      console.log('No user found with that _id.');
      return res.redirect('/');
    }

    console.log('Deleted player');
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'Error deleting player' });
  }
};

export const sort = async (req, res) => {
  const sortType = req.params.sortType || "";
  if (sortType === 'name') {
    sortingByName === 1 ? sortingByName = -1 : sortingByName = 1;
    sortingByNumber = 0;
    sortingByGoals = 0;
  }
  else if (sortType === 'number') {
    sortingByNumber === 1 ? sortingByNumber = -1 : sortingByNumber = 1;
    sortingByName = 0;
    sortingByGoals = 0;
  }
  else if (sortType === 'goals') {
    sortingByGoals === 1 ? sortingByGoals = -1 : sortingByGoals = 1;
    sortingByName = 0;
    sortingByNumber = 0;
  }
  
  try {
    let sortCriteria = {};

    if (sortingByName === 1) sortCriteria = { playerName: 1 }; 
    else if (sortingByName === -1) sortCriteria = { playerName: -1 }; 
    else if (sortingByNumber === 1) sortCriteria = { playerNumber: 1 };
    else if (sortingByNumber === -1) sortCriteria = { playerNumber: -1 }; 
    else if (sortingByGoals === 1) sortCriteria = { goals: 1 };
    else if (sortingByGoals === -1) sortCriteria = { goals: -1 };

    const players = await Player.find().sort(sortCriteria);
    res.render('crud', { title: "CRUD", players, sortingByName, sortingByNumber, sortingByGoals });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};
