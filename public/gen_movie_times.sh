#!/bin/sh

# shuf shortcut with
shuf1 () {
    shuf -n 1 -i "$1"
}

# start by copying the movies.json to a temporary file
cp movies.json movies.json.tmp

movies=$(cat 'movies.json' | jq 'length')
movie=0
while [ $movie -ne $movies ]; do
    # get length of current movie in format xh ym (ex: 2h 30m)
    # we support singular unit durations (e.g. 1h, 3h, 35m, 5m, etc)
    # even though those can't be find yet as of this comment being written
    raw_movie_duration="$(cat 'movies.json' | jq ".[$movie].length")"

    # we can't plan for not released movies
    if [ "$raw_movie_duration" = '"N/A"' ]; then
        movie=$(($movie+1))
        continue
    fi

    # 1st sed begin to convert duration
        # 2h 30m -> 2:30
        # 15m -> :30
        # 2h -> 2:
    # 2nd sed adds leading 0 if needed (:15 -> 0:15)
    # 3rd sed adds trailing 0 if needed (2: -> 2:0)
    # 4th sed turns it into a date-friendly delta + prepares for 5th step
        # 2:30 -> 2 hours + 30 minutes
        # 0:15 -> 0 hours + 30 minutes
        # 2:0  -> 2 hours + 0 minutes
    # 5th sed turns it into unix epoch time
    # luckily GNU date supports pretty forgiving human-like date expressions :)
    unix_movie_duration=$(echo $raw_movie_duration \
        | sed -E 's/("(([[:digit:]]+)h)? ?(([[:digit:]]+)m)?")/\3:\5/' \
        | sed -E 's/(^:)/0\1/' \
        | sed -E 's/(:$)/\10/' \
        | sed -E 's/([[:digit:]]+):([[:digit:]]+)/1970-01-01T01:00 + \1 hours + \2 minutes/' \
        | date +%s -f -)
    
    viewings=$(shuf1 10-15) 
    viewing=0
    while [ $viewing -ne $viewings ]; do
        our_room=$(shuf1 1-2)
        day=$(shuf1 0-364)
        hour=$(shuf1 10-22)
        # choose between either 0, 30 or 45 minutes
        minutes=$(echo "0\n15\n30\n45" | shuf -n 1)

        our_unix_start_date=$(date -d "2023-01-01 + $day days + $hour hours" +%s)
        our_unix_end_date=$(date -d "@$(($our_unix_start_date + $unix_movie_duration))" +%s)

        # we could be done here, but just to be extra cool we check for
        # collisions with this loop
        interval_collides=0
        their_movie=0
        while [ $interval_collides -eq 0 ] && \
            [ $their_movie -ne $movie ]; do
            their_viewing=0
            their_viewings=$(cat 'movies.json.tmp' \
                | jq ".[$their_movie].viewings | length")
            while [ $their_viewing -ne $their_viewings ]; do
                # quick check that probs saves us a lot of time
                their_room=$(cat 'movies.json.tmp' \
                    | jq ".[$their_movie].viewings[$their_viewing].room" \
                    | tr -d '"')
                if [ $their_room -ne $our_room ]; then
                    # all OK
                    their_viewing=$(($their_viewing+1))
                    continue
                fi
            
                their_unix_start_date=$(cat 'movies.json.tmp' \
                    | jq ".[$their_movie].viewings[$their_viewing].start_date" \
                    | tr -d '"' \
                    | date +%s -f -)
                their_unix_end_date=$(cat 'movies.json.tmp' \
                    | jq ".[$their_movie].viewings[$their_viewing].end_date" \
                    | tr -d '"' \
                    | date +%s -f -)

                if [ $our_unix_end_date -lt $their_unix_start_date \
                    -o $their_unix_end_date -lt $our_unix_start_date ]; then
                    # all OK
                    their_viewing=$(($their_viewing+1))
                    continue
                else 
                    # not OK, reroll for new dates
                    interval_collides=1
                    break
                fi
            done
            their_movie=$(($their_movie+1))
        done
        
        # after finishing collition check, we first see if any collition occured.
        # only if it does do we increment $viewing and consider this iteration done.
        if [ !$interval_collides ]; then
            # in ISO
            start_date=$(date -d "@$our_unix_start_date" +%FT%R)
            end_date=$(date -d "@$our_unix_end_date" +%FT%R)
            # OK! Time to write our new value:
            echo movie $movie viewing $viewing
            exp="$(cat 'movies.json.tmp' \
                | jq ".[$movie].viewings |= . + "`
                            `'[{"start_date": "'"$start_date"'", "end_date": "'"$end_date"'", "room": "'"$our_room"'"}]')"
            echo $exp > 'movies.json.tmp'
            viewing=$(($viewing+1))
        fi
    done
    movie=$(($movie+1))
done

