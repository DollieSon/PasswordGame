password_input = document.getElementById("password");
rule_box = document.getElementById("rulebox");
score_box = document.getElementById("scorebox");
min_word = ""

function getrandomnum(min, max) { // from min to max(inclusive)
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getAllergicPairs(exConst,exVow){
    new_c = consonats.replace(exConst,"");
    new_v = vowels.replace(exVow,"");
    alergic_pairs = []
    // 10 pairs 5 random, 5c+v
    for (let i = 0; i < 5; i++) {
        pair = [new_c[getrandomnum(0,new_c.length-1)] , new_v[getrandomnum(0,new_v.length-1)]]
        if(pair in alergic_pairs || [pair[1],pair[0]] in alergic_pairs){
            console.log("duplicate: " + pair)
            i--
            continue
        }
        alergic_pairs.push(pair)
    }
    char_list = new_c + new_v
    for (let i = 0; i < 5; i++) {
        char_1 = char_list[getrandomnum(0,char_list.length-1)]
        char_2 = char_list[getrandomnum(0,char_list.length-1)]
        if([char_1,char_2] in alergic_pairs || [char_2,char_1] in alergic_pairs){
            console.log("duplicate: " + char_1 + char_2)
            i--
            continue
        }
        alergic_pairs.push([char_1,char_2])
    }
    return alergic_pairs
}

function banned_pairs_string(){
    str = ""
    for (let i = 0; i < banned_pairs.length; i++) {
        str += `(${banned_pairs[i].join(", ")})`
    }
    return str
}
function banned_pairs_regex(){
    str = ""
    for(pairs of banned_pairs){
        str += `${pairs[0]}${pairs[1]}|${pairs[1]}${pairs[0]}|`
    }
    return str.slice(0,-1)
}

// can be randomized
const min_char_len = getrandomnum(8,17);
const digit_count = getrandomnum(1,8);
const special_char_count = getrandomnum(1,5);
const uppercase_count = getrandomnum(1,5);
const unique_char_count = getrandomnum(1,30);
// should be a consonant
const consonats = "bcdfghjklmnpqrstvwxyz";
const mult_x = consonats[getrandomnum(0,consonats.length-1)];
const mult_y = getrandomnum(1,5);
const friends = ["ana","guads","ray","nicole","jeremy","james","paul","chavez","nina","toni","marie","theresse","guada","chavz","kenneth","adrian","rei","jake","nigel","joshua","charlene"
    ,"summer","tristan","Slamm","Ardel","karylle","Bambi","Tan( )?Loi","So","Andrei","Jorash","Angel","Alex","Russell","Alex","Zhasted","Simon","Theodore","Deo","Maurice","Yana","Zak","Felicity","Fria","Elijah",
    "keiru","ubaldo","Econar","Mars","Kevin","Atay","Nino","Jeastel","Ashley","Malt","Zyle"
];
const star_x = getrandomnum(1,digit_count + 2);
const have_genz_lang = 1;
// sohuld be a vowel
const vowels = "aeiou";
const vowel_x = vowels[getrandomnum(0,vowels.length-1)];
const banned_pairs = getAllergicPairs(mult_x,vowel_x)


//print all constants
console.log("min_char_len: " + min_char_len);
console.log("digit_count: " + digit_count);
console.log("special_char_count: " + special_char_count);
console.log("uppercase_count: " + uppercase_count);
console.log("unique_char_count: " + unique_char_count);
console.log("mult_x: " + mult_x);
console.log("mult_y: " + mult_y);
console.log("friends: " + friends);
console.log("star_x: " + star_x);
console.log("have_genz_lang: " + have_genz_lang);
console.log("vowel_x: " + vowel_x);
console.log(`banned_pairs: ${banned_pairs_string()}`);
console.log(`banned_pairs_regex: ${banned_pairs_regex()}`);

requirements = {
    
    "charLen8":{
        "description":`Password must be at least ${min_char_len} characters long`,
        "function":charLen8
    },
    "hasSpecialChar":{
        "description":`Password must contain at least ${special_char_count} special character`,
        "function":hasSpecialChar
    },
    "hasnDigit":{
        "description":`Password must contain at least ${digit_count} digits`,
        "function":hasnDigit
    },
    "hasUppercase":{
        "description":`Password must contain at least ${uppercase_count} uppercase letter`,
        "function":hasUppercase
    },
    "hasnUniqueChar":{
        "description":`Password must contain at least ${unique_char_count} unique character`,
        "function":hasnUniqueChar
    },
    "xMultOfY":{
        "description":`Password must have multiples of ${mult_y} of ${mult_x}`,
        "function":xMultOfY
    },
    "ContainMonth":{
        "description":"Password must contain abbreviated months",
        "function":ContainMonth
    },
    "containFriends":{
        "description":`Password must contain a CS-3 Student name\n ${friends.join(", ")}`,
        "function":containFriends
    },
    "xCharBeStar":{
        "description":`Password must have * on the character ${star_x}`,
        "function":xCharBeStar
    },
    "containRainbow":{
        "description":"Password must contain rainbow colors",
        "function":containRainbow
    },
    "genZlang":{
        "description":`Password must${have_genz_lang? "":" not"} contain gen z language`,
        "function":genZlang
    },
    "haveMunicipality":{
        "description":"Password must contain municipality in cebu",
        "function":haveMunicipality
    },
    "notContainXVowel":{
        "description":`Password must not contain the vowel \`${vowel_x}\``,
        "function":notContainXVowel
    },
    "notContainBannedPairs":{
        "description":`Password must not contain the pairs ${banned_pairs_string()}`,
        "function":notContainBannedPairs
    },
}


function checkPassword() {
    console.log(password_input.value)
    rule_box.innerHTML = ""
    is_winner = true
    for(rule in requirements){
        // console.log(rule);
        //load description
        const elem = document.createElement("p")
        const description = document.createTextNode(requirements[rule]["description"])
        elem.appendChild(description)
        rule_box.appendChild(elem)
        //check if valid
        if(requirements[rule]["function"](password_input.value)){
            elem.style.color = "green"
        }else{
            elem.style.color = "red"
            is_winner = false
            break;
        }
        //rename id
    }
    if(is_winner && min_word.length == 0){
        min_word = password_input.value
        console.log(min_word)
    }
    console.log(is_winner)
    if(is_winner){
        if(min_word.length == 0){
            min_word = password_input.value
        }else if(min_word.length > password_input.value.length){
            min_word = password_input.value
        }
        const word = document.createElement("p")
        const word_text = document.createTextNode("Minimum word created: " + min_word)
        const len = document.createElement("p")
        const len_text = document.createTextNode("Legnth: " + min_word.length)
        word.appendChild(word_text)
        len.appendChild(len_text)
        score_box.innerHTML = ""
        score_box.appendChild(word)
        score_box.appendChild(len)
    }

    // console.log("charLen8: " + charLen8(password_input.value));
    // console.log("hasSpecialChar: " + hasSpecialChar(password_input.value));
    // console.log("hasnDigit: " + hasnDigit(password_input.value));
    // console.log("hasUppercase: " + hasUppercase(password_input.value));
    // console.log("hasnUniqueChar: " + hasnUniqueChar(password_input.value));
    // console.log("xMultOfY: " + xMultOfY(password_input.value));
    // console.log("ContainMonth: " + ContainMonth(password_input.value));
    // console.log("containFriends: " + containFriends(password_input.value));
    // console.log("xCharBeStar: " + xCharBeStar(password_input.value));
    // console.log("containRainbow: " + containRainbow(password_input.value));
    // console.log("containGirlFriend: " + containGirlFriend(password_input.value));
    // console.log("genZlang: " + genZlang(password_input.value));
    // console.log("haveMunicipality: " + haveMunicipality(password_input.value));
    // console.log("notContainXVowel: " + notContainXVowel(password_input.value));
}

function charLen8(string) {
    return string.length >= min_char_len;
}

function hasSpecialChar(string) {
    re = /!|@|#|\$|%|\^|\&|\*|\(|\)|-|_|=|\+|\{|\}\[|\]|\||\\|:|;|\"|'|<|>|,|\.|\?|\/|~|`/g
    // console.log(string.match(re))
    return string.match(re).length >= special_char_count;
}

function hasnDigit(string) {
    re = new RegExp("([^\\d]*\\d[^\\d]*){"+digit_count+"}", "g");
    return re.test(string);
}

function hasUppercase(string) {
    re = new RegExp(`([^A-Z]*[A-Z][^A-Z]*){${uppercase_count}}`,"g");
    return re.test(string);
}

function hasnUniqueChar(string) {
    return new Set(string).size >= special_char_count;
}

function xMultOfY(string){
    re = new RegExp("^(([^"+mult_x+"]*"+mult_x+"[^"+mult_x+"]*){"+mult_y+"})*$","gi");
    return re.test(string);
}

function ContainMonth(string){
    return /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/gi.test(string);
}

function containFriends(string){
    re = new RegExp(friends.join("|"),"gi");
    return re.test(string);
}

function xCharBeStar(string){
    re = new RegExp("^(.){"+(star_x-1)+"}\\*","g");
    // console.log(re)
    return re.test(string);
}

function containRainbow(string){
    return /red|orange|yellow|green|blue|indigo|violet/gi.test(string);
}

function containGirlFriend(string){
    // I don't have a girlfriend :< HAHAHAHAH
    return true;
}

function genZlang(string){
    res = /rizz|gyatt|skibidi|sigma|fanum tax|aura|ohio|brain( )?rot|sus|fr|no( )?cap|mog|grindset|mew|bussin(g)?|goon|imposter|pog|looks( )?maxxing|glizzy/gi.test(string);
    if (have_genz_lang){
        return res;
    }else{
        return !res;
    }
}

function haveMunicipality(string){
    return /Alcantara|Alcoy|Alegria|Aloguinsan|Argao|Asturias|Badian|Balamban|Bantayan Island|Barili|Bogo|Boljoon|Borbon|Carcar|Carmen|Catmon|Compostela|Consolacion|Cordova|Daan Bantayan|Dalaguete|Danao|Dumanjug|Ginatilan|Liloan|Madridejos|Malabuyoc|Medellin|Minglanilla|Moalboal|Naga|Oslob|Pilar|Pinamungajan|Poro|Ronda|Samboan|San Fernando|San Francisco|San Remigio|Santa Fe|Santander|Sibonga|Sogod|Tabogon|Tabuelan|Talisay|Toledo|Tuburan|Tudela/gi.test(string);
}

function notContainXVowel(string){
    re = new RegExp(""+vowel_x+"","gi")
    return !re.test(string)
}

function notContainBannedPairs(string){
    re = new RegExp(banned_pairs_regex(),"gi")
    console.log(re)
    return !re.test(string)
}