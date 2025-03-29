import { v4 as uuidv4 } from "uuid";
interface CreateScoreBoardInterface {
  createMatch: (local: string, visit: string) => GameInterface;
  getGames: () => Array<GameInterface>;
  resetGames: () => void;
  updateGame: (
    id: string,
    updateLocal: number,
    updateVisitor: number
  ) => GameInterface;
}

interface GameInterface {
  startedGame?: Date;
  localTeam: string;
  visitTeam: string;
  id: string;
  localScore: number;
  visitScore: number;
}

export const createScoreBoard = (): CreateScoreBoardInterface => {
  let games: Array<GameInterface> = [];

  const findTeamInGames = (local: string, visit: string) => {
    let isPlaying = games.some(
      (game) =>
        game.localTeam === local ||
        game.localTeam === visit ||
        game.visitTeam === local ||
        game.visitTeam === visit
    );
    return isPlaying;
  };

  const startGame = (local: string, visit: string) => {
    let localTeam = local;
    let visitTeam = visit;
    if (!local || !visit) {
      throw new Error("One of those names of team are empty");
    }
    if (local == visit) {
      throw new Error(
        "it is not allowed to insert team names as home and away team names at the some time"
      );
    }

    let isPlaying = findTeamInGames(local, visit);

    if (isPlaying) {
      throw new Error("Teams are playing");
    } else {
      let newGame = {
        startedGame: new Date(),
        localTeam,
        visitTeam,
        id: uuidv4().toString(),
        localScore: 0,
        visitScore: 0,
      };
      return newGame;
    }
  };

  const createMatch = (local: string, visit: string) => {
    let localTeam = local.toLocaleLowerCase().trim();
    let visitTeam = visit.toLocaleLowerCase().trim();
    const newgames = startGame(localTeam, visitTeam);
    games = [...games, newgames];
    return newgames;
  };

  const updateGame = (
    id: string,
    updateLocal: number,
    updateVisitor: number
  ): GameInterface => {
    if (updateLocal < 0 || updateVisitor < 0) {
      throw new Error(
        "it is not allowed add negative number to update the score"
      );
    }
    if (typeof updateLocal != "number" || typeof updateVisitor != "number") {
      throw new Error("only insert numbers to update the score");
    }

    const findIdx = games.findIndex((p) => p.id === id);

    if (findIdx == -1) {
      throw new Error(`it is not found the Id`);
    }

    const updateGame: GameInterface = {
      ...games.at(findIdx),
      localScore: updateLocal,
      visitScore: updateVisitor,
    };
    games.at(findIdx).localScore = updateLocal;
    games.at(findIdx).visitScore = updateVisitor;

    return updateGame;
  };

  const getGames = () => games;
  const resetGames = () => {
    games = [];
  };
  return {
    getGames,
    createMatch,
    resetGames,
    updateGame,
  };
};
