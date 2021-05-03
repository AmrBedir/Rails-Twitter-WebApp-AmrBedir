class Retweet < ApplicationRecord
    include PublicActivity::Model

    belongs_to :retweeter, class_name: 'User'
    belongs_to :source_tweet, class_name: 'Tweet'
end
