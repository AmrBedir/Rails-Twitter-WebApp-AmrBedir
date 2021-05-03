class TweetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tweet, except: [:create]

  def create
    @tweet = current_user.tweets.new(tweet_params)
    if @tweet.save
      @tweet.create_activity key: 'tweet.created', owner: @tweet.user
      redirect_to user_path(@tweet.user.username), notice: 'تم إنشاء التغريدة'
    else
      redirect_to user_path(@tweet.user.username), notice: 'حدث شيء خاطئ!'
    end
  end

  def edit
  end

  def update
    if @tweet.update(tweet_params)
      redirect_to user_path(@tweet.user.username), notice: 'تم تعديل التغريدة'
    else
      redirect_to user_path(@tweet.user.username), notice: 'حدث شيء خاطئ'
    end    
  end

  def destroy
    @tweet.destroy
    redirect_to user_path(@tweet.user.username), notice: 'تم حذف التغريدة'
  end

  private

  def tweet_params
    params.require(:tweet).permit(:content)
  end

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end
end
