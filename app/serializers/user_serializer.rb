class UserSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :picture_url
end
