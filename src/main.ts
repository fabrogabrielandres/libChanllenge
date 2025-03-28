interface CreateScoreBoardInterface {
  startGame: (
    local: string,
    visit: string
  ) => {
    startedGame?: Date;
    localTeam: string;
    visitTeam: string;
  };
}

export const createScoreBoard = (): CreateScoreBoardInterface => {
  const startGame = (local: string, visit: string) => {
    if (!local || !visit) {
        throw new Error('Home and away teams cannot be the same');
    }
    return {
      startedGame: new Date(),
      localTeam: local.toLocaleLowerCase().trim(),
      visitTeam: visit.toLocaleLowerCase().trim(),
    };
  };

  return {
    startGame,
  };
};
