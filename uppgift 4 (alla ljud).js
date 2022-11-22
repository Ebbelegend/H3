// Question 4

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
    
    const sound1 = sine_sound(head(frequency_pair), 0.5);
    const sound2 = sine_sound(tail(frequency_pair), 0.5);
    const list_of_sounds = list(sound1, sound2);
    
    return simultaneously(list_of_sounds);

}


function dial(list_of_digits) {
    const list_of_sounds = list();
    function dialing(list_of_digits, counter, list_of_sounds) {
        return is_null(list_of_digits)
        ? list_of_sounds
        : dialing(tail(list_of_digits), counter + 1, append(append(list_of_sounds, list(silence_sound(0.1))), list(make_dtmf_tone(get_dtmf_frequencies(head(list_of_digits))))));
    }
    const new_list_of_sounds = dialing(list_of_digits, 0, list_of_sounds);
    return consecutively(new_list_of_sounds);
}

function dial_all(list_of_numbers) {

    const list_of_sounds = list();
    
    
    function filtering(pred, list_of_numbers, filtered_list_of_numbers){
        return is_null(list_of_numbers)
        ? filtered_list_of_numbers
        : pred(accumulate((x,y) => x + y, 0, head(list_of_numbers)))
        ? filtering(pred, tail(list_of_numbers), filtered_list_of_numbers)
        : filtering(pred, tail(list_of_numbers), append(filtered_list_of_numbers, head(list_of_numbers)));
    }
    
    
    //function list_sum(list_of_numbers){
        //return accumulate((x,y) => x + y, 0, list_of_numbers);
        
    //function accumulate(f, initial, xs){
        //return is_null(xs)
        //? initial
        //: f(head(head(xs)), accumulate(f, initial, head(tail(xs))));
        const new_list_of_numbers = filtering(x => x === 34, list_of_numbers, list_of_sounds);
    return dial(new_list_of_numbers);
    }
    //const sum = list_sum(list_of_numbers);
    //return sum;  
// Test
 play(dial_all(
  list(
     list(0,1,8,4,7,1,5,7,0,4),  // not played!!!
      list(6,2,3,5,8,5,7,7),
      list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
  ));








