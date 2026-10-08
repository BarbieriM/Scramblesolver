# Scramblesolver

A helper for resolving the Magic: The Gathering card Scrambleverse at the table: it randomly redistributes the Pod's nonland permanents among its Players.

## Language

**Pod**:
The group of Players in the game.
_Avoid_: Table, group, lobby

**Player**:
A seat in the Pod, with a name and a colour. Colours may repeat between Players.
_Avoid_: User, seat

**Owner**:
The Player whose deck a Card came from, and who gets it back when the game ends. Not the same as whoever controls it now.
_Avoid_: Controller

**Card**:
A nonland permanent entered during setup to be scrambled, with an Owner and a quantity.
_Avoid_: Card entry

**Permanent**:
A Card as received by a Player after a Scramble.
_Avoid_: Hand, assigned card

**Scramble**:
Giving every Card to a Player chosen uniformly at random. The split need not be even, and a Card may land back with its Owner.
_Avoid_: Shuffle, deal
