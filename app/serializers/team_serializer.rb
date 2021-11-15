class TeamSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :description
end
