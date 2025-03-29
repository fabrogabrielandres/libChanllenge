import { createScoreBoard } from "./main";

describe("ScoreBoard", () => {
  let { createMatch, getGames, resetGames } = createScoreBoard();

  beforeEach(() => {
    createScoreBoard();
  });

  test("Test 1 --->  Create new Game", () => {
    let game = createMatch("ArgenTina", "Germany");
    expect(game.localTeam).toBe("argentina");
    expect(game.visitTeam).toBe("germany");
  });

  test("Test 2 --->  Create new game with teams some space at the end , or at the final  ", () => {
    let game = createMatch("BelGica ", "  Holanda");
    expect(game.localTeam).toBe("belgica");
    expect(game.visitTeam).toBe("holanda");
  });

  test("Test 3 --->  Insert empty teams names", () => {
    expect(() => createMatch("Portugal", "")).toThrow(
      "One of those names of team are empty"
    );
    expect(() => createMatch("c", "")).toThrow(
      "One of those names of team are empty"
    );
    expect(() => createMatch("", "")).toThrow(
      "One of those names of team are empty"
    );
  });

  test("Test 4 --->  Insert equal teams names", () => {
    expect(() => createMatch("Korea", "Korea")).toThrow(
      "it is not allowed to insert team names as home and away team names at the some time"
    );
  });

  test("Test 5 --->  insert teams already playing  ", () => {
    resetGames();
    createMatch("Bulgaria", "Mexico");
    expect(() => {
      createMatch("Team A", "Mexico");
    }).toThrow("Teams are playing");
  });
});
