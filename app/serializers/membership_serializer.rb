class MembershipSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  
  attributes :id, :last_read_at
  belongs_to :user
  belongs_to :team
end
