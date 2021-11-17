class MessageSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  
  attributes :id, :content, :created_at
  belongs_to :user
  belongs_to :team
end
