class Post < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
  validates :post_field, presence: true

  mount_uploader :post_image, PostImageUploader


  def user
    return User.find_by(id: self.user_id)
  end
end
