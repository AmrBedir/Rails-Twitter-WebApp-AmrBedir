class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :get_notifications

  def get_notifications
    @notifications = PublicActivity::Activity.where(
        recipient: current_user,
        read: false).
        where.not(owner_id: current_user, trackable: nil).order(created_at: :desc)
  end  
end
