class MessageSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  
  attributes :id, :content
  belongs_to :user
  belongs_to :team
end
