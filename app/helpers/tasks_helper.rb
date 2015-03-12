module TasksHelper
  def time_format(time_in_second)
    formatted_time_string = ""
    if time_in_second.blank?
      formatted_time_string = "0 hr 0 min 0 sec"
    else
      hr = time_in_second / 3600
      time_in_second =  time_in_second % 3600
      min = time_in_second / 60
      time_in_second =  time_in_second % 60
      sec = time_in_second
      formatted_time_string = "#{hr} hr #{min} min #{sec} sec"
    end
    return formatted_time_string
  end

  def truncate_task_desc(description)
    description.truncate(200, omission: '...')
  end

end
