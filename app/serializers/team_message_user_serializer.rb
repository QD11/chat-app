class TeamMessageUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :messages, :memberships
  # has_many :messages

  def memberships
    object.memberships.map do |member|
      # User.find(member.user_id).name
      ::MembershipNoTeamSerializer.new(member)
    end
  end

  def messages
    object.messages.map do |message|
      # User.find(member.user_id).name
      ::UserToMessagesSerializer.new(message)
    end
  end
end
