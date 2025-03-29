import { createScoreBoard } from "./main";

describe("ScoreBoard", () => {
  let { createMatch, getGames, resetGames, updateGame, finishMatch } =
    createScoreBoard();

  beforeEach(() => {
    createScoreBoard();
  });

  test("Test 1 --->  Create a new game with uppercase and lowercase names", () => {
    let game = createMatch("ArgenTina", "Germany");
    expect(game.localTeam).toBe("argentina");
    expect(game.visitTeam).toBe("germany");
  });

  test("Test 1B --->  Create a new game and init the score with 0 fow both Teams", () => {
    let game = createMatch("Camerun", "Senegal");
    expect(game.visitScore).toBe(0);
    expect(game.visitScore).toBe(0);
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
    createMatch("Bulgaria", "Mexico");
    expect(() => {
      createMatch("Team A", "Mexico");
    }).toThrow("Teams are playing");
  });

  /************************************** Updating Test ****************************************************/

  test("Test 6 ---> Update teams", () => {
    resetGames();
    createMatch("Korea", "Japon");
    expect(() => {
      updateGame("", -10, 3);
    }).toThrow("it is not allowed add negative number to update the score");
    expect(() => {
      updateGame("", 10, -3);
    }).toThrow("it is not allowed add negative number to update the score");
  });
  test("Test 7 ---> Update teams with wrong id", () => {
    resetGames();
    createMatch("Korea", "Japon");
    expect(() => {
      updateGame("456asdf65asdfasdf", 4, 2);
    }).toThrow("it is not found the Id");
  });
  test("Test 8 ---> Update teams with wrong parameters", () => {
    resetGames();
    createMatch("Korea", "Japon");
    expect(() => {
      updateGame("456asdf65asdfasdf", "4" as any, "//**" as any);
    }).toThrow("only insert numbers to update the score");
  });

  test("Test 9 ---> Check score update", () => {
    resetGames();
    let gamecreated = createMatch("Korea", "Japon");
    let gameUpdated = updateGame(gamecreated.id, 2, 4);
    let aftervaluelocal = gameUpdated.localScore;
    let aftervaluevisit = gameUpdated.visitScore;
    expect(aftervaluelocal).toBe(2);
    expect(aftervaluevisit).toBe(4);
  });

  /************************************** Updating Test ****************************************************/
  test("Test 10 ---> Finish currently game", () => {
    resetGames();
    expect(() => finishMatch("lkasjkjklajkfljfalkjf")).toThrow("Game not found");
    createMatch("Korea", "Japon");
    expect(() => finishMatch("")).toThrow("Game not found");
  });
});
