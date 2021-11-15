class Team < ApplicationRecord
    has_many :messages
    has_many :membership
    has_many :users, through: :messages
end
