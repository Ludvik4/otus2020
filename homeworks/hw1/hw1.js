const maxItemAssociation = (somePurchases) => {
  const checkIntersection = (mainArray, secondaryArray) =>
    mainArray.reduce((acc, item) => {
      if (acc) {
        return acc;
      }
      const itemIndex = secondaryArray.indexOf(item);

      return itemIndex > -1;
    }, false);

  const getUniq = (items) =>
    items.reduce((acc, item) => {
      return acc.indexOf(item) === -1 ? [...acc, item] : acc;
    }, []);

  const getItemAssociations = (item, anotherItems) =>
    anotherItems.reduce((acc, anotherItem) => {
      const hasIntersection = checkIntersection(item, anotherItem);

      return hasIntersection ? [...acc, ...anotherItem] : acc;
    }, item);

  const getItemsAssociations = (purchases) =>
    purchases.map((purchasesItem) => {
      const associations = getItemAssociations(purchasesItem, purchases);

      return getUniq(associations);
    });

  const getMaxArray = (arrays) =>
    arrays.reduce((acc, arr) => {
      return arr.length > acc.length ? arr : acc;
    });

  const associations = getItemsAssociations(somePurchases);

  return getMaxArray(associations);
};

const purchases1 = [['a', 'b'], ['a', 'c'], ['d', 'e']];
const purchases2 = [['a', 'b', 'c', 'f', 'n'], ['a', 'z', 'c'], ['d', 'c']];
const purchases3 = [['a', 'b'], ['z', 'c', 'y', 'x'], ['d', 'e']];
const purchases4 = [['a', 'b'], ['z', 'c'], ['d', 'e']];


describe('maxItemAssociation', () => {
  it('purchases1', () => {
    expect(maxItemAssociation(purchases1)).toEqual(['a', 'b', 'c']);
  });
  it('purchases2', () => {
    expect(maxItemAssociation(purchases2)).toEqual(['a', 'b', 'c', 'f', 'n', 'z', 'd']);
  });
  it('purchases3', () => {
    expect(maxItemAssociation(purchases3)).toEqual(['z', 'c', 'y', 'x']);
  });
  it('purchases4', () => {
    expect(maxItemAssociation(purchases4)).toEqual(['a', 'b']);
  });
});
