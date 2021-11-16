class LatestMessageSerializer < TeamSerializer
  attributes :latest_message

  # has_many :messages

  def latest_message
    object.messages.order("created_at").last
  end

end
