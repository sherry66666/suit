module.exports = {
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "eslint-plugin-flowtype",
  ],
  "rules": {
    "arrow-body-style": ["error", "always"],
    "flowtype/define-flow-type": 1,
    "no-console": 0, // LJV TODO Remove this?
    "jsx-a11y/anchor-is-valid": 0, // LJV TODO Remove this?
    // "jsx-a11y/click-events-have-key-events": 0, // LJV TODO Remove this?
    "react/no-unused-state": 0, // LJV TODO Remove this?
    "jsx-a11y/label-has-associated-control": 0, // LJV TODO Remove this?
    "jsx-a11y/label-has-for": 0,
    "lines-between-class-members": 0,
    "max-len": [1, 132, 2],
    "prefer-destructuring": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "strict": 0,
  },
};
