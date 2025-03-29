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

  test("Test 3 --->  Try to insert empty values  ", () => {
    expect(() => createMatch("Portugal", "")).toThrow(
      "Home and away teams cannot be the same"
    );
    expect(() => createMatch("c", "")).toThrow(
      "Home and away teams cannot be the same"
    );
    expect(() => createMatch("", "")).toThrow(
      "Home and away teams cannot be the same"
    );
  });

  test("Test 4 --->  insert teams already playing  ", () => {
    resetGames();
    createMatch("Bulgaria", "Mexico");
    expect(() => {
      createMatch("Team A", "Mexico");
    }).toThrow("Team A is already in a match");
  });
});
