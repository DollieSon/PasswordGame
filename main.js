password_input = document.getElementById("password");
// can be randomized
const digit_count = 3;
const special_char_count = 1;
const mult_x = "b";
const mult_y = 2;
const star_x = 3;
const have_genz_lang = true;
const vowel_x = "a";

function checkPassword() {
    console.log("checkPassword");
    console.log(password_input.value);
    console.log("charLen8: " + charLen8(password_input.value));
    console.log("hasSpecialChar: " + hasSpecialChar(password_input.value));
    console.log("hasnDigit: " + hasnDigit(password_input.value));
    console.log("hasUppercase: " + hasUppercase(password_input.value));
    console.log("hasnUniqueChar: " + hasnUniqueChar(password_input.value));
    console.log("xMultOfY: " + xMultOfY(password_input.value));
    console.log("ContainMonth: " + ContainMonth(password_input.value));
    console.log("containFriends: " + containFriends(password_input.value));
    console.log("xCharBeStar: " + xCharBeStar(password_input.value));
    console.log("containRainbow: " + containRainbow(password_input.value));
    console.log("containGirlFriend: " + containGirlFriend(password_input.value));
    console.log("genZlang: " + genZlang(password_input.value));
    console.log("haveMunicipality: " + haveMunicipality(password_input.value));
    console.log("notContainXVowel: " + notContainXVowel(password_input.value));
}

function charLen8(string) {
    return string.length >= 8;
}

function hasSpecialChar(string) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g.test(string);
}

function hasnDigit(string) {
    re = new RegExp("\\d{" + digit_count + "}", "g");
    return re.test(string);
}

function hasUppercase(string) {
    return /[A-Z]/g.test(string);
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
    return /ray|ana|guads|nicole|jeremy|james|paul|chavez|nina|toni|marie|theresse|guada|chavz/gi.test(string);
}

function xCharBeStar(string){
    re = new RegExp("^(.){"+(star_x-1)+"}\\*","g");
    console.log(re)
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
    if (have_genz_lang){
        return /rizz|gyatt|skibidi|sigma|fanum tax|aura|ohio|brain( )?rot|sus|fr|no( )?cap|mog|grindset|mew|bussin(g)?|goon|imposter|pog|looks( )?maxxing|glizzy/gi.test(string);
    }else{
        return !/(rizz|gyatt|skibidi|sigma|fanum tax|aura|ohio|brain( )?rot|sus|fr|no( )?cap|mog|grindset|mew|bussin(g)?|goon|imposter|pog|looks( )?maxxing|glizzy)/gi.test(string);
    }
}

function haveMunicipality(string){
    return /Alcantara|Alcoy|Alegria|Aloguinsan|Argao|Asturias|Badian|Balamban|Bantayan Island|Barili|Bogo|Boljoon|Borbon|Carcar|Carmen|Catmon|Compostela|Consolacion|Cordova|Daan Bantayan|Dalaguete|Danao|Dumanjug|Ginatilan|Liloan|Madridejos|Malabuyoc|Medellin|Minglanilla|Moalboal|Naga|Oslob|Pilar|Pinamungajan|Poro|Ronda|Samboan|San Fernando|San Francisco|San Remigio|Santa Fe|Santander|Sibonga|Sogod|Tabogon|Tabuelan|Talisay|Toledo|Tuburan|Tudela/gi.test(string);
}

function notContainXVowel(string){
    re = new RegExp(""+vowel_x+"","gi")
    return !re.test(string)
}