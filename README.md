# Scrambleverse Solver

A small web app for resolving the Magic: The Gathering card **Scrambleverse** at the table.

Live: https://barbierim.github.io/Scramblesolver/

## How it works

1. **Set up the Pod**: choose the number of players and give each one a name and color.
2. **Enter the Cards**: add each nonland permanent on the battlefield with its quantity and Owner.
3. **Scramble**: every Card goes to a randomly chosen player. The split doesn't have to be even, and a Card can land back with its Owner.
4. **Step through the results**: go player by player to see which Permanents each one now controls, and whose they are.

See [GLOSSARY.md](./GLOSSARY.md) for the meaning of Pod, Owner, Card, Permanent and Scramble.

## Development

Built with React, TypeScript, Vite and Tailwind CSS.

```sh
yarn          # install dependencies
yarn dev      # start the dev server
yarn build    # type-check and build to dist/
yarn lint     # run ESLint
yarn deploy   # publish dist/ to GitHub Pages (run yarn build first)
```
