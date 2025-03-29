interface CreateScoreBoardInterface {
  createMatch: (local: string, visit: string) => GameInterface;
  getGames: () => Array<GameInterface>;
  resetGames: () => void;
}

interface GameInterface {
  startedGame?: Date;
  localTeam: string;
  visitTeam: string;
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
    let localTeam = local.toLocaleLowerCase().trim();
    let visitTeam = visit.toLocaleLowerCase().trim();
    if (!local || !visit) {
      throw new Error("Home and away teams cannot be the same");
    }

    let isPlaying = findTeamInGames(local, visit);

    if (isPlaying) {
      throw new Error("Team A is already in a match");
    }

    let newGame = {
      startedGame: new Date(),
      localTeam,
      visitTeam,
    };
    return newGame;
  };

  const createMatch = (local: string, visit: string) => {
    let localTeam = local.toLocaleLowerCase().trim();
    let visitTeam = visit.toLocaleLowerCase().trim();
    const newgames = startGame(localTeam, visitTeam);
    games = [...games, newgames];
    return newgames;
  };

  const getGames = () => games;
  const resetGames = () => {
    games = [];
  };

  return {
    getGames,
    createMatch,
    resetGames
  };
};
