class RelationshipsController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)

    current_user.active_relationships.last.create_activity key: 'relationship.created', owner: current_user, recipient: user

    redirect_back fallback_location: root_path
  end

  def destroy
    user = Relationship.find(params[:id]).followed
    current_user.unfollow(user)
    redirect_back fallback_location: root_path
  end
end
