import type { Global } from '../Global';

export interface Player {
	readonly id: Player.Id;

	name: string;
	lives: number;
}

export namespace Player {
	export type Id = 1 | 2;

	export type Builder = new (id: Player.Id, global: Global.Context) => Player;

	export type Type = 'Local' | 'Easy';

	export class Logic {
		readonly grid = new Grid();
		readonly fleet = new Fleet();

		selectDirection: Ship.Direction = $state('h');

		selectShip(id: number) {
			this.fleet.selectShip(id);
			this.grid.removeShip(id);
			this.fleet.ships[id].placed = false;
		}

		placeShip(x: number, y: number): boolean {
			if (this.fleet.selected === undefined) return false;

			if (this.grid.placeShip(x, y, this.selectDirection, this.fleet.selected)) {
				this.fleet.selected.placed = true;

				this.clearPreview();

				for (let ship of this.fleet.ships) {
					if (ship.placed) continue;

					this.fleet.selectShip(ship.id);
					return true;
				}

				this.fleet.selectShip(null);
				return true;
			}

			return false;
		}

		previewShip(x: number, y: number) {
			if (this.fleet.selected === undefined) return;

			this.grid.clearPreview();

			this.grid.previewShip(x, y, this.selectDirection, this.fleet.selected);
		}

		clearPreview() {
			this.grid.clearPreview();
		}

		validateAttack(x: number, y: number, result: Grid.AttackResult) {
			this.grid.validateAttack(x, y, result);
		}

		reportAttack(x: number, y: number): Grid.AttackResult {
			const { id, section } = this.grid.reportAttack(x, y) ?? {};

			if (id === undefined || section === undefined) return 'miss';

			return this.fleet.reportAttack(id, section);
		}

		flipSelectDirection() {
			this.selectDirection = this.selectDirection === 'h' ? 'v' : 'h';
		}
	}

	export class Grid {
		static readonly SIZE = 10 as const;

		static clampedPositions(x: number, y: number, direction: Ship.Direction, length: number) {
			const isHorizontal = direction === 'h';

			const positions: { x: number; y: number }[] = [{ x, y }];
			let distance = 0;

			while (positions.length < length) {
				distance += 1;

				const xPlus = isHorizontal ? x + distance : x;
				const yPlus = isHorizontal ? y : y + distance;

				if (xPlus < Grid.SIZE && yPlus < Grid.SIZE) {
					positions.push({ x: xPlus, y: yPlus });
					if (positions.length === length) break;
				}

				const xLess = isHorizontal ? x - distance : x;
				const yLess = isHorizontal ? y : y - distance;

				if (xLess >= 0 && yLess >= 0) {
					positions.unshift({ x: xLess, y: yLess });
				}
			}

			return positions;
		}

		readonly tiles: Tile[] = [];

		constructor() {
			for (let x = 0; x < Grid.SIZE; x++) {
				for (let y = 0; y < Grid.SIZE; y++) {
					this.tiles[x + y * Grid.SIZE] = new Tile(x, y);
				}
			}
		}

		#getTile(x: number, y: number) {
			return this.tiles[x + y * Grid.SIZE];
		}

		#getClampedTiles(x: number, y: number, direction: Ship.Direction, length: number) {
			return Grid.clampedPositions(x, y, direction, length).map(({ x, y }) => this.#getTile(x, y));
		}

		previewShip(x: number, y: number, direction: Ship.Direction, ship: Ship) {
			const tiles = this.#getClampedTiles(x, y, direction, ship.length);

			tiles.forEach((tile, section) => {
				tile.previewShipSegment = { direction, id: ship.id, section };
			});
		}

		clearPreview() {
			for (let tile of this.tiles) {
				if (tile.previewShipSegment === null) continue;
				tile.previewShipSegment = null;
			}
		}

		placeShip(x: number, y: number, direction: Ship.Direction, ship: Ship): boolean {
			const tiles = this.#getClampedTiles(x, y, direction, ship.length);

			for (let tile of tiles) {
				if (tile.placedShipSegment !== null) return false;
			}

			tiles.forEach((tile, section) => {
				tile.placedShipSegment = { direction, id: ship.id, section };
			});

			return true;
		}

		removeShip(id: number) {
			for (let tile of this.tiles) {
				if (tile.placedShipSegment === null || tile.placedShipSegment.id !== id) continue;

				tile.placedShipSegment = null;
			}
		}

		canAttack(x: number, y: number): boolean {
			return this.#getTile(x, y).attackHit === null;
		}

		reportAttack(x: number, y: number) {
			const tile = this.#getTile(x, y);

			tile.reported = true;
			return tile.placedShipSegment;
		}

		validateAttack(x: number, y: number, result: Grid.AttackResult) {
			this.#getTile(x, y).attackHit = result !== 'miss';
		}
	}

	export namespace Grid {
		export type AttackResult = 'hit' | 'miss' | 'sink';
	}

	export class Tile {
		readonly tag: string;

		readonly x: number;
		readonly y: number;

		placedShipSegment: Tile.ShipSegment | null = $state.raw(null);
		previewShipSegment: Tile.ShipSegment | null = $state.raw(null);

		reported: boolean = $state(false);
		attackHit: boolean | null = $state(null);

		constructor(x: number, y: number) {
			this.tag = `${String.fromCharCode(y + 65)}${x + 1}`;

			this.x = x;
			this.y = y;
		}
	}

	export namespace Tile {
		export type ShipSegment = {
			id: number;
			section: number;
			direction: Ship.Direction;
		};
	}

	export class Fleet {
		static readonly SHIPS = [
			['Carrier', 5],
			['Battleship', 4],
			['Destroyer', 3],
			['Submarine', 3],
			['Patrol', 2]
		] as const;

		#selectedId: number | null = $state(null);

		readonly ships: Ship[] = [];
		readonly selected: Ship | undefined = $derived.by(() => {
			if (this.#selectedId === null) return;
			return this.ships[this.#selectedId];
		});
		readonly ready: boolean = $derived.by(() => {
			for (let ship of this.ships) {
				if (ship.placed) continue;
				return false;
			}
			return true;
		});

		constructor() {
			this.ships = Fleet.SHIPS.map(([name, length], id) => new Ship(name, length, id));
		}

		selectShip(id: number | null) {
			this.#selectedId = id;
		}

		reportAttack(id: number, section: number): Exclude<Grid.AttackResult, 'miss'> {
			const ship = this.ships[id];

			ship.hits[section] = true;

			for (let hit of ship.hits) {
				if (!hit) return 'hit';
			}

			return 'sink';
		}
	}

	export class Ship {
		readonly name: string;
		readonly length: number;
		readonly id: number;

		readonly hits: boolean[] = $state([]);
		placed: boolean = $state(false);

		constructor(name: string, length: number, id: number) {
			this.name = name;
			this.length = length;
			this.id = id;

			this.hits = new Array(length).fill(false);
		}
	}

	export namespace Ship {
		export type Direction = 'h' | 'v';
	}
}
