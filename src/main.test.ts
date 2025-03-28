import { createScoreBoard } from "./main";

describe("ScoreBoard", () => {
  let { startGame } = createScoreBoard();

  beforeEach(() => {
    createScoreBoard();
  });

  test("Test 1 --->  Create new Game", () => {
    let game = startGame("Argentina", "Germany");
    expect(game.localTeam).toBe("argentina");
    expect(game.visitTeam).toBe("germany");
  });
  test("Test 2 --->  Create new with teams some space at the end , or at the final  ", () => {
    let game = startGame("  ArgeNtina", "  GErmaNy   ");
    expect(game.localTeam).toBe("argentina");
    expect(game.visitTeam).toBe("germany");
  });
  test("Test 3 --->  Try to insert empty values  ", () => {
    
    expect(() => startGame("Portugal", "")).toThrow(
      "Home and away teams cannot be the same"
    );
    expect(() => startGame("c","")).toThrow(
      "Home and away teams cannot be the same"
    );
    expect(() => startGame("","")).toThrow(
      "Home and away teams cannot be the same"
    );
  });
});
