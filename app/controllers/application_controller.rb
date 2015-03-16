class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :app_home_page
  respond_to :html, :json


  def after_sign_in_path_for(resource)
    if current_user.membership.blank?
      memberships_path
    else
      homes_path
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

  private

  def app_home_page
    if current_user.present? && request.path == "/"
      redirect_to homes_path and return
    end
  end
end
