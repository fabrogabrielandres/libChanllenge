import { createScoreBoard } from "./main";

describe("ScoreBoard", () => {
  let { createMatch, getGames, resetGames, updateGame, finishMatch } =
    createScoreBoard();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    createScoreBoard();
  });

  test("Test 1 --->  Create a new game with uppercase and lowercase names", () => {
    let game = createMatch("ArgenTina", "Germany");
    expect(game.localTeam).toBe(("argentina"));
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
    expect(() => createMatch("", "Colombia")).toThrow(
      "One of those names of team are empty"
    );
    expect(() => createMatch("", "")).toThrow(
      "One of those names of team are empty"
    );
  });

  test("Test 4 --->  Insert equal teams names", () => {
    expect(() => createMatch("Korea", "Korea")).toThrow(
      "it is not allowed to insert team names as local and visit team names at the some time"
    );
  });

  test("Test 5 --->  insert teams already playing  ", () => {
    createMatch("Bulgaria", "Mexico");
    expect(() => {
      createMatch("Team A", "Mexico");
    }).toThrow("Teams are playing");
  });

  /************************************** Updating Test ****************************************************/

  test("Test 6 ---> Update teams with wrong id or empty id", () => {
    resetGames();
    createMatch("Korea", "Japon");
    expect(() => {
      updateGame("", 4, 2);
    }).toThrow("it is not found the Id or Id is wrong");
  });

  test("Test 7 ---> Update teams", () => {
    resetGames();
    let idWasCreated = createMatch("Korea", "Japon").id
    expect(() => {
      updateGame(idWasCreated, -10, 3);
    }).toThrow("it is not allowed add negative number to update the score");
    expect(() => {
      updateGame(idWasCreated, 10, -3);
    }).toThrow("it is not allowed add negative number to update the score");
  });
  test("Test 8 ---> Update teams with wrong parameters", () => {
    resetGames();
    let idWasCreated = createMatch("Korea", "Japon").id
    expect(() => {
      updateGame(idWasCreated, "4" as any, "//**" as any);
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

  // /************************************** Updating Test ****************************************************/
  test("Test 10 ---> Finish currently game with empty id", () => {
    resetGames();
    createMatch("Korea", "Japon");
    expect(() => finishMatch("")).toThrow("Game not found");
  });
  test("Test 10b ---> Finish currently game with wrong id", () => {
    resetGames();
    createMatch("Korea", "Japon");
    expect(() => finishMatch("")).toThrow("Game not found");
  });

  test("Test 11 ---> ", () => {
    resetGames();
    let gameA = createMatch("México", "Canadá");
    let gameB = createMatch("España", "Brasil");
    let gameC = createMatch("Alemania ", "Francia");
    let gameD = createMatch("Uruguay", " Italia");
    let gameE = createMatch("Argentina ", " Australia ");
    updateGame(gameA.id, 0, 5);  //  
    updateGame(gameB.id, 10, 2); //12 Second "España", "Brasil"
    updateGame(gameC.id, 2, 2); //4  Fourt "España", "Brasil"
    updateGame(gameD.id, 6, 6); //12 Thirt
    updateGame(gameE.id, 3, 1); //4  Five  "Argentina ", " Australia "
    updateGame(gameA.id, 8, 4); //12 First "México", "Canadá"
    const result = getGames();
    const simplifiedResult = result.map(({ localTeam, visitTeam }) => ({
      localTeam,
      visitTeam,
    }));

    let tobeArray = [
      {
        localTeam: "méxico",
        visitTeam: "canadá",
      },
      {
        localTeam: "españa",
        visitTeam: "brasil",
      },
      {
        localTeam: "uruguay",
        visitTeam: "italia",
      },
      {
        localTeam: "alemania",
        visitTeam: "francia",
      },
      {
        localTeam: "argentina",
        visitTeam: "australia",
      },
    ];
    expect(simplifiedResult).toEqual(tobeArray);
  });
});
