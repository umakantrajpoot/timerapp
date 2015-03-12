class HomesController < ApplicationController
  before_action :authenticate_user!

  respond_to :html, :json

  def index
    @tasks = Task.all.order("created_at DESC")
    respond_with(@tasks)
  end

end
