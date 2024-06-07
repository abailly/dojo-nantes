"""This is the Katagarros."""


def test_score():
    assert score([]) == "0 - 0"
    assert score([0]) == "15 - 0"
    assert score([1]) == "0 - 15"

    assert score([0, 1]) == "15 - 15"
    assert score([0, 1, 0]) == "30 - 15"
    assert score([0, 1, 0, 1, 1]) == "30 - 40"
    assert score([0, 1, 0, 1, 1, 0]) == "deuce"

def score(exchanges):
    """Return the score given the exchanges.

    Exchanges is an array of points, if 0, then the first player wins the
    exchange, otherwise it's the second player.

    """
    score0 = score1 = 0
    for point in exchanges:
        if point==0:
            score0 = incr_score(score0)
        else:
            score1 = incr_score(score1)

    return display_score(score0, score1) 


def display_score(score0, score1):
    if score0 == score1 == 40:
        return "deuce"    
    return "{player0} - {player1}".format(player0=score0, player1=score1)


def incr_score(score):
    """Return the next score, given the current score.

    Scores: 0, 15, 30, 40

    """
    next_scores = {0: 15, 15: 30, 30: 40}
    return next_scores[score]

if __name__ == '__main__':
    test_score()
