///////////////////////////////////////////////////////////////////
// Biases Data AJAX request                                     //
/////////////////////////////////////////////////////////////////
function biases() {
    var http = new XMLHttpRequest();
    http.open("GET", "assets/json/biases.json", true);
    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            if (http.status >= 200 && http.status <= 400) {
                var biasData = JSON.parse(http.responseText);
                console.log(biasData);
                var data;
                var i = 0;
                data = biasData.slice(i, i + 1);
                console.log(data[0]);
                append(data[0]);
                callWiki();
                document.getElementById('next').addEventListener("click", function() {
                    i++;
                    console.log(i);
                    if (i >= biasData.length - 1) {
                        this.style.display = "none";
                        document.getElementById('back').style.marginRight = "0";
                        i = biasData.length - 1;
                    } else {
                        this.style.display = "block";
                    }
                    if (i <= 0) {
                        document.getElementById('back').style.display = "none";
                    } else {
                        document.getElementById('back').style.display = "block";
                    }
                    data = biasData.slice(i, i + 1);
                    console.log(data[0]);
                    append(data[0]);
                    callWiki();
                })
                document.getElementById('back').addEventListener("click", function() {
                    i--;
                    console.log(i);
                    if (i <= 0) {
                        this.style.display = "none";
                    } else {
                        this.style.display = "block";
                        document.getElementById('back').style.marginRight = "1%";
                    }
                    if (i >= biasData.length) {
                        document.getElementById('next').style.display = "none";
                    } else {
                        document.getElementById('next').style.display = "block";
                    }
                    data = biasData.slice(i, i + 1);
                    console.log(data[0]);
                    append(data[0]);
                    callWiki();
                })

            }
        }
    };
    http.send();
}

///////////////////////////////////////////////////////////////////
// Wikipedia API request                                        //
/////////////////////////////////////////////////////////////////

function callWiki() {
    var wiki = new XMLHttpRequest();

    var query = document.getElementById('name').textContent;

    wiki.onreadystatechange = (function() {
        if (wiki.readyState === 4) {
            if (wiki.status >= 200 && wiki.status <= 400) {
                var data = JSON.parse(wiki.responseText);
                buttonAdd(data[3][0]);
                console.log(data[3][0]);
            }
        }
    });

    wiki.open('GET', "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&imlimi=max&format=json&origin=*", true);

    wiki.send();
}

///////////////////////////////////////////////////////////////////
// Handlebars.js function                                       //
/////////////////////////////////////////////////////////////////

function append(obj) {
    var templateScript = document.getElementById('bias').innerHTML;
    var theTemplate = Handlebars.compile(templateScript);
    var compiledTemp = theTemplate(obj);
    document.getElementById('main').innerHTML = compiledTemp;
}

///////////////////////////////////////////////////////////////////
// Add link to button function                                  //
/////////////////////////////////////////////////////////////////

function buttonAdd(link) {
    document.getElementById('link').href = link;
}

biases();
