Score Board Manager

Funcionalities 

Create matches between local and visitor teams
Update scores to currently games
Finish games and remove them from the scoreboard
Get all matches sorted by total score (and start time if scores are equal)
Reset all matches to clean the scoreboard



/*     createMatch            */
createMatch(local: string, visit: string): GameInterface
Returns: The newly created game object

Throws:
Error if team names are empty
Error if both team names are the same
Error if either team is already playing in another match

/*     updateGame            */
updateGame(id: string, updateLocal: number, updateVisitor: number): GameInterface

Returns: The updated game object

Throws:
Error if ID is not found or empty
Error if scores are negative numbers
Error if scores are not numbers

/*     finishMatch            */
finishMatch(id: string): GameInterface
Returns: The finish game objec

Throws:
Error if game is not found


/*     getGames            */
getGames():Array < GameInterface >

Retunr All games playing

/*     resetGames            */

resetGames(): void
Clean all matches from the scoreboard.



1- Consideration: is posible to implement a function to load a list with games , this list i should to check that the teams are not repeat , but i real life this should be checked for the back 
