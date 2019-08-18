const splitArrayAlternating = (items, into) => {
  return items.reduce((acc, it, index) => {
    const returnIndex = index % into;
    acc[returnIndex] = acc[returnIndex] || [];
    acc[returnIndex].push(it);
    return acc;
  }, []);
};

module.exports = {
  splitArrayAlternating
};
