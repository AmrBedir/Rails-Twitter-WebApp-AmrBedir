class Relationship < ApplicationRecord
    include PublicActivity::Model

    belongs_to :follower, class_name: 'User'
    belongs_to :followed, class_name: 'User'

    validates_presence_of :follower
    validates_presence_of :followed
end
