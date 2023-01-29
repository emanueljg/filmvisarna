#!/bin/sh

# shuf shortcut with
shuf1() {
    shuf -n 1 -i "$1"
}

# 

movies=$(cat 'movies.json' | jq 'length')
movie=0
while [ $movie -ne $movies ]; do
    # get length of current movie in format xh ym (ex: 2h 30m)
    # we support singular unit durations (e.g. 1h, 3h, 35m, 5m, etc)
    # even though those can't be find yet as of this comment being written
    raw_movie_duration="$(cat 'movies.json' | jq "nth($movie).length")"

    # we can't plan for not released movies
    if [ $unit_movie_duration = '"N/A"' ]; then
        movie=$(($movie+1))
        continue
    fi

    # 1st sed begin to convert duration
        # 2h 30m -> 2:30
        # 15m -> :30
        # 2h -> 2:
    # 2nd sed adds leading 0 if needed (:15 -> 0:15)
    # 3rd sed adds trailing 0 if needed (2: -> 2:0)
    # 4th sed turns it into a date-friendly delta
        # 2:30 -> 2 hours + 30 minutes
        # 0:15 -> 0 hours + 30 minutes
        # 2:0  -> 2 hours + 0 minutes
    # luckily GNU date supports pretty forgiving human-like date expressions :)
    movie_duration=$(echo $raw_movie_duration \
        | sed -E 's/("(([[:digit:]]+)h)? ?(([[:digit:]]+)m)?")/\3:\5/' \
        | sed -E 's/(^:)/0\1/' \
        | sed -E 's/(:$)/\10/' \
        | sed -E 's/([[:digit:]]+):([[:digit:]]+)/\1 hours + \2 minutes/') 
    
    viewings=$(shuf1 1-6) 
    viewing=0
    while [ $viewing -ne $viewings ]; do
        day=$(shuf1 0-364)
        hour=$(shuf1 10-22)
        # chose between either 0, 30 or 45 minutes
        minutes=$(shuf -n 1 -- '0\n15\n30\n45'

        start_date=$(date \
            --date="2023-01-01 + $day days + $hour hours")
        end_date=$(date \
            --date="$start_date + $movie_duration"
        )

        date --date='2023-01-01 + 364 days + 1 hours + 1 minutes' +%FT%R
        # generate date
        iso_day=$(date --date="2023-01-01T13:00:00 + $day_of_year days + $movie_duration" +%F)

        viewing=$(($viewing+1))
    done


    movie=$(($movie+1))
done
