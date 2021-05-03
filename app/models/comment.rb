class Comment < ActiveRecord::Base
  include PublicActivity::Model
  include ActsAsCommentable::Comment

  belongs_to :commentable, :polymorphic => true

  default_scope -> { order('created_at ASC') }

  # NOTE: install the acts_as_votable plugin if you
  # want user to vote on the quality of comments.
  #acts_as_voteable

  # NOTE: Comments belong to a user
  belongs_to :user

  validates_presence_of :comment

  FORMAT = AutoHtml::Pipeline.new(
    AutoHtml::HtmlEscape.new,
    AutoHtml::Link.new(target: '_blank', rel: 'nofollow'),
    AutoHtml::SimpleFormat.new
  )

  def comment=(c)
    super(c)
    self[:comment] = FORMAT.call(c)
  end
end
