// simply implementation

const path = jest.createMockFromModule('path');
path.join = (...paths) => {
  let path = paths[0];
  for (let i = 1; i < paths.length; i += 1) {
    path += `\\${paths[i]}`;
  }
  return path;
};
module.exports = path;
