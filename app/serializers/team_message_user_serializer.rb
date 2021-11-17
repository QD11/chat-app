class TeamMessageUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :messages
  # has_many :messages
  def messages
    object.messages.map do |message|
      # User.find(member.user_id).name
      ::UserToMessagesSerializer.new(message)
    end
  end
end
