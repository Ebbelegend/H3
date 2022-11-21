function get_dtmf_frequencies(number) {
    const lists = list(pair(941, 1336),pair(697, 1209), 
    pair(697, 1336), pair(697, 1477), 
    pair(770, 1209), pair(770, 1336),  
    pair(770, 1477), pair(852, 1209), 
    pair(852, 1336), pair(852, 1477), 
    pair(941, 1209), pair(941, 1477), 
    pair(697, 1633), pair(770, 1633), 
    pair(852, 1633), pair(941, 1633));
    
        function freq(ys, n, counter){
            return n === counter
            ? head(ys)
            : freq(tail(ys),n, counter + 1);
        }
        return freq(lists, number, 0);
    




}


function make_dtmf_tone(frequency_pair) {
    const li = list(sine_sound(list_ref(get_dtmf_frequencies(frequency_pair), 0), 0.5), sine_sound(list_ref(get_dtmf_frequencies(frequency_pair), 1), 0.5));
    return simultaneously(li);
}
function dial(list_of_digits) {
    function dialing(list1, counter) {
        const silence = list(silence_sound(0.1));
        return length(list1) === counter
        ? append(silence, (head(list1)))
        : append(silence, dialing(tail(list1), counter + 1));
    }
    return consecutively(dialing(make_dtmf_tone(list_of_digits), 0));
}

// Test
play(dial(list(6,2,3,5,8,5,7,7)));









