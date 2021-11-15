class User < ApplicationRecord
    has_many :messages
    has_many :membership
    has_many :teams, through: :messages
end
