var saveButton = $(".saveBtn");
var now1 = dayjs().format('HH:mm:ss');

// display the current date and time
$("#currentDay").text(dayjs().format('DD MMMM YYYY'));
$("#currentTime").text("Current time: " + now1);

// refresh the current time after every second
function currentTime() {
    var now = dayjs().format('HH:mm:ss');
    document.getElementById('currentTime').innerText = "Current time: " + now;
    now = dayjs().format('HH:mm:ss');
}
setInterval(currentTime, 1000);

// each time block is color-coded to indicate whether it is in the past, present, or future
function timeBlockColor() {
    var hour = dayjs().$H;

    $(".time-block").each(function() {
        var currHour = parseInt($(this).attr("id"));

        if (currHour > hour) {
            $(this).addClass("future");
        } else if (currHour === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    })
};

// WHEN I click the save button for that time block
saveButton.on("click", function() {

    var time = $(this).siblings(".hour").text();
    var plan = $(this).siblings(".plan").val();

    // The task is saved in local storage
    localStorage.setItem(time, plan);
});

// When the page is refreshed, the saved tasks persist
function saveTask() {

    $(".hour").each(function() {
        var currHour = $(this).text();
        var currPlan = localStorage.getItem(currHour);

        if(currPlan !== null) {
            $(this).siblings(".plan").val(currPlan);
        }
    });
}

// calling the functions
timeBlockColor();
saveTask();