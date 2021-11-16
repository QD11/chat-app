class MembershipNoTeamSerializer < ActiveModel::Serializer
  attributes :id, :last_read_at
  belongs_to :user
end
