google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {

                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['App'] + '</td>';
                trHTML += '<td>' + object['Category'] + '</td>';
                trHTML += '<td>' + object['Rating'] + '</td>';
                trHTML += '<td>' + object['Reviews'] + '</td>';
                trHTML += '<td>' + object['Size'] + '</td>';
                trHTML += '<td>' + object['Installs'] + '</td>';
                trHTML += '<td>' + object['Type'] + '</td>';
                trHTML += '<td>' + object['Price'] + '</td>';
                trHTML += '<td>' + object['Content Rating'] + '</td>';
                trHTML += '<td>' + object['Genres'] + '</td>';
                trHTML += '<td>' + object['Last Updated'] + '</td>';
                trHTML += '<td>' + object['Current Ver'] + '</td>';
                trHTML += '<td>' + object['Android Ver'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";

                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;

            loadGraph();
        }
    };
}

function loadQueryTable() {
    document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
    const searchText = document.getElementById('searchTextBox').value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints/findtext/" + searchText);

    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText).Complaint;
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['App'] + '</td>';
                trHTML += '<td>' + object['Category'] + '</td>';
                trHTML += '<td>' + object['Rating'] + '</td>';
                trHTML += '<td>' + object['Reviews'] + '</td>';
                trHTML += '<td>' + object['Size'] + '</td>';
                trHTML += '<td>' + object['Type'] + '</td>';
                trHTML += '<td>' + object['Price'] + '</td>';
                trHTML += '<td>' + object['Price'] + '</td>';
                trHTML += '<td>' + object['Content Rating'] + '</td>';
                trHTML += '<td>' + object['Genres'] + '</td>';
                trHTML += '<td>' + object['Last Updated'] + '</td>';
                trHTML += '<td>' + object['Current Ver'] + '</td>';
                trHTML += '<td>' + object['Android Ver'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";
                num++;

            }
            console.log(trHTML);
            document.getElementById("mytable").innerHTML = trHTML;

        }
    };
}

function loadGraph() {
    var ArtDes = 50;
    var Pretend = 70;
    var AutoV = 70;
    var Beau = 100;
    var Book = 50;
    var Creativity = 40;
    var Com = 50;
    var Busi = 150;
    var other = 0;


    var Office = 100000000;
    var Fico = 100000000;
    var Page = 50000000;
    var Job = 50000000;
    var Docs = 50000000;
    var Sec = 50000000;
    var Vis = 10000000;
    var Zoom = 10000000;
    var Csio = 10000000;
    var Ade = 5000000;
    var other = 0;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints/");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                switch (object['Genres']) {
                    case "Art & Design":
                        ArtDes = ArtDes + 1;
                        break;
                    case "Art & Design;Pretend Play":
                        Pretend = Pretend + 1;
                        break;
                    case "Art & Design;Creativity":
                        Creativity = Creativity + 1;
                        break;
                    case "Beauty":
                        Beau = Beau + 1;
                        break;
                    case "Books & Reference":
                        Book = Book + 1;
                        break;
                    case "Auto & Vehicles":
                        AutoV = AutoV + 1;
                        break;
                    case "Business":
                        Busi = Busi + 1;
                        break;
                    case "COMICS":
                        Com = Com + 1;
                        break;
                    default:
                        other = other + 1;
                        break;
                }

                switch (object['Installs']) {
                    case "100,000,000+":
                        Office = Office + 1;
                        break;
                    case "100,000,000+":
                        Fico = Fico + 1;
                        break;
                    case "50,000,000+":
                        Page = Page + 1;
                        break;
                    case "50,000,000+":
                        Job = Job + 1;
                        break;
                    case "50,000,000+":
                        Docs = Docs + 1;
                        break;
                    case "50,000,000+":
                        Sec = Sec + 1;
                        break;
                    case "10,000,000+":
                        Vis = Vis + 1;
                        break;
                    case "10,000,000+":
                        Zoom = Zoom + 1;
                        break;
                    case "10,000,000+":
                        Csio = Csio + 1;
                        break;
                    case "5,000,000+":
                        Ade = Ade + 1;
                        break;
                    default:
                        other = other + 1;
                        break;
                }
            }

            var TimelyResponseData = google.visualization.arrayToDataTable([
                ['Genres', 'Case'],
                ['Art & Design;Pretend Play', Pretend],
                ['Art & Design;Creativity', Creativity],
                ['Auto & Vehicles', AutoV],
                ['Art & Design', ArtDes],
                ['Books & Reference', Book],
                ['COMICS', Com],
                ['Business', Busi],
                ['Beauty', Beau],
                ['Other', other]

            ]);

            var optionsTimelyResponse = { title: 'ประเภทเนื้อหาแอพพลิเคชั่นทั้งหมด' };
            var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('piechartTimelyResponse'));
            chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

            var dataSubmitted = google.visualization.arrayToDataTable([
                ['Installs', 'Number', {
                    role: 'style'
                }, {
                    role: 'annotation'
                }],
                ['1.', Office, 'color: #FF2C2C', 'OfficeSuite'],
                ['2.', Fico, 'color: #FFA22C', 'File Commander'],
                ['3.', Page, 'color: #FAFF2C', 'Facebook Pages Manager'],
                ['4.', Job, 'color: #8DFF2C', 'Indeed Job Search'],
                ['5.', Docs, 'color: #2CFF41', 'Docs To Go™ Free Office Suite'],
                ['6.', Sec, 'color: #2CFFA7', 'Secure Folder'],
                ['7.', Vis, 'color: #2CD2FF', 'Visual Voicemail'],
                ['8.', Zoom, 'color: #2C60FF', 'ZOOM Cloud Meetings'],
                ['9.', Csio, 'color: #852CFF', 'Cisco Webex Meeting'],
                ['10.', Ade, 'color: #FF2CD8', 'Google Ade'],
                ['Other', other, 'color: #25F4BC', 'Other']
            ]);

            var optionSubmitted = {
                title: '10 อันดับ แอพพลิเคชั่น Business ยอดนิยม เพื่อทำให้กาทำธุระกิจง่ายขึ้น',
                legend: { position: 'none' }
            };

            var chartSubmitted = new google.visualization.BarChart(document.getElementById('barchartSubmitted'));
            chartSubmitted.draw(dataSubmitted, optionSubmitted);
        }
    };


}

function showCompliantCreateBox() {

    var d = new Date();
    const date = d.toISOString().split('T')[0]

    Swal.fire({
        title: 'Create data App Name in Google Play Store',
        html: '<div class="mb-3"><label for="App" class="form-label">App</label>' +
            '<input class="form-control" id="App" placeholder="App Name"></div>' +
            '<div class="mb-3"><label for="Category" class="form-label">Category</label>' +
            '<input class="form-control" id="Category" placeholder="Category"></div>' +
            '<div class="mb-3"><label for="Rating" class="form-label">Rating</label>' +
            '<input class="form-control" id="Rating" placeholder="Rating"></div>' +
            '<div class="mb-3"><label for="Reviews" class="form-label">Reviews</label>' +
            '<input class="form-control" id="Reviews" placeholder="Reviews"></div>' +
            '<div class="mb-3"><label for="Size" class="form-label">Size</label>' +
            '<input class="form-control" id="Size" placeholder="Size"></div>' +
            '<div class="mb-3"><label for="Installs" class="form-label">Installs</label>' +
            '<input class="form-control" id="Installs" placeholder="Installs"></div>' +
            '<div class="mb-3"><label for="Type" class="form-label">Type</label>' +
            '<input class="form-control" id="Type" placeholder="Type"></div>' +
            '<div class="mb-3"><label for="Price" class="form-label">Price</label>' +
            '<input class="form-control" id="Price" placeholder="Price"></div>' +
            '<div class="mb-3"><label for="Content_Rating" class="form-label">Content Rating</label>' +
            '<input class="form-control" id="Content_Rating" placeholder="Content Rating"></div>' +
            '<div class="mb-3"><label for="Genres" class="form-label">Genres</label>' +
            '<input class="form-control" id="Genres" placeholder="Genres"></div>' +
            '<div class="mb-3"><label for="Last_Updated " class="form-label" value="' + date + '" >Last Updated </label>' +
            '<input class="form-control" id="Last_Updated " placeholder="Last Updated "></div>' +
            '<div class="mb-3"><label for="Current_Ver class="form-label">Current Ver</label>' +
            '<input class="form-control" id="Current_Ver" placeholder="Current Ver"></div>' +
            '<div class="mb-3"><label for="Android_Ver class="form-label">Android Ver</label>' +
            '<input class="form-control" id="Android_Ver" placeholder="Android Ver"></div>',

        focusConfirm: false,
        preConfirm: () => {
            compliantCreate();
        }
    });
}

function compliantCreate() {
    const App = document.getElementById("App").value;
    const Category = document.getElementById("Category").value;
    const Rating = document.getElementById("Rating").value;
    const Reviews = document.getElementById("Reviews").value;
    const Size = document.getElementById("Size").value;
    const Installs = document.getElementById("Installs").value;
    const Type = document.getElementById("Type").value;
    const Price = document.getElementById("Price").value;
    const Content_Rating = document.getElementById("Content_Rating").value;
    const Genres = document.getElementById("Genres").value;
    const Last_Updated = document.getElementById("Last_Updated").value;
    const Current_Ver = document.getElementById("Current_Ver").value;
    const Android_Ver = document.getElementById("Android_Ver").value;

    console.log(JSON.stringify({
        "App": App,
        "Category": Category,
        "Rating": Rating,
        "Reviews": Reviews,
        "Size": Size,
        "Installs": Installs,
        "Type": Type,
        "Price": Price,
        "Content_Rating": Content_Rating,
        "Genres": Genres,
        "Last_Updated": Last_Updated,
        "Current_Ver": Current_Ver,
        "Android_Ver": Android_Ver,
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/complaints/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "App": App,
        "Category": Category,
        "Rating": Rating,
        "Reviews": Reviews,
        "Size": Size,
        "Installs": Installs,
        "Type": Type,
        "Price": Price,
        "Content_Rating": Content_Rating,
        "Genres": Genres,
        "Last_Updated": Last_Updated,
        "Current_Ver": Current_Ver,
        "Android_Ver": Android_Ver,
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Create Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function compliantDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/complaints/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            Swal.fire(
                'Good job!',
                'Delete Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function showCompliantEditBox(id) {
    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).object;
            console.log("showCompliantEditBox", object);
            Swal.fire({
                title: 'Edit App in Google Play Store',
                html: '<input id="id" class="swal2-input" placeholder="App" type="hidden" value="' + object['_id'] + '"><br>' +
                    '<div class="mb-3"><label for="App" class="form-label">App</label>' +
                    '<input class="form-control" id="App" placeholder="App Name" value="' + object['App'] + '"></div>' +
                    '<div class="mb-3"><label for="Category" class="form-label">Category</label>' +
                    '<input class="form-control" id="Category" placeholder="Category" value="' + object['Category'] + '"></div>' +
                    '<div class="mb-3"><label for="Rating" class="form-label">Rating</label>' +
                    '<input class="form-control" id="Rating" placeholder="Rating" value="' + object['Rating'] + '"></div>' +
                    '<div class="mb-3"><label for="Reviews" class="form-label">Reviews</label>' +
                    '<input class="form-control" id="Reviews" placeholder="Reviews" value="' + object['Reviews'] + '"></div>' +
                    '<div class="mb-3"><label for="Size" class="form-label">Size</label>' +
                    '<input class="form-control" id="Size" placeholder="Size" value="' + object['Size'] + '"></div>' +
                    '<div class="mb-3"><label for="Installs" class="form-label">Installs</label>' +
                    '<input class="form-control" id="Installs" placeholder="Installs" value="' + object['Installs'] + '"></div>' +
                    '<div class="mb-3"><label for="Type" class="form-label">Type</label>' +
                    '<input class="form-control" id="Type" placeholder="Type" value="' + object['Type'] + '"></div>' +
                    '<div class="mb-3"><label for="Price" class="form-label">Price</label>' +
                    '<input class="form-control" id="Price" placeholder="Price" value="' + object['Price'] + '"></div>' +
                    '<div class="mb-3"><label for="Content_Rating" class="form-label">Content Rating</label>' +
                    '<input class="form-control" id="Content_Rating" placeholder="Content Rating, e.g. 2022-08-09" value="' + object['Content Rating'] + '"></div>' +
                    '<div class="mb-3"><label for="Genres" class="form-label">Genres</label>' +
                    '<input class="form-control" id="Genres" placeholder="Genres" value="' + object['Genres'] + '"></div>' +
                    '<div class="mb-3"><label for="Last_Updated" class="form-label">Last Updated</label>' +
                    '<input class="form-control" id="Last_Updated" placeholder="Last Updated" value="' + object['Last Updated'] + '"></div>' +
                    '<div class="mb-3"><label for="Current_Ver" class="form-label">Current Ver</label>' +
                    '<input class="form-control" id="Current_Ver" placeholder="Current Ver" value="' + object['Current Ver'] + '"></div>' +
                    '<div class="mb-3"><label for="Android_Ver" class="form-label">Android Ver</label>' +
                    '<input class="form-control" id="Android_Ver" placeholder="Android Ver" value="' + object['Android Ver'] + '"></div>',

                focusConfirm: false,
                preConfirm: () => {
                    userEdit();
                }
            });
        }
    };
}

function userEdit() {
    const id = document.getElementById("id").value;
    const App = document.getElementById("App").value;
    const Category = document.getElementById("Category").value;
    const Rating = document.getElementById("Rating").value;
    const Reviews = document.getElementById("Reviews").value;
    const Size = document.getElementById("Size").value;
    const Installs = document.getElementById("Installs").value;
    const Type = document.getElementById("Type").value;
    const Price = document.getElementById("Price").value;
    const Content_Rating = document.getElementById("Content_Rating").value;
    const Genres = document.getElementById("Genres").value;
    const Last_Updated = document.getElementById("Last_Updated").value;
    const Current_Ver = document.getElementById("Current_Ver").value;
    const Android_Ver = document.getElementById("Android_Ver").value;

    console.log(JSON.stringify({
        "_id": id,
        "App": App,
        "Category": Category,
        "Rating": Rating,
        "Reviews": Reviews,
        "Size": Size,
        "Installs": Installs,
        "Type": Type,
        "Price": Price,
        "Content_Rating": Content_Rating,
        "Genres": Genres,
        "Last_Updated": Last_Updated,
        "Current_Ver": Current_Ver,
        "Android_Ver": Android_Ver,
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/complaints/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id,
        "App": App,
        "Category": Category,
        "Rating": Rating,
        "Reviews": Reviews,
        "Size": Size,
        "Installs": Installs,
        "Type": Type,
        "Price": Price,
        "Content_Rating": Content_Rating,
        "Genres": Genres,
        "Last_Updated": Last_Updated,
        "Current_Ver": Current_Ver,
        "Android_Ver": Android_Ver,
    }));

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Update Compliant Successfully!',
                'success'
            )
            loadTable();
        }
    };
}