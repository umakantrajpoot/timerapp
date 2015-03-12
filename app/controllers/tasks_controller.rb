class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy, :update_working_time]

  respond_to :html, :json

  def index
    @tasks = Task.all
    respond_with(@tasks)
  end

  def show
    respond_with(@task)
  end

  def new
    @task = Task.new
    respond_with(@task)
  end

  def edit
  end

  def create
    @task = Task.new(task_params)
    @task.save
    respond_with(@task)
  end

  def update
    @task.update(task_params)
    respond_with(@task)
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html
      format.js
    end
  end

  def update_working_time
    @task.update_attribute(:working_time, params[:task][:working_time])
  end

  private
    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:task, :description, :working_time)
    end
end
