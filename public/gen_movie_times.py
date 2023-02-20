#!/usr/bin/env python3

"""A script for generating a movie viewing schedule.

A python rewrite on the original gen_movie_times.sh, 
but with *way* faster execution time and more features.

Usage: Running it will create a movies.json.tmp in the json directory,
       based on the movies.json file in the same directory.

       To confirm changes, remove the '.tmp' in its name, thereby 
       replacing the original movies.json.

       Note: You probably need to enable file extensions showing
             in your file browser, e.g. file -> file.json
       
Note:
    movies.json.tmp should be excluded from git.
"""

__version__ = '1.0'

import json
import re
from os import path
from random import randint, choice
from datetime import datetime, timedelta


SCRIPT_DIR = path.abspath(path.dirname(__file__))
JSON_DIR = path.join(SCRIPT_DIR, 'json')
MOVIES_JSON = path.join(JSON_DIR, 'movies.json')
MOVIES_JSON_TMP = path.join(JSON_DIR, 'movies.json.tmp')

# regex that extracts (hours, minutes) 
# for a duration formatted like, for example, 2h 30m
LENGTH_PATTERN = re.compile(r'^(?:(\d+)h)?(?: ?(\d+)m)?$')

# explanation of why this exists comes further down the code
START_OF_2023 = datetime(year=2023, month=1, day=1)

# after a movie finishes in the theatre, it's not like the
# next one can start right away because of real-world logistics.
VIEW_PADDING = timedelta(minutes=15)

# hours that the theatre is open.
# movie duration is not accounted for in code, meaning that if the
# theatre really closes by midnight (24) and movies can assume a max 
# length of 2 hours, then the real value here should be 22. 
OPEN_HOURS = (10, 22)

VIEWINGS_PER_MOVIE = (10, 15)

def load_movies():
    with open(MOVIES_JSON, 'r') as f:
        return json.loads(f.read())

def get_optimized_movies(movies):
    # only loads length as an optimization
    # other attributes not important for this script
    # gets merged later on.
    return [{'length': movie['length'],
             'viewings': []} for movie in movies]

def prepare_movies(movies):
    for movie in movies:
        # while we're at it, we'll do a quick sort
        movie['viewings'] = sorted(movie['viewings'], 
                                   key=lambda v: v['start_date'])
        for viewing in movie['viewings']:
            start, end = viewing['start_date'], viewing['end_date']
            viewing['start_date'] = start.isoformat()
            viewing['end_date'] = end.isoformat()

def list_from_dict_terms(a, b):
    ret = []
    for idx in range(len(a)):
        ret.append(a[idx] | b[idx])
    return ret

def save_movies(movies):
    with open(MOVIES_JSON_TMP, 'w') as f:
        json.dump(movies, f, indent=2, ensure_ascii=False)

def delta_from_length(length_str):
    m = re.fullmatch(LENGTH_PATTERN, length_str)
    return timedelta(hours=int(m.group(1)), 
                     minutes=int(m.group(2)))

def gen_start():
    # the reason that we roll for a timedelta
    # and not a randomized datetime right away
    # is that is it's much simpler to randomize a day integer (0-364) 
    # rather than both month and day since
    # that would require a day max value check (30/31/28).
    # the ideal is that datetime class allowed for a call like
    # 
    # start = datetime(year=2023, day=123)
    # 
    # but unfortunately it requires a month too, requiring us to FIRST do
    # start_of_2023 = datetime(year=2023, month=1, day=1)
    # and THEN
    # start = start_of_2023 + timedelta(days=122)
    #
    # Note: We don't check for leap years. 2023 is hard coded as the year.
    # A script targeting arbitrary years would have to implement leap year checks.
    return START_OF_2023 + timedelta(
        days=randint(0, 364),
        hours=randint(*OPEN_HOURS),
        minutes=choice((0, 15, 30, 45)))

def gen_end(start, length):
    return start \
             + delta_from_length(length) \
             + VIEW_PADDING 

def viewing_collides(viewing, old_movies):
    start = viewing['start_date']
    end = viewing['end_date']
    room = viewing['room']
    for old_movie in old_movies:
        for old_viewing in old_movie['viewings']:
            old_start = old_viewing['start_date']
            old_end = old_viewing['end_date']
            old_room = old_viewing['room']
            # if not left of it or right of it (while in same room)
            # we collide
            if room == old_room \
              and not (end < old_start or start > old_end):
                return True
    return False

def main():
    original_movies = load_movies()
    movies = get_optimized_movies(original_movies)
    print(f'gen_movie_times.py {__version__}')
    print(f'using movies json {MOVIES_JSON}')
    print(f'Adding viewings to {len(movies)} movies...')
    for movie_idx, movie in enumerate(movies):
        if movie['length'] == 'N/A': continue  
        for viewing_nbr in range(randint(*VIEWINGS_PER_MOVIE)):
            while True:  # enclose in this to easily "goto" it if collides
                viewing = {'start_date': (start := gen_start()),
                           'end_date': gen_end(start, movie['length']),
                           'room': randint(1, 2)}
                if viewing_collides(viewing, movies[:movie_idx]):
                    continue
                movie['viewings'].append(viewing)
                break

    prepare_movies(movies)
    save_movies(list_from_dict_terms(original_movies, movies))
    print(f'Done! Check {MOVIES_JSON_TMP}.')

if __name__ == '__main__':
    main()

