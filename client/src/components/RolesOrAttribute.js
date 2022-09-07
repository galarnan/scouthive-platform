/* eslint-disable prettier/prettier */
const traits = {
    'Long Passing': 'attribute',
    'Short Passing': 'attribute',
    'Ball Control': 'attribute',
    'Heading': 'attribute',
    'Dribbling': 'attribute',
    'Pressing': 'attribute',
    'Long Shot': 'attribute',
    'Tackling': 'attribute',
    'Aggression': 'attribute',
    'Finishing': 'attribute',
    'Composure': 'attribute',
    'Leadership': 'attribute',
    'First Touch': 'attribute',
    'Pace': 'attribute',
    'Stamina': 'attribute',
    'Strength': 'attribute',
    'Decision Making': 'attribute',
    'Work Rate': 'attribute',
    'Vision': 'attribute',
    'Freekick Taking': 'attribute',
    'Box to Box': 'role',
    'Joins Attack': 'role',
    'Deep Lying': 'role',
    'Ball Playing CB': 'role',
    'No Nonsense CB': 'role',
    'Wing Back': 'role',
    'No Nonsense FullBack': 'role',
    'Inverted FullBack': 'role',
    'Advanced Playmaker': 'role',
    'Roaming Playmaker': 'role',
    'Defensive Winger': 'role',
    'Wide Playmaker': 'role',
    'Inverted Winger': 'role',
    'Target Man': 'role',
    'Poacher': 'role',
    'False Nine': 'role',
};

const RoleOrAttribute = traitName => {
  if (traits[traitName] === 'role') return 'role';
  return 'attribute';
};

export default RoleOrAttribute;
