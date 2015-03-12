$(document).ready(function(){
  var timeInSecond = 0,timeInterval = null, hr = 0, mnt = 0, sec = 0;
  var taskId = null;
  var formattedTimeString = '';

  var timeMeasurement = function() {
    timeInSecond = timeInSecond + 1;
    var totalTimeInSeconds = timeInSecond;
    hr = totalTimeInSeconds / 3600;
    totalTimeInSeconds =  totalTimeInSeconds % 3600;
    mnt = totalTimeInSeconds / 60;
    totalTimeInSeconds =  totalTimeInSeconds % 60;
    sec = totalTimeInSeconds;
    formattedTimeString = parseInt(hr) + " hr " + parseInt(mnt) + " min " + parseInt(sec) + " sec";
    $("#working_time").attr('data-seconds', timeInSecond);
    $("#working_time").html(formattedTimeString);
    if(timeInSecond % 5 == 0){
      updateWorkingTime(timeInSecond);
    }
  }

  $("#start_timer").on("click", function(){
    taskId = $(this).attr('data-task_id');
    timeInterval = setInterval(timeMeasurement, 1000);
    timeInSecond = parseInt($("#working_time").attr('data-seconds'));
    $("#start_timer").addClass('hide');
    $("#pause_timer").removeClass('hide');
  });

  $("#pause_timer").on("click", function(){
    taskId = $(this).attr('data-task_id');
    clearInterval(timeInterval);
    updateWorkingTime(timeInSecond);
    timeInSecond = 0;
    $("#start_timer").removeClass('hide');
    $("#pause_timer").addClass('hide');
  });

  $("#edit_timer").on('click', function(){
    taskId = $(this).attr('data-task_id');
    clearInterval(timeInterval);
    updateWorkingTime(timeInSecond);
    var totalTimeInSeconds = (timeInSecond == null || timeInSecond == 0) ? parseInt($("#working_time").attr('data-seconds')) : timeInSecond;
    hr = parseInt(totalTimeInSeconds / 3600);
    totalTimeInSeconds =  totalTimeInSeconds % 3600;
    console.log(totalTimeInSeconds)
    mnt = parseInt(totalTimeInSeconds / 60);
    totalTimeInSeconds =  totalTimeInSeconds % 60;
    sec = totalTimeInSeconds;
    timeInSecond = 0;
    $("#working_time").html(
      "<input type='text' style='width:35px;height:24px;' id='cstm_hr' value='" + parseInt(hr) + "'/> hr "
      + "<input type='text' style='width:35px;height:24px;' id='cstm_mnt' value='" + parseInt(mnt) + "'/> min "
      + "<input type='text' style='width:35px;height:24px;' id='cstm_sec' value='" + parseInt(sec) + "'/> sec"
    );
    $("#edit_timer").addClass('hide');
    $("#update_timer").removeClass('hide');
  });

  $("#update_timer").on('click', function(){
    taskId = $(this).attr('data-task_id');
    hr = $("#cstm_hr").val();
    mnt = $("#cstm_mnt").val();
    sec = $("#cstm_sec").val();
    timeInSecond = parseInt(hr) * 3600 + parseInt(mnt) * 60 + parseInt(sec);
    formattedTimeString = parseInt(hr) + " hr " + parseInt(mnt) + " min " + parseInt(sec) + " sec";
    $("#working_time").attr('data-seconds', timeInSecond);
    $("#working_time").html(formattedTimeString);
    updateWorkingTime(timeInSecond);
    timeInSecond = 0;
    $("#edit_timer").removeClass('hide');
    $("#update_timer").addClass('hide');
  });

  $("#delete_task").on('click', function(){
    clearInterval(timeInterval);
    taskId = $(this).attr('data-task_id');
    deleteTask(taskId);
  });

  /* data base related function listed here */
  var updateWorkingTime = function(timeInSecond){
    $.ajax({
      url: '/tasks/' + taskId + '/update_working_time',
      method: 'post',
      dataType: 'script',
      data: {task: { working_time: timeInSecond}}
    });
  };

  var deleteTask = function(taskId){
    $.ajax({
      url: '/tasks/' + taskId ,
      method: 'DELETE',
      dataType: 'script'
    });
  };
});
