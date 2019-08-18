const splitArrayAlternating = (items, into) => {
  const acc = [];

  // initialise empty arrays
  for (let i = 0; i < into; i++) {
    acc[i] = [];
  }

  // push items to arrays alternating
  items.forEach((it, index) => {
    const accIndex = index % into;
    acc[accIndex].push(it);
  });

  return acc;
};

module.exports = {
  splitArrayAlternating
};
