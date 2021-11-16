class LatestMessageSerializer < TeamSerializer
  attributes :latest_message, :memberships


  # has_many :messages
  def memberships
    object.memberships.map do |member|
      # User.find(member.user_id).name
      ::MembershipNoTeamSerializer.new(member)
    end
  end

  def latest_message
    object.messages.order("created_at").last
  end

end
