class UserToMessagesSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :team_id, :updated_at, :created_at
  belongs_to :user
end
