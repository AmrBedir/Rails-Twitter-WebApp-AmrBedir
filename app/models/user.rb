class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  acts_as_voter

  validates_presence_of :username
  validates_uniqueness_of :username

  has_many :active_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
    
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower

  has_many :tweets, dependent: :destroy

  has_many :comments, dependent: :destroy

  has_many :retweets, dependent: :destroy, foreign_key: 'retweeter_id'

  def follow(user)
    active_relationships.create(followed_id: user.id)
  end

  def unfollow(user)
    active_relationships.find_by_followed_id(user.id).destroy
  end

  def following?(user)
    following.include? user
  end

  def self.mentions(letters)
    return User.none unless letters.present?
    users = User.limit(8).where('username like ?',"#{letters}%")
    users.map { |user| { name: user.username } }
  end  
end
